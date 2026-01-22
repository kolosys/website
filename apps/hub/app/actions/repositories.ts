"use server";

import { RepositoryData } from "@/lib/repositories";
import { syncRepository } from "@/lib/github/repositories";
import { KOLOSYS_ORG } from "@/lib/github/client";
import { syncSingleRepositoryData } from "@/lib/github/sync-manager";
import {
  formatRelativeTime,
  transformRepository,
} from "@/lib/repositories/transformers";
import prisma from "@/prisma";

export async function getRepositories() {
  try {
    const repositories = await prisma.repository.findMany({
      include: {
        syncLogs: {
          take: 1,
          orderBy: { startedAt: "desc" },
        },
        versionTags: {
          where: { isLatest: true },
          take: 1,
        },
        documentationMetadata: {
          orderBy: { lastSyncedAt: "desc" },
          take: 1,
        },
        documentationContent: {
          take: 1,
          select: {
            slug: true,
          },
        },
      },
      orderBy: [
        { published: "desc" },
        { featured: "desc" },
        { updatedAt: "desc" },
      ],
    });

    // Transform data to include computed fields
    const transformedRepositories: RepositoryData[] = repositories.map(
      transformRepository as any
    );

    return {
      success: true,
      repositories: transformedRepositories,
      total: repositories.length,
    };
  } catch (error) {
    console.error("Error fetching tracked repositories:", error);
    return {
      success: false,
      error: "Failed to fetch tracked repositories",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getAvailableRepositories() {
  try {
    const { getGitHubClient } = await import("@/lib/github/client");
    const octokit = getGitHubClient();

    // Fetch all repos from Kolosys org
    const { data: githubRepos } = await octokit.repos.listForOrg({
      org: KOLOSYS_ORG,
      type: "all",
      per_page: 100,
      sort: "updated",
    });

    // Get already synced repos from database
    const syncedRepos = await prisma.repository.findMany({
      select: { githubId: true },
    });

    const syncedIds = new Set(syncedRepos.map((r) => r.githubId.toString()));

    // Filter out already synced repos
    const availableRepos = githubRepos
      .filter((repo) => !syncedIds.has(repo.id.toString()))
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        private: repo.private,
        fork: repo.fork,
        archived: repo.archived,
        disabled: repo.disabled,
        defaultBranch: repo.default_branch,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        openIssuesCount: repo.open_issues_count,
        watchersCount: repo.watchers_count,
        size: repo.size,
        topics: repo.topics || [],
        homepage: repo.homepage,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
      }));

    return {
      success: true,
      repositories: availableRepos,
      total: availableRepos.length,
    };
  } catch (error) {
    console.error("Error fetching available repositories:", error);
    return {
      success: false,
      error: "Failed to fetch available repositories",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function addRepository(repoName: string) {
  try {
    if (!repoName) {
      return {
        success: false,
        error: "Repository name is required",
      };
    }

    const success = await syncRepository(KOLOSYS_ORG, repoName, true);

    if (!success) {
      return {
        success: false,
        error: "Failed to add repository",
      };
    }

    return {
      success: true,
      message: `Repository ${repoName} has been added successfully`,
    };
  } catch (error) {
    console.error("Error adding repository:", error);
    return {
      success: false,
      error: "Failed to add repository",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete a repository and all its related data from the database
 * This only deletes from the Prisma database, not from GitHub
 */
export async function deleteRepositoryAction(id: string) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    // Delete the repository - all related records will be cascaded automatically
    await prisma.repository.delete({
      where: {
        id,
      },
    });

    console.log(`Successfully deleted repository ${id}`);
    return {
      success: true,
      message: "Repository deleted successfully",
    };
  } catch (error) {
    console.error(`Error deleting repository ${id}:`, error);
    return {
      success: false,
      error: "Failed to delete repository",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function syncRepositoryAction(id: string) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    // Check if repository exists
    const repo = await prisma.repository.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        owner: true,
        name: true,
        syncLogs: {
          where: {
            syncType: "full_repository_sync",
            status: "in_progress",
          },
          take: 1,
        },
      },
    });

    if (!repo) {
      return {
        success: false,
        error: "Repository not found",
      };
    }

    // Check in-memory lock first (fast check to prevent race conditions)
    const { isSyncLocked } = await import("@/lib/github/sync-manager");
    if (isSyncLocked(id)) {
      return {
        success: false,
        error: "Repository sync already in progress",
        message: "A sync is already running for this repository",
      };
    }

    // Check if sync is already in progress (database check)
    if (repo.syncLogs.length > 0) {
      return {
        success: false,
        error: "Repository sync already in progress",
        message: "A sync is already running for this repository",
      };
    }

    // First, sync repository metadata from GitHub
    try {
      const success = await syncRepository(repo.owner, repo.name, false);
      if (!success) {
        return {
          success: false,
          error: "Failed to sync repository metadata",
        };
      }
    } catch (error) {
      console.error(
        `Error syncing repository metadata for ${repo.fullName}:`,
        error
      );
      return {
        success: false,
        error: "Failed to sync repository metadata",
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }

    // Create sync log immediately (synchronously) so frontend can see it
    const syncLog = await prisma.syncLog.create({
      data: {
        syncType: "full_repository_sync",
        repositoryId: id,
        status: "in_progress",
        startedAt: new Date(),
        metadata: { repositoryName: repo.fullName } as any,
      },
    });

    // Kick off async data sync - don't wait for completion
    syncSingleRepositoryData(id, syncLog.id).catch((error) => {
      console.error(`Error syncing repository data for ${id}:`, error);
      // Update sync log to failed status
      prisma.syncLog
        .update({
          where: { id: syncLog.id },
          data: {
            status: "failed",
            completedAt: new Date(),
            errorMessage:
              error instanceof Error ? error.message : "Unknown error",
          },
        })
        .catch((updateError) => {
          console.error(`Error updating sync log ${syncLog.id}:`, updateError);
        });
    });

    return {
      success: true,
      message: "Repository sync started",
    };
  } catch (error) {
    console.error("Error starting repository sync:", error);
    return {
      success: false,
      error: "Failed to start repository sync",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getRepositoryStatus(id: string) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    // Get repository with sync logs and documentation metadata
    const repo = await prisma.repository.findUnique({
      where: { id },
      include: {
        documentationMetadata: {
          orderBy: { lastSyncedAt: "desc" },
          take: 1,
        },
        syncLogs: {
          where: {
            syncType: "full_repository_sync",
          },
          take: 1,
          orderBy: { startedAt: "desc" },
        },
        versionTags: {
          where: { isLatest: true },
          take: 1,
        },
      },
    });

    if (!repo) {
      return {
        success: false,
        error: "Repository not found",
      };
    }

    const latestSyncLog = repo.syncLogs[0];
    const latestMetadata = repo.documentationMetadata[0];
    const isSyncing = latestSyncLog?.status === "in_progress";
    const lastSyncDate = latestMetadata?.lastSyncedAt || repo.syncedAt;

    let lastSyncText: string;

    // Check if there's no sync data or content
    if (!latestMetadata && repo.syncLogs.length === 0) {
      lastSyncText = "Never";
    } else if (isSyncing) {
      lastSyncText = "Syncing...";
    } else {
      lastSyncText = formatRelativeTime(lastSyncDate);
    }

    return {
      success: true,
      data: {
        id: repo.id,
        syncing: isSyncing,
        status: isSyncing ? "syncing" : "active",
        lastSync: lastSyncText,
        pages: latestMetadata?.fileCount || 0,
        latestTag: repo.versionTags[0]?.tagName || null,
      },
    };
  } catch (error) {
    console.error("Error fetching repository status:", error);
    return {
      success: false,
      error: "Failed to fetch repository status",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getRepositoryDetails(id: string) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    const repo = await prisma.repository.findUnique({
      where: { id },
      select: {
        emoji: true,
        faIcon: true,
        docsPath: true,
        published: true,
        featured: true,
      },
    });

    if (!repo) {
      return {
        success: false,
        error: "Repository not found",
      };
    }

    return {
      success: true,
      data: {
        emoji: repo.emoji,
        faIcon: repo.faIcon,
        docsPath: repo.docsPath,
        published: repo.published,
        featured: repo.featured,
      },
    };
  } catch (error) {
    console.error(`Error fetching repository details ${id}:`, error);
    return {
      success: false,
      error: "Failed to fetch repository details",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateRepositoryAction(
  id: string,
  data: {
    emoji?: string | null;
    faIcon?: string | null;
    docsPath?: string;
    published?: boolean;
    featured?: boolean;
  }
) {
  try {
    if (!id) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    // Update the repository
    await prisma.repository.update({
      where: { id },
      data: {
        ...(data.emoji !== undefined && { emoji: data.emoji || null }),
        ...(data.faIcon !== undefined && { faIcon: data.faIcon || null }),
        ...(data.docsPath !== undefined && { docsPath: data.docsPath }),
        ...(data.published !== undefined && { published: data.published }),
        ...(data.featured !== undefined && { featured: data.featured }),
      },
    });

    return {
      success: true,
      message: "Repository updated successfully",
    };
  } catch (error) {
    console.error(`Error updating repository ${id}:`, error);
    return {
      success: false,
      error: "Failed to update repository",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getRepositorySyncLogs(
  repositoryId: string,
  limit: number = 100
) {
  try {
    if (!repositoryId) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    // Verify repository exists
    const repo = await prisma.repository.findUnique({
      where: { id: repositoryId },
      select: {
        id: true,
        name: true,
        fullName: true,
      },
    });

    if (!repo) {
      return {
        success: false,
        error: "Repository not found",
      };
    }

    // Fetch sync logs
    const syncLogs = await prisma.syncLog.findMany({
      where: {
        repositoryId,
      },
      orderBy: {
        startedAt: "desc",
      },
      take: limit,
    });

    return {
      success: true,
      data: {
        repository: {
          id: repo.id,
          name: repo.name,
          fullName: repo.fullName,
        },
        logs: syncLogs,
        total: syncLogs.length,
      },
    };
  } catch (error) {
    console.error(
      `Error fetching sync logs for repository ${repositoryId}:`,
      error
    );
    return {
      success: false,
      error: "Failed to fetch sync logs",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function syncVersionTagDocumentationAction(repositoryId: string) {
  try {
    if (!repositoryId) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    const repo = await prisma.repository.findUnique({
      where: { id: repositoryId },
      select: {
        id: true,
        fullName: true,
        owner: true,
        name: true,
      },
    });

    if (!repo) {
      return {
        success: false,
        error: "Repository not found",
      };
    }

    // Get all version tags that need docs synced
    const { isSemverTag, syncTagDocumentation } = await import(
      "@/lib/github/documentation"
    );

    const tagsNeedingSync = await prisma.versionTag.findMany({
      where: {
        repositoryId,
        docsSynced: false,
      },
      select: {
        tagName: true,
        commitSha: true,
      },
    });

    // Filter to only semver tags
    const semverTags = tagsNeedingSync.filter((t) => isSemverTag(t.tagName));

    if (semverTags.length === 0) {
      return {
        success: true,
        message: "No version tags need documentation sync",
        synced: 0,
      };
    }

    console.log(
      `📚 Syncing documentation for ${semverTags.length} tags in ${repo.fullName}...`
    );

    let synced = 0;
    const errors: string[] = [];

    for (const tag of semverTags) {
      try {
        await syncTagDocumentation(repositoryId, tag.tagName, tag.commitSha);
        synced++;
        console.log(`  ✅ ${tag.tagName}`);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        errors.push(`${tag.tagName}: ${message}`);
        console.error(`  ❌ ${tag.tagName}:`, err);
      }
    }

    return {
      success: true,
      message: `Synced documentation for ${synced} of ${semverTags.length} version tags`,
      synced,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    console.error(
      `Error syncing version tag documentation for ${repositoryId}:`,
      error
    );
    return {
      success: false,
      error: "Failed to sync version tag documentation",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getRepositoryVersionTagsAction(repositoryId: string) {
  try {
    if (!repositoryId) {
      return {
        success: false,
        error: "Repository ID is required",
      };
    }

    const tags = await prisma.versionTag.findMany({
      where: { repositoryId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        tagName: true,
        commitSha: true,
        isLatest: true,
        docsSynced: true,
        docsSyncedAt: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      data: tags,
    };
  } catch (error) {
    console.error(
      `Error fetching version tags for repository ${repositoryId}:`,
      error
    );
    return {
      success: false,
      error: "Failed to fetch version tags",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
