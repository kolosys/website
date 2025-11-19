import { PrismaClient } from "@/prisma/client";
import type { RepositoryData } from "./repositories/types";
import { transformRepository } from "./repositories/transformers";

const prisma = new PrismaClient();

// Re-export types for convenience
export type { RepositoryData } from "./repositories/types";

/**
 * Fetch all tracked repositories from the database
 * Can be used by both API routes and server components
 */
export async function getTrackedRepositories(
  quick = false
): Promise<RepositoryData[]> {
  try {
    // Fetch all tracked repositories with their documentation metadata and latest version tag
    const repositories = await prisma.repository.findMany({
      select: quick
        ? {
            id: true,
            name: true,
            fullName: true,
            description: true,
            emoji: true,
            faIcon: true,
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
            syncLogs: {
              take: 1,
              orderBy: { startedAt: "desc" },
            },
            versionTags: {
              where: { isLatest: true },
              take: 1,
            },
          },
      orderBy: { updatedAt: "desc" },
    });

    // Transform data to include computed fields
    return repositories.map(transformRepository as any);
  } catch (error) {
    console.error("Error fetching tracked repositories:", error);
    return [];
  }
}
