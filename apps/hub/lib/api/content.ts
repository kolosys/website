import prisma, { type DocumentationContent } from "@/prisma";
import { buildSimpleTree, buildTreeFromNav } from "@/lib/content/tree-builder";
import type { TreeNode } from "@/lib/content/types";
import type { ApiResponse } from "./types";
import { compareSemver, parseSemver } from "@/lib/github/version-tags";

// Feature flag for v2.5 schema
const USE_V25_SCHEMA = process.env.USE_V25_SCHEMA === "true";

export interface VersionInfo {
  tag: string;
  label: string;
  isLatest: boolean;
}

// v2.5 helper functions
async function resolveVersionTagV25(
  projectId: string,
  versionTag: string
): Promise<string> {
  if (versionTag === "latest") {
    const latestVersion = await prisma.version.findFirst({
      where: { projectId, isLatest: true, docsSynced: true },
      select: { tag: true },
    });

    if (latestVersion?.tag) {
      const contentExists = await prisma.content.findFirst({
        where: { version: { projectId, tag: latestVersion.tag } },
        select: { id: true },
      });

      if (contentExists) {
        return latestVersion.tag;
      }
    }
    return "next";
  }

  const partialMatch = versionTag.match(/^v?(\d+)\.(\d+)$/);
  if (partialMatch) {
    const major = parseInt(partialMatch[1], 10);
    const minor = parseInt(partialMatch[2], 10);

    const matchingVersions = await prisma.version.findMany({
      where: { projectId, docsSynced: true },
      select: { tag: true },
    });

    const filteredVersions = matchingVersions
      .filter((v) => {
        const parsed = parseSemver(v.tag);
        return parsed && parsed.major === major && parsed.minor === minor;
      })
      .sort((a, b) => compareSemver(a.tag, b.tag));

    if (filteredVersions.length > 0) {
      const highestPatch = filteredVersions[0].tag;
      const contentExists = await prisma.content.findFirst({
        where: { version: { projectId, tag: highestPatch } },
        select: { id: true },
      });

      if (contentExists) {
        return highestPatch;
      }
    }
  }

  return versionTag;
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

async function getRepositoryVersionsV25(
  projectId: string
): Promise<VersionInfo[]> {
  const [syncedVersions, latestVersion, hasNext] = await Promise.all([
    prisma.version.findMany({
      where: { projectId, docsSynced: true },
      orderBy: { createdAt: "desc" },
      select: { tag: true, isLatest: true },
    }),
    prisma.version.findFirst({
      where: { projectId, isLatest: true },
      select: { tag: true, docsSynced: true },
    }),
    prisma.version.findFirst({
      where: { projectId, tag: "next" },
    }),
  ]);

  const versions: VersionInfo[] = [];

  if (latestVersion) {
    versions.push({
      tag: "latest",
      label: latestVersion.docsSynced ? `Latest (${latestVersion.tag})` : `Latest (${latestVersion.tag})`,
      isLatest: true,
    });
  }

  if (hasNext) {
    versions.push({ tag: "next", label: "Next (Unreleased)", isLatest: false });
  }

  for (const version of syncedVersions) {
    if (version.isLatest && latestVersion) continue;
    versions.push({
      tag: version.tag,
      label: version.tag,
      isLatest: false,
    });
  }

  return versions;
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

async function getDocumentationNavigationForApiV25(
  projectId?: string,
  versionTag: string = "latest"
): Promise<ApiResponse<TreeNode[]>> {
  try {
    const resolvedVersion = projectId
      ? await resolveVersionTagV25(projectId, versionTag)
      : "next";

    const version = await prisma.version.findFirst({
      where: {
        project: { id: projectId },
        tag: resolvedVersion,
      },
    });

    if (!version) {
      return {
        success: false,
        error: "Version not found",
        message: `Version ${resolvedVersion} not found for project ${projectId}`,
      };
    }

    const [navNodes, content] = await Promise.all([
      prisma.navStructure.findMany({
        where: { projectId },
        select: {
          id: true,
          parentId: true,
          slugPattern: true,
          sortOrder: true,
          type: true,
          customTitle: true,
          customEmoji: true,
          customIcon: true,
          hidden: true,
        },
        orderBy: [{ parentId: "asc" }, { sortOrder: "asc" }],
      }),
      prisma.content.findMany({
        where: { versionId: version.id },
        select: {
          id: true,
          slug: true,
          title: true,
          emoji: true,
          faIcon: true,
        },
      }),
    ]);

    const tree = buildTreeFromNav(navNodes, content);
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

export async function getDocumentationNavigationForApi(
  repositoryId?: string,
  versionTag: string = "latest"
): Promise<ApiResponse<TreeNode[]>> {
  if (USE_V25_SCHEMA) {
    return getDocumentationNavigationForApiV25(repositoryId, versionTag);
  }

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

async function getDocumentationPageForApiV25(
  projectId: string,
  slug: string[],
  versionTag: string = "latest"
): Promise<ApiResponse<any>> {
  try {
    const resolvedVersion = await resolveVersionTagV25(projectId, versionTag);

    const version = await prisma.version.findFirst({
      where: {
        project: { id: projectId },
        tag: resolvedVersion,
      },
    });

    if (!version) {
      return {
        success: false,
        error: "Version not found",
        message: `Version ${resolvedVersion} not found for project ${projectId}`,
      };
    }

    const page = await prisma.content.findFirst({
      where: {
        versionId: version.id,
        slug: slug.length > 0 ? { equals: slug } : undefined,
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
      data: page ? { ...page, resolvedVersion } : null,
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

export async function getDocumentationPageForApi(
  repositoryId: string,
  slug: string[],
  versionTag: string = "latest"
): Promise<ApiResponse<DocumentationContent & { resolvedVersion: string }>> {
  if (USE_V25_SCHEMA) {
    return getDocumentationPageForApiV25(repositoryId, slug, versionTag);
  }

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
