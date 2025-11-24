import prisma, { type Prisma } from "@/prisma";
import type { RepositoryData } from "./repositories/types";
import { transformRepository } from "./repositories/transformers";

// Re-export types for convenience
export type { RepositoryData } from "./repositories/types";

/**
 * Fetch all tracked repositories from the database
 * Can be used by both API routes and server components
 */
export async function getTrackedRepositories({
  quick = false,
  published_only = false,
  featured = false,
} = {}): Promise<RepositoryData[]> {
  try {
    const orderBy: Prisma.RepositoryOrderByWithRelationInput[] = [
      { updatedAt: "desc" },
    ];

    const where: Prisma.RepositoryWhereInput = {};
    if (published_only) {
      where.published = true;
      orderBy.push({ published: "desc" });
    }

    if (featured) {
      where.featured = true;
      orderBy.push({ featured: "desc" });
    }

    // Fetch all tracked repositories with their documentation metadata and latest version tag
    const repositories = await prisma.repository.findMany({
      where,
      select: quick
        ? {
            id: true,
            name: true,
            fullName: true,
            description: true,
            emoji: true,
            faIcon: true,
            featured: true,
            documentationMetadata: {
              select: {
                lastSyncedAt: true,
              },
            },
            versionTags: {
              where: { isLatest: true },
              take: 1,
              select: {
                tagName: true,
              },
            },
            documentationContent: {
              where: { orderIndex: { hasSome: [0, 0] } },
              take: 1,
              select: {
                slug: true,
              },
            },
          }
        : {
            id: true,
            name: true,
            fullName: true,
            emoji: true,
            documentationMetadata: true,
            defaultBranch: true,
            docsPath: true,
            featured: true,
            published: true,
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
    return repositories.map(transformRepository as any);
  } catch (error) {
    console.error("Error fetching tracked repositories:", error);
    return [];
  }
}
