import prisma, { type DocumentationContent } from "@/prisma";
import { buildSimpleTree } from "@/lib/content/tree-builder";
import type { TreeNode } from "@/lib/content/types";
import type { ApiResponse } from "./types";
import { compareSemver, parseSemver } from "@/lib/github/version-tags";

export interface VersionInfo {
  tag: string;
  label: string;
  isLatest: boolean;
}

async function resolveVersionTag(
  repositoryId: string,
  versionTag: string
): Promise<string> {
  // Handle "latest" - resolve to the highest semver tag with synced docs
  if (versionTag === "latest") {
    const latestTag = await prisma.versionTag.findFirst({
      where: { repositoryId, isLatest: true, docsSynced: true },
      select: { tagName: true },
    });

    if (latestTag?.tagName) {
      const contentExists = await prisma.documentationContent.findFirst({
        where: { repositoryId, versionTag: latestTag.tagName },
        select: { id: true },
      });

      if (contentExists) {
        return latestTag.tagName;
      }
    }
    return "next";
  }

  // Handle partial version (e.g., "v0.6" should resolve to highest patch like "v0.6.2")
  const partialMatch = versionTag.match(/^v?(\d+)\.(\d+)$/);
  if (partialMatch) {
    const major = parseInt(partialMatch[1], 10);
    const minor = parseInt(partialMatch[2], 10);

    // Find all synced tags matching this major.minor
    const matchingTags = await prisma.versionTag.findMany({
      where: { repositoryId, docsSynced: true },
      select: { tagName: true },
    });

    // Filter and sort to find the highest patch version
    const filteredTags = matchingTags
      .filter((t) => {
        const parsed = parseSemver(t.tagName);
        return parsed && parsed.major === major && parsed.minor === minor;
      })
      .sort((a, b) => compareSemver(a.tagName, b.tagName));

    if (filteredTags.length > 0) {
      const highestPatch = filteredTags[0].tagName;
      const contentExists = await prisma.documentationContent.findFirst({
        where: { repositoryId, versionTag: highestPatch },
        select: { id: true },
      });

      if (contentExists) {
        return highestPatch;
      }
    }
  }

  return versionTag;
}

export async function getRepositoryVersions(
  repositoryId: string
): Promise<VersionInfo[]> {
  const [syncedTags, latestTag, hasNext] = await Promise.all([
    prisma.versionTag.findMany({
      where: { repositoryId, docsSynced: true },
      orderBy: { createdAt: "desc" },
      select: { tagName: true, isLatest: true },
    }),
    prisma.versionTag.findFirst({
      where: { repositoryId, isLatest: true },
      select: { tagName: true, docsSynced: true },
    }),
    prisma.documentationMetadata.findFirst({
      where: { repositoryId, versionTag: "next" },
    }),
  ]);

  const versions: VersionInfo[] = [];

  // Always add "latest" if there's a latest tag (even if docs not synced)
  // The "latest" alias will resolve to the actual tag or fall back to "next"
  if (latestTag) {
    versions.push({
      tag: "latest",
      label: latestTag.docsSynced ? `Latest (${latestTag.tagName})` : `Latest (${latestTag.tagName})`,
      isLatest: true,
    });
  }

  if (hasNext) {
    versions.push({ tag: "next", label: "Next (Unreleased)", isLatest: false });
  }

  for (const tag of syncedTags) {
    // Skip if this is the latest tag (already added as "latest")
    if (tag.isLatest && latestTag) continue;
    versions.push({
      tag: tag.tagName,
      label: tag.tagName,
      isLatest: false,
    });
  }

  return versions;
}

export async function getDocumentationNavigationForApi(
  repositoryId?: string,
  versionTag: string = "latest"
): Promise<ApiResponse<TreeNode[]>> {
  try {
    const resolvedVersion = repositoryId
      ? await resolveVersionTag(repositoryId, versionTag)
      : "next";

    const content = await prisma.documentationContent.findMany({
      where: {
        repositoryId,
        versionTag: resolvedVersion,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        orderIndex: true,
        emoji: true,
        faIcon: true,
        hidden: true,
        filePath: true,
        content: true,
      },
      orderBy: {
        orderIndex: "asc",
      },
    });

    const tree = buildSimpleTree(content as any);
    return {
      success: true,
      data: tree,
    };
  } catch (error) {
    console.error("Error building navigation tree:", error);
    return {
      success: false,
      error: "Failed to build navigation tree",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getDocumentationPageForApi(
  repositoryId: string,
  slug: string[],
  versionTag: string = "latest"
): Promise<ApiResponse<DocumentationContent & { resolvedVersion: string }>> {
  try {
    const resolvedVersion = await resolveVersionTag(repositoryId, versionTag);

    // Use exact slug match - hasEvery alone doesn't ensure same length/order
    const page = await prisma.documentationContent.findFirst({
      where: {
        repositoryId,
        versionTag: resolvedVersion,
        slug:
          slug.length > 0
            ? {
              equals: slug,
            }
            : undefined,
        hidden: false,
      },
      select: {
        id: true,
        title: true,
        description: true,
        emoji: true,
        faIcon: true,
        status: true,
        content: true,
      },
    });
    return {
      success: true,
      data: page ? { ...page, resolvedVersion } : (null as any),
    };
  } catch (error) {
    console.error("Error fetching documentation page:", error);
    return {
      success: false,
      error: "Failed to fetch documentation page",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
