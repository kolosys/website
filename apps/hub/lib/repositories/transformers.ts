import type { RepositoryData } from "./types";
import type { Repository } from "@/prisma/client";

type RepositoryWithRelations = Repository & {
  documentationMetadata: {
    lastSyncedAt: Date | null;
    fileCount: number;
  } | null;
  syncLogs: Array<{ status: string; startedAt: Date }>;
  versionTags: Array<{ tagName: string }>;
  documentationContent: Array<{ slug: string[] }>;
};

/**
 * Formats relative time string from a date
 */
export function formatRelativeTime(date: Date | null): string {
  if (!date) {
    return "Never";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return "Just now";
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
}

/**
 * Transforms a repository with relations into RepositoryData
 */
export function transformRepository(
  repo: RepositoryWithRelations,
  quick = false
): RepositoryData {
  const latestSyncLog = repo.syncLogs?.[0];
  const isSyncing = latestSyncLog?.status === "in_progress";
  const lastSyncDate =
    repo.documentationMetadata?.lastSyncedAt || repo.syncedAt;

  let lastSyncText: string;

  // Check if there's no sync data or content
  if (!repo.documentationMetadata && repo.syncLogs?.length === 0) {
    lastSyncText = "Never";
  } else if (isSyncing) {
    lastSyncText = "Syncing docs...";
  } else if (lastSyncDate) {
    lastSyncText = formatRelativeTime(lastSyncDate);
  } else {
    lastSyncText = "Never";
  }

  return {
    id: repo.id,
    githubId: repo.githubId?.toString(),
    name: repo.name,
    fullName: repo.fullName,
    owner: repo.owner,
    description: repo.description,
    emoji: null, // This could be extracted from documentation metadata or topics
    defaultBranch: repo.defaultBranch,
    docsPath: repo.docsPath, // This could be configurable per repository
    baseSlug: repo.documentationContent?.[0]?.slug?.join("/") || null,
    pages: repo.documentationMetadata?.fileCount || 0,
    lastSync: lastSyncText,
    syncing: isSyncing,
    published: repo.published,
    featured: repo.featured,
    status: (isSyncing ? "syncing" : "active") as RepositoryData["status"],
    language: repo.language,
    topics: repo.topics,
    homepage: repo.homepage,
    stargazersCount: repo.stargazersCount,
    forksCount: repo.forksCount,
    updatedAt: repo.updatedAt,
    syncedAt: repo.syncedAt,
    latestTag: repo.versionTags[0]?.tagName || null,
  };
}
