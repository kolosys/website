"use server";

import { cache } from "react";
import { createHubClient } from "@kolosys-sites/hub-client";
import type { LibraryData, NavigationData, VersionInfo } from "@kolosys-sites/hub-client";

const hubClient = createHubClient({
  apiUrl: process.env.HUB_API_URL || process.env.NEXT_PUBLIC_HUB_API_URL || "http://localhost:3002",
  apiKey: process.env.HUB_API_KEY || "",
  userAgent: "Kolosys/WWW",
});

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

// Cached function to get featured libraries
// Uses React's cache for request-level deduplication
// Next.js fetch caching (via ky) handles persistent caching across requests
export const getFeaturedLibraries = cache(async (): Promise<LibraryData[]> => {
  try {
    const libs = await hubClient.getFeaturedLibraries();
    return libs;
  } catch (error) {
    console.error("Error fetching featured libraries:", error);
    return [];
  }
});

export const getLibraries = cache(async (): Promise<LibraryData[]> => {
  try {
    const libs = await hubClient.getDocumentationLibraries();
    return libs;
  } catch (error) {
    console.error("Error fetching documentation repositories:", error);
    return [];
  }
});

export const getLibraryNavigation = cache(
  async (
    libraryId: string,
    version: string = "latest"
  ): Promise<NavigationData[] | null> => {
    try {
      const lib = await hubClient.getDocumentationPage(libraryId, undefined, version);
      return lib?.navigation || null;
    } catch (error) {
      console.error("Error fetching library navigation:", error);
      return null;
    }
  }
);

export async function getLibrary(
  libraryId: string,
  slug?: string[],
  version: string = "latest"
) {
  try {
    const lib = await hubClient.getDocumentationPage(libraryId, slug, version);
    return lib;
  } catch (error) {
    console.error("Error fetching documentation repository:", error);
    return null;
  }
}

export async function getLibraryVersions(
  libraryId: string
): Promise<VersionInfo[]> {
  try {
    const libraries = await getLibraries();
    const library = libraries.find(lib => lib.id === libraryId);
    return library?.versions || [];
  } catch (error) {
    console.error("Error fetching library versions:", error);
    return [];
  }
}
