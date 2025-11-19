import { getTrackedRepositories } from "@/lib/repositories";
import type { RepositoryData } from "@/lib/repositories/types";
import type { ApiResponse, PaginatedResponse } from "./types";

/**
 * Get all repositories (for API routes)
 */
export async function getRepositoriesForApi(): Promise<
  PaginatedResponse<RepositoryData>
> {
  try {
    const repositories = await getTrackedRepositories();
    return {
      success: true,
      data: {
        items: repositories,
        total: repositories.length,
      },
    };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return {
      success: false,
      error: "Failed to fetch repositories",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get featured repositories only (for www/docs apps)
 */
export async function getFeaturedRepositoriesForApi(): Promise<
  PaginatedResponse<RepositoryData>
> {
  try {
    const repositories = await getTrackedRepositories();
    const featured = repositories.filter((repo) => repo.featured);
    return {
      success: true,
      data: {
        items: featured,
        total: featured.length,
      },
    };
  } catch (error) {
    console.error("Error fetching featured repositories:", error);
    return {
      success: false,
      error: "Failed to fetch featured repositories",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get a single repository by ID (for API routes)
 */
export async function getRepositoryByIdForApi(
  id: string
): Promise<ApiResponse<RepositoryData>> {
  try {
    const repositories = await getTrackedRepositories();
    const repository = repositories.find((repo) => repo.id === id);

    if (!repository) {
      return {
        success: false,
        error: "Repository not found",
      };
    }

    return {
      success: true,
      data: repository,
    };
  } catch (error) {
    console.error("Error fetching repository:", error);
    return {
      success: false,
      error: "Failed to fetch repository",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

