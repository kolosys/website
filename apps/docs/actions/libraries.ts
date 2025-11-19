"use server";

import { cache } from "react";
import {
  getDocumentationLibraries,
  getDocumentationPage,
} from "@/lib/hub/client";
import type { LibraryData, NavigationData } from "../lib/hub/types";

// Cached function to get libraries
// Uses React's cache for request-level deduplication
// Next.js fetch caching (via ky) handles persistent caching across requests
export const getLibraries = cache(async (): Promise<LibraryData[]> => {
  try {
    const libs = await getDocumentationLibraries();
    return libs;
  } catch (error) {
    console.error("Error fetching documentation repositories:", error);
    return [];
  }
});

// Cached function to get library navigation (without page content)
// Uses React's cache for request-level deduplication
// Next.js fetch caching (via ky) handles persistent caching across requests
export const getLibraryNavigation = cache(
  async (libraryId: string): Promise<NavigationData[] | null> => {
    try {
      const lib = await getDocumentationPage(libraryId);
      return lib?.navigation || null;
    } catch (error) {
      console.error("Error fetching library navigation:", error);
      return null;
    }
  }
);

export async function getLibrary(libraryId: string, slug?: string[]) {
  try {
    const lib = await getDocumentationPage(libraryId, slug);
    return lib;
  } catch (error) {
    console.error("Error fetching documentation repository:", error);
    return null;
  }
}
