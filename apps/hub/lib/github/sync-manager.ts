import { syncRepositories } from "./repositories";
import { syncAllIssues, syncIssues } from "./issues";
import { syncAllPullRequests, syncPullRequests } from "./pull-requests";
import { syncAllCommits, syncCommits } from "./commits";
import { syncAllReleases, syncReleases } from "./releases";
import { syncAllVersionTags, syncVersionTags } from "./version-tags";
import { syncAllContributors, syncContributors } from "./contributors";
import { syncAllDocumentation, syncDocumentation } from "./documentation";
import prisma, { type Prisma } from "@/prisma";

// ============================================================================
// Types
// ============================================================================

export const SYNC_TYPES = {
  REPOSITORIES: "repositories",
  ISSUES: "issues",
  PULL_REQUESTS: "pull_requests",
  COMMITS: "commits",
  RELEASES: "releases",
  VERSION_TAGS: "version_tags",
  CONTRIBUTORS: "contributors",
  DOCUMENTATION: "documentation",
} as const;

export type SyncType = (typeof SYNC_TYPES)[keyof typeof SYNC_TYPES];

export interface SyncResult {
  syncType: string;
  status: Prisma.SyncLogCreateInput["status"];
  recordsProcessed: number;
  error?: string;
}

export interface FullSyncResult {
  totalRecords: number;
  results: SyncResult[];
  duration: number;
}

interface SyncOperation {
  name: string;
  emoji: string;
  fn: () => Promise<number>;
}

interface RepoContext {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  defaultBranch: string;
  docsPath: string;
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Extract error message from unknown error type
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unknown error";
}

/**
 * Run promises with concurrency limit
 */
async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;

  const runNext = async (): Promise<void> => {
    if (index >= tasks.length) return Promise.resolve();
    const currentIndex = index++;
    const result = await tasks[currentIndex]();
    results[currentIndex] = result;
    await runNext();
  };

  const workers = Array(Math.min(limit, tasks.length))
    .fill(null)
    .map(() => runNext());

  return Promise.all(workers).then(() => results);
}

// ============================================================================
// Sync Lock Management
// ============================================================================

const syncLocks = new Map<string, Promise<FullSyncResult>>();

/**
 * Acquire a lock for a repository sync
 * Returns the existing promise if a sync is already in progress
 */
function acquireSyncLock(
  repositoryId: string,
  syncFn: () => Promise<FullSyncResult>
): Promise<FullSyncResult> {
  const existing = syncLocks.get(repositoryId);
  if (existing) {
    console.log(
      `⚠️  Sync already in progress for repository ${repositoryId}, returning existing promise`
    );
    return existing;
  }

  const promise = syncFn().finally(() => syncLocks.delete(repositoryId));
  syncLocks.set(repositoryId, promise);
  return promise;
}

/**
 * Check if a sync is in progress for a repository (in-memory check)
 */
export function isSyncLocked(repositoryId: string): boolean {
  return syncLocks.has(repositoryId);
}

// ============================================================================
// Sync Logging
// ============================================================================

async function logSync(
  syncType: Prisma.SyncLogCreateInput["syncType"],
  status: Prisma.SyncLogCreateInput["status"],
  repositoryId?: string,
  recordsProcessed?: number,
  errorMessage?: string
): Promise<void> {
  const now = new Date().toISOString();
  return prisma.syncLog
    .create({
      data: {
        syncType,
        repositoryId,
        status,
        startedAt: now,
        completedAt: status === "completed" || status === "failed" ? now : null,
        errorMessage,
        recordsProcessed,
        metadata: {},
      },
    })
    .then(() => undefined);
}

// ============================================================================
// Sync Execution
// ============================================================================

/**
 * Execute a single sync operation with logging
 */
async function executeSyncOperation(
  op: SyncOperation,
  shouldLog = true
): Promise<SyncResult> {
  console.log(`${op.emoji} Starting ${op.name} sync...`);

  return op
    .fn()
    .then((count) => {
      console.log(`${op.emoji} ✅ Synced ${count} ${op.name}\n`);
      const result: SyncResult = {
        syncType: op.name,
        status: "completed",
        recordsProcessed: count,
      };
      return shouldLog
        ? logSync(op.name, "completed", undefined, count).then(() => result)
        : result;
    })
    .catch((error: unknown) => {
      const message = getErrorMessage(error);
      console.error(`${op.emoji} ❌ Failed to sync ${op.name}: ${message}\n`);
      const result: SyncResult = {
        syncType: op.name,
        status: "failed",
        recordsProcessed: 0,
        error: message,
      };
      return shouldLog
        ? logSync(op.name, "failed", undefined, 0, message).then(() => result)
        : result;
    });
}

/**
 * Execute multiple sync operations in parallel with concurrency limit
 */
function executeSyncOperations(
  operations: SyncOperation[],
  concurrency = 3,
  shouldLog = true
): Promise<SyncResult[]> {
  console.log(
    `🔄 Running ${operations.length} sync operations (concurrency: ${concurrency})...\n`
  );

  const tasks = operations.map(
    (op) => () => executeSyncOperation(op, shouldLog)
  );
  return runWithConcurrency(tasks, concurrency);
}

/**
 * Aggregate sync results into totals
 */
function aggregateResults(results: SyncResult[]): {
  totalRecords: number;
  hasFailures: boolean;
} {
  let totalRecords = 0;
  let hasFailures = false;

  for (const result of results) {
    if (result.status === "completed") {
      totalRecords += result.recordsProcessed;
    } else {
      hasFailures = true;
    }
  }

  return { totalRecords, hasFailures };
}

// ============================================================================
// Sync Operations Builders
// ============================================================================

function buildDataSyncOperations(repositoryIds?: string[]): SyncOperation[] {
  return [
    {
      name: SYNC_TYPES.ISSUES,
      emoji: "🐛",
      fn: () => syncAllIssues(repositoryIds),
    },
    {
      name: SYNC_TYPES.PULL_REQUESTS,
      emoji: "🔀",
      fn: () => syncAllPullRequests(repositoryIds),
    },
    {
      name: SYNC_TYPES.COMMITS,
      emoji: "💾",
      fn: () => syncAllCommits(100, repositoryIds),
    },
    {
      name: SYNC_TYPES.RELEASES,
      emoji: "🏷️",
      fn: () => syncAllReleases(repositoryIds),
    },
    {
      name: SYNC_TYPES.VERSION_TAGS,
      emoji: "🏷️",
      fn: () => syncAllVersionTags(repositoryIds),
    },
    {
      name: SYNC_TYPES.CONTRIBUTORS,
      emoji: "👥",
      fn: () => syncAllContributors(repositoryIds),
    },
    {
      name: SYNC_TYPES.DOCUMENTATION,
      emoji: "📚",
      fn: () => syncAllDocumentation(repositoryIds),
    },
  ];
}

function buildRepoSyncOperations(ctx: RepoContext): SyncOperation[] {
  return [
    {
      name: SYNC_TYPES.ISSUES,
      emoji: "🐛",
      fn: () => syncIssues(ctx.owner, ctx.name, ctx.id),
    },
    {
      name: SYNC_TYPES.PULL_REQUESTS,
      emoji: "🔀",
      fn: () => syncPullRequests(ctx.owner, ctx.name, ctx.id),
    },
    {
      name: SYNC_TYPES.COMMITS,
      emoji: "💾",
      fn: () => syncCommits(ctx.owner, ctx.name, ctx.id, 100),
    },
    {
      name: SYNC_TYPES.RELEASES,
      emoji: "🏷️",
      fn: () => syncReleases(ctx.owner, ctx.name, ctx.id),
    },
    {
      name: SYNC_TYPES.VERSION_TAGS,
      emoji: "🏷️",
      fn: () => syncVersionTags(ctx.owner, ctx.name, ctx.id, true), // syncDocs=true to sync tag documentation
    },
    {
      name: SYNC_TYPES.CONTRIBUTORS,
      emoji: "👥",
      fn: () => syncContributors(ctx.owner, ctx.name, ctx.id),
    },
    {
      name: SYNC_TYPES.DOCUMENTATION,
      emoji: "📚",
      fn: () =>
        syncDocumentation({
          owner: ctx.owner,
          repo: ctx.name,
          repositoryId: ctx.id,
          docsPath: ctx.docsPath,
          branch: ctx.defaultBranch,
          versionTag: "next",
        }),
    },
  ];
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Sync all data for a single repository
 * Uses lock management to prevent race conditions
 */
export function syncSingleRepositoryData(
  repositoryId: string,
  syncLogId?: string
): Promise<FullSyncResult> {
  return acquireSyncLock(repositoryId, () => {
    const startTime = Date.now();
    const results: SyncResult[] = [];

    return prisma.repository
      .findUnique({
        where: { id: repositoryId },
        select: {
          id: true,
          name: true,
          fullName: true,
          owner: true,
          defaultBranch: true,
          docsPath: true,
        },
      })
      .then((repo) => {
        if (!repo) {
          throw new Error(`Repository with ID ${repositoryId} not found`);
        }

        console.log(`🚀 Starting data sync for repository: ${repo.fullName}\n`);

        // Get or create sync log
        const syncLogPromise = syncLogId
          ? prisma.syncLog
              .findUnique({ where: { id: syncLogId } })
              .then((syncLog) => {
                if (!syncLog) {
                  throw new Error(`Sync log with ID ${syncLogId} not found`);
                }
                return prisma.syncLog.update({
                  where: { id: syncLogId },
                  data: { status: "in_progress", startedAt: new Date() },
                });
              })
          : prisma.syncLog
              .findFirst({
                where: {
                  repositoryId,
                  syncType: "full_repository_sync",
                  status: "in_progress",
                },
                orderBy: { startedAt: "desc" },
              })
              .then((existingSync) => {
                if (existingSync) {
                  console.log(
                    `⚠️  Using existing sync log for ${repo.fullName}`
                  );
                  return existingSync;
                }
                return prisma.syncLog.create({
                  data: {
                    syncType: "full_repository_sync",
                    repositoryId,
                    status: "in_progress",
                    startedAt: new Date(),
                    metadata: { repositoryName: repo.fullName },
                  },
                });
              });

        return syncLogPromise.then((syncLog) => {
          const repoContext: RepoContext = {
            id: repo.id,
            owner: repo.owner,
            name: repo.name,
            fullName: repo.fullName,
            defaultBranch: repo.defaultBranch,
            docsPath: repo.docsPath,
          };

          const operations = buildRepoSyncOperations(repoContext);

          return executeSyncOperations(operations, 3, false).then(
            (syncResults) => {
              results.push(...syncResults);

              const { totalRecords, hasFailures } = aggregateResults(results);
              const duration = Date.now() - startTime;

              return prisma.syncLog
                .update({
                  where: { id: syncLog.id },
                  data: {
                    status: hasFailures ? "failed" : "completed",
                    completedAt: new Date(),
                    recordsProcessed: totalRecords,
                    metadata: {
                      repositoryName: repoContext.fullName,
                      results: results.map((r) => ({
                        syncType: r.syncType,
                        status: r.status,
                        recordsProcessed: r.recordsProcessed,
                        error: r.error,
                      })),
                      duration,
                    },
                  },
                })
                .then(() => {
                  console.log(
                    `✨ Repository sync completed in ${(
                      duration / 1000
                    ).toFixed(2)}s`
                  );
                  console.log(`📊 Total records processed: ${totalRecords}`);
                  return { totalRecords, results, duration };
                });
            }
          );
        });
      })
      .catch((error: unknown) => {
        const message = getErrorMessage(error);
        console.error(`Error syncing repository data: ${message}`);

        return prisma.syncLog
          .findFirst({
            where: {
              repositoryId,
              syncType: "full_repository_sync",
              status: "in_progress",
            },
            orderBy: { startedAt: "desc" },
          })
          .then((syncLog) => {
            if (syncLog) {
              return prisma.syncLog.update({
                where: { id: syncLog.id },
                data: {
                  status: "failed",
                  completedAt: new Date(),
                  errorMessage: message,
                },
              });
            }
          })
          .catch((updateError: unknown) => {
            console.error(
              `Failed to update sync log on error: ${getErrorMessage(
                updateError
              )}`
            );
          })
          .then(() => {
            throw error;
          });
      });
  });
}
