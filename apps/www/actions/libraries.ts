"use server";

import { cache } from "react";
import hubClient from "@/lib/hub/client";
import type { LibraryData } from "@/lib/hub/types";

// Cached function to get libraries
// Uses React's cache for request-level deduplication
// Next.js fetch caching (via ky) handles persistent caching across requests
export const getAllLibraries = cache(async (): Promise<LibraryData[]> => {
  try {
    const libs = await hubClient.getDocumentationLibraries();
    return libs;
  } catch (error) {
    console.error("Error fetching documentation repositories:", error);
    return [];
  }
});

// Cached function to get featured repositories
// Uses React's cache for request-level deduplication
// Next.js fetch caching (via ky) handles persistent caching across requests
// export const getFeaturedRepos = cache(async (): Promise<RepositoryData[]> => {
//   try {
//     const repos = await getFeaturedRepositories();
//     return repos;
//   } catch (error) {
//     console.error("Error fetching featured repositories:", error);
//     return [];
//   }
// });

// Get a single repository by ID
// export async function getRepositoryById(id: string): Promise<RepositoryData | null> {
//   try {
//     const repositories = await getAllRepositories();
//     const repository = repositories.find((repo) => repo.id === id);
//     return repository || null;
//   } catch (error) {
//     console.error(`Error fetching repository ${id}:`, error);
//     return null;
//   }
// }
