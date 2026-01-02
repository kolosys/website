"use server";

import { cache } from "react";
import {
  getDocumentationLibraries,
  getDocumentationPage,
} from "@/lib/hub/client";
import type { LibraryData, NavigationData } from "../lib/hub/types";

export const getLibraries = cache(async (): Promise<LibraryData[]> => {
  try {
    const libs = await getDocumentationLibraries();
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
      const lib = await getDocumentationPage(libraryId, undefined, version);
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
    const lib = await getDocumentationPage(libraryId, slug, version);
    return lib;
  } catch (error) {
    console.error("Error fetching documentation repository:", error);
    return null;
  }
}
