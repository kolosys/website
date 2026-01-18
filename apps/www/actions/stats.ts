"use server";

import { cache } from "react";
import { getAllLibraries } from "./libraries";

export type OrganizationStats = {
  totalLibraries: number;
  totalStars: number;
  publishedLibraries: number;
  featuredLibraries: number;
};

export const getOrganizationStats = cache(async (): Promise<OrganizationStats> => {
  try {
    const libraries = await getAllLibraries();

    const stats = libraries.reduce(
      (acc, lib) => {
        acc.totalLibraries++;
        acc.totalStars += lib.stargazersCount || 0;
        if (lib.published) acc.publishedLibraries++;
        if (lib.featured) acc.featuredLibraries++;
        return acc;
      },
      {
        totalLibraries: 0,
        totalStars: 0,
        publishedLibraries: 0,
        featuredLibraries: 0,
      }
    );

    return stats;
  } catch (error) {
    console.error("Error calculating organization stats:", error);
    return {
      totalLibraries: 0,
      totalStars: 0,
      publishedLibraries: 0,
      featuredLibraries: 0,
    };
  }
});
