import prisma, { type DocumentationContent } from "@/prisma";
import { buildSimpleTree } from "@/lib/content/tree-builder";
import type { TreeNode } from "@/lib/content/types";
import type { ApiResponse } from "./types";

export interface VersionInfo {
  tag: string;
  label: string;
  isLatest: boolean;
}

async function resolveVersionTag(
  repositoryId: string,
  versionTag: string
): Promise<string> {
  if (versionTag === "latest") {
    const latestTag = await prisma.versionTag.findFirst({
      where: { repositoryId, isLatest: true, docsSynced: true },
      select: { tagName: true },
    });
    return latestTag?.tagName || "next";
  }
  return versionTag;
}

export async function getRepositoryVersions(
  repositoryId: string
): Promise<VersionInfo[]> {
  const [tags, hasNext] = await Promise.all([
    prisma.versionTag.findMany({
      where: { repositoryId, docsSynced: true },
      orderBy: { createdAt: "desc" },
      select: { tagName: true, isLatest: true },
    }),
    prisma.documentationMetadata.findFirst({
      where: { repositoryId, versionTag: "next" },
    }),
  ]);

  const versions: VersionInfo[] = [];

  if (hasNext) {
    versions.push({ tag: "next", label: "Next (Unreleased)", isLatest: false });
  }

  for (const tag of tags) {
    versions.push({
      tag: tag.tagName,
      label: tag.tagName,
      isLatest: tag.isLatest,
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

    const page = await prisma.documentationContent.findFirst({
      where: {
        repositoryId,
        versionTag: resolvedVersion,
        slug:
          slug.length > 0
            ? {
                hasEvery: slug,
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
