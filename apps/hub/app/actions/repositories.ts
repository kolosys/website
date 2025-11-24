"use server";

import { getTrackedRepositories, RepositoryData } from "@/lib/repositories";
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

    // Kick off async sync - don't wait for completion
    syncSingleRepositoryData(id).catch((error) => {
      console.error(`Error syncing repository ${id}:`, error);
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
        documentationMetadata: true,
        syncLogs: {
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
    const isSyncing = latestSyncLog?.status === "in_progress";
    const lastSyncDate =
      repo.documentationMetadata?.lastSyncedAt || repo.syncedAt;

    let lastSyncText: string;

    // Check if there's no sync data or content
    if (!repo.documentationMetadata && repo.syncLogs.length === 0) {
      lastSyncText = "Never";
    } else if (isSyncing) {
      lastSyncText = "Syncing docs...";
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
        pages: repo.documentationMetadata?.fileCount || 0,
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
