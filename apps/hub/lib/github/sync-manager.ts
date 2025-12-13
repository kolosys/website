import { syncRepositories } from "./repositories";
import { syncAllIssues } from "./issues";
import { syncAllPullRequests } from "./pull-requests";
import { syncAllCommits } from "./commits";
import { syncAllReleases } from "./releases";
import { syncAllVersionTags } from "./version-tags";
import { syncAllContributors } from "./contributors";
import { syncAllDocumentation } from "./documentation";
import prisma, { type Prisma } from "@/prisma";

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

async function logSync(
  syncType: Prisma.SyncLogCreateInput["syncType"],
  status: Prisma.SyncLogCreateInput["status"],
  repositoryId?: string,
  recordsProcessed?: number,
  errorMessage?: string,
  metadata?: any
): Promise<void> {
  await prisma.syncLog.create({
    data: {
      syncType: syncType,
      repositoryId: repositoryId,
      status,
      startedAt: new Date().toISOString(),
      completedAt:
        status === "completed" || status === "failed"
          ? new Date().toISOString()
          : null,
      errorMessage: errorMessage,
      recordsProcessed: recordsProcessed,
      metadata: metadata || {},
    },
  });
}

export async function performFullSync(
  repositoryNames?: string[],
  repositoryIds?: string[]
): Promise<FullSyncResult> {
  const startTime = Date.now();
  const results: SyncResult[] = [];
  let totalRecords = 0;

  const syncScope =
    repositoryNames && repositoryNames.length > 0
      ? `selected repositories: ${repositoryNames.join(", ")}`
      : repositoryIds && repositoryIds.length > 0
      ? `${repositoryIds.length} selected repository IDs`
      : "all repositories";

  console.log(`🚀 Starting full sync for ${syncScope}...\n`);

  // 1. Sync Repositories
  console.log("📦 Syncing repositories...");
  try {
    const count = await syncRepositories(repositoryNames);
    results.push({
      syncType: "repositories",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("repositories", "completed", undefined, count);
    console.log(`✅ Synced ${count} repositories\n`);
  } catch (error: any) {
    results.push({
      syncType: "repositories",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("repositories", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync repositories: ${error.message}\n`);
  }

  // 2. Sync Issues
  console.log("🐛 Syncing issues...");
  try {
    const count = await syncAllIssues(repositoryIds);
    results.push({
      syncType: "issues",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("issues", "completed", undefined, count);
    console.log(`✅ Synced ${count} issues\n`);
  } catch (error: any) {
    results.push({
      syncType: "issues",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("issues", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync issues: ${error.message}\n`);
  }

  // 3. Sync Pull Requests
  console.log("🔀 Syncing pull requests...");
  try {
    const count = await syncAllPullRequests(repositoryIds);
    results.push({
      syncType: "pull_requests",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("pull_requests", "completed", undefined, count);
    console.log(`✅ Synced ${count} pull requests\n`);
  } catch (error: any) {
    results.push({
      syncType: "pull_requests",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("pull_requests", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync pull requests: ${error.message}\n`);
  }

  // 4. Sync Commits (limited to recent commits)
  console.log("💾 Syncing commits...");
  try {
    const count = await syncAllCommits(100, repositoryIds); // Limit to 100 per repo
    results.push({
      syncType: "commits",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("commits", "completed", undefined, count);
    console.log(`✅ Synced ${count} commits\n`);
  } catch (error: any) {
    results.push({
      syncType: "commits",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("commits", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync commits: ${error.message}\n`);
  }

  // 5. Sync Releases
  console.log("🏷️  Syncing releases...");
  try {
    const count = await syncAllReleases(repositoryIds);
    results.push({
      syncType: "releases",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("releases", "completed", undefined, count);
    console.log(`✅ Synced ${count} releases\n`);
  } catch (error: any) {
    results.push({
      syncType: "releases",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("releases", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync releases: ${error.message}\n`);
  }

  // 6. Sync Version Tags
  console.log("🏷️  Syncing version tags...");
  try {
    const count = await syncAllVersionTags(repositoryIds);
    results.push({
      syncType: "version_tags",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("version_tags", "completed", undefined, count);
    console.log(`✅ Synced ${count} version tags\n`);
  } catch (error: any) {
    results.push({
      syncType: "version_tags",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("version_tags", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync version tags: ${error.message}\n`);
  }

  // 7. Sync Contributors
  console.log("👥 Syncing contributors...");
  try {
    const count = await syncAllContributors(repositoryIds);
    results.push({
      syncType: "contributors",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("contributors", "completed", undefined, count);
    console.log(`✅ Synced ${count} contributors\n`);
  } catch (error: any) {
    results.push({
      syncType: "contributors",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("contributors", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync contributors: ${error.message}\n`);
  }

  // 8. Sync Documentation
  console.log("📚 Syncing documentation...");
  try {
    const count = await syncAllDocumentation(repositoryIds);
    results.push({
      syncType: "documentation",
      status: "completed",
      recordsProcessed: count,
    });
    totalRecords += count;
    await logSync("documentation", "completed", undefined, count);
    console.log(`✅ Synced ${count} documentation files\n`);
  } catch (error: any) {
    results.push({
      syncType: "documentation",
      status: "failed",
      recordsProcessed: 0,
      error: error.message,
    });
    await logSync("documentation", "failed", undefined, 0, error.message);
    console.error(`❌ Failed to sync documentation: ${error.message}\n`);
  }

  const duration = Date.now() - startTime;
  console.log(`\n✨ Full sync completed in ${(duration / 1000).toFixed(2)}s`);
  console.log(`📊 Total records processed: ${totalRecords}`);

  return {
    totalRecords,
    results,
    duration,
  };
}

export async function performPartialSync(
  syncTypes: string[],
  repositoryNames?: string[],
  repositoryIds?: string[]
): Promise<FullSyncResult> {
  const startTime = Date.now();
  const results: SyncResult[] = [];
  let totalRecords = 0;

  const syncScope =
    repositoryNames && repositoryNames.length > 0
      ? `selected repositories: ${repositoryNames.join(", ")}`
      : repositoryIds && repositoryIds.length > 0
      ? `${repositoryIds.length} selected repository IDs`
      : "all repositories";

  console.log(`Syncing ${syncTypes.join(", ")} for ${syncScope}...`);

  const syncMap: Record<string, () => Promise<number>> = {
    repositories: () => syncRepositories(repositoryNames),
    issues: () => syncAllIssues(repositoryIds),
    pull_requests: () => syncAllPullRequests(repositoryIds),
    commits: () => syncAllCommits(100, repositoryIds),
    releases: () => syncAllReleases(repositoryIds),
    version_tags: () => syncAllVersionTags(repositoryIds),
    contributors: () => syncAllContributors(repositoryIds),
    documentation: () => syncAllDocumentation(repositoryIds),
  };

  for (const syncType of syncTypes) {
    const syncFn = syncMap[syncType];
    if (!syncFn) {
      console.warn(`Unknown sync type: ${syncType}`);
      continue;
    }

    console.log(`Syncing ${syncType}...`);
    try {
      const count = await syncFn();
      results.push({ syncType, status: "completed", recordsProcessed: count });
      totalRecords += count;
      await logSync(syncType, "completed", undefined, count);
      console.log(`✅ Synced ${count} ${syncType}`);
    } catch (error: any) {
      results.push({
        syncType,
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      await logSync(syncType, "failed", undefined, 0, error.message);
      console.error(`❌ Failed to sync ${syncType}: ${error.message}`);
    }
  }

  const duration = Date.now() - startTime;

  return {
    totalRecords,
    results,
    duration,
  };
}

/**
 * Sync all data (issues, PRs, commits, releases, contributors) for a single repository
 * This function can be called asynchronously after adding a new repository
 * @param repositoryId The repository ID to sync
 * @param syncLogId Optional existing sync log ID to update instead of creating a new one
 */
export async function syncSingleRepositoryData(
  repositoryId: string,
  syncLogId?: string
): Promise<FullSyncResult> {
  const startTime = Date.now();
  const results: SyncResult[] = [];
  let totalRecords = 0;

  try {
    // Get repository information
    const repo = await prisma.repository.findUnique({
      where: { id: repositoryId },
      select: {
        id: true,
        name: true,
        fullName: true,
        owner: true,
        defaultBranch: true,
      },
    });

    if (!repo) {
      throw new Error(`Repository with ID ${repositoryId} not found`);
    }

    console.log(`🚀 Starting data sync for repository: ${repo.fullName}\n`);

    // Use existing sync log or create a new one
    let syncLog;
    if (syncLogId) {
      syncLog = await prisma.syncLog.findUnique({
        where: { id: syncLogId },
      });
      if (!syncLog) {
        throw new Error(`Sync log with ID ${syncLogId} not found`);
      }
      // Update the existing sync log to ensure it's in progress
      syncLog = await prisma.syncLog.update({
        where: { id: syncLogId },
        data: {
          status: "in_progress",
          startedAt: new Date(),
        },
      });
    } else {
      // Check if there's already an in-progress sync
      const existingSync = await prisma.syncLog.findFirst({
        where: {
          repositoryId: repositoryId,
          syncType: "full_repository_sync",
          status: "in_progress",
        },
        orderBy: { startedAt: "desc" },
      });

      if (existingSync) {
        console.log(
          `⚠️  Sync already in progress for ${repo.fullName}, using existing log`
        );
        syncLog = existingSync;
      } else {
        // Create a new sync log entry
        syncLog = await prisma.syncLog.create({
          data: {
            syncType: "full_repository_sync",
            repositoryId: repositoryId,
            status: "in_progress",
            startedAt: new Date(),
            metadata: { repositoryName: repo.fullName } as any,
          },
        });
      }
    }

    // 1. Sync Issues
    console.log("🐛 Syncing issues...");
    try {
      const { syncIssues } = await import("./issues");
      const count = await syncIssues(repo.owner, repo.name, repo.id);
      results.push({
        syncType: "issues",
        status: "completed",
        recordsProcessed: count,
      });
      totalRecords += count;
      console.log(`✅ Synced ${count} issues\n`);
    } catch (error: any) {
      results.push({
        syncType: "issues",
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      console.error(`❌ Failed to sync issues: ${error.message}\n`);
    }

    // 2. Sync Pull Requests
    console.log("🔀 Syncing pull requests...");
    try {
      const { syncPullRequests } = await import("./pull-requests");
      const count = await syncPullRequests(repo.owner, repo.name, repo.id);
      results.push({
        syncType: "pull_requests",
        status: "completed",
        recordsProcessed: count,
      });
      totalRecords += count;
      console.log(`✅ Synced ${count} pull requests\n`);
    } catch (error: any) {
      results.push({
        syncType: "pull_requests",
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      console.error(`❌ Failed to sync pull requests: ${error.message}\n`);
    }

    // 3. Sync Commits (limited to recent commits)
    console.log("💾 Syncing commits...");
    try {
      const { syncCommits } = await import("./commits");
      const count = await syncCommits(repo.owner, repo.name, repo.id, 100);
      results.push({
        syncType: "commits",
        status: "completed",
        recordsProcessed: count,
      });
      totalRecords += count;
      console.log(`✅ Synced ${count} commits\n`);
    } catch (error: any) {
      results.push({
        syncType: "commits",
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      console.error(`❌ Failed to sync commits: ${error.message}\n`);
    }

    // 4. Sync Releases
    console.log("🏷️  Syncing releases...");
    try {
      const { syncReleases } = await import("./releases");
      const count = await syncReleases(repo.owner, repo.name, repo.id);
      results.push({
        syncType: "releases",
        status: "completed",
        recordsProcessed: count,
      });
      totalRecords += count;
      console.log(`✅ Synced ${count} releases\n`);
    } catch (error: any) {
      results.push({
        syncType: "releases",
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      console.error(`❌ Failed to sync releases: ${error.message}\n`);
    }

    // 5. Sync Version Tags
    console.log("🏷️  Syncing version tags...");
    try {
      const { syncVersionTags } = await import("./version-tags");
      const count = await syncVersionTags(repo.owner, repo.name, repo.id);
      results.push({
        syncType: "version_tags",
        status: "completed",
        recordsProcessed: count,
      });
      totalRecords += count;
      console.log(`✅ Synced ${count} version tags\n`);
    } catch (error: any) {
      results.push({
        syncType: "version_tags",
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      console.error(`❌ Failed to sync version tags: ${error.message}\n`);
    }

    // 6. Sync Contributors & ContributorContributions
    console.log("👥 Syncing contributors...");
    try {
      const { syncContributors } = await import("./contributors");
      const count = await syncContributors(repo.owner, repo.name, repo.id);
      results.push({
        syncType: "contributors",
        status: "completed",
        recordsProcessed: count,
      });
      totalRecords += count;
      console.log(`✅ Synced ${count} contributors\n`);
    } catch (error: any) {
      results.push({
        syncType: "contributors",
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      console.error(`❌ Failed to sync contributors: ${error.message}\n`);
    }

    // 7. Sync Documentation
    console.log("📚 Syncing documentation...");
    try {
      const { syncDocumentation } = await import("./documentation");
      const count = await syncDocumentation(
        repo.owner,
        repo.name,
        repo.id,
        "/docs",
        repo.defaultBranch
      );
      results.push({
        syncType: "documentation",
        status: "completed",
        recordsProcessed: count,
      });
      totalRecords += count;
      console.log(`✅ Synced ${count} documentation files\n`);
    } catch (error: any) {
      results.push({
        syncType: "documentation",
        status: "failed",
        recordsProcessed: 0,
        error: error.message,
      });
      console.error(`❌ Failed to sync documentation: ${error.message}\n`);
    }

    const duration = Date.now() - startTime;
    const hasFailures = results.some((r) => r.status === "failed");

    // Update sync log
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        status: hasFailures ? "failed" : "completed",
        completedAt: new Date(),
        recordsProcessed: totalRecords,
        metadata: {
          repositoryName: repo.fullName,
          results: results.map((r) => ({
            syncType: r.syncType,
            status: r.status,
            recordsProcessed: r.recordsProcessed,
            error: r.error,
          })),
          duration,
        } as any,
      },
    });

    console.log(
      `\n✨ Repository data sync completed in ${(duration / 1000).toFixed(2)}s`
    );
    console.log(`📊 Total records processed: ${totalRecords}`);

    return {
      totalRecords,
      results,
      duration,
    };
  } catch (error: any) {
    console.error(`Error syncing repository data: ${error.message}`);
    throw error;
  }
}
