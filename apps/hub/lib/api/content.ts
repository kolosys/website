import { DocumentationContent, PrismaClient } from "@/prisma/client";
import { getDocumentationContentByRepository } from "@/lib/content";
import { buildSimpleTree } from "@/lib/content/tree-builder";
import type { ContentGroup, TreeNode } from "@/lib/content/types";
import type { ApiResponse } from "./types";

const prisma = new PrismaClient();

/**
 * Get repository navigation tree (for API routes)
 */
export async function getDocumentationNavigationForApi(
  repositoryId?: string
): Promise<ApiResponse<TreeNode[]>> {
  try {
    const content = await prisma.documentationContent.findMany({
      where: {
        repositoryId,
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
  slug: string[]
): Promise<ApiResponse<DocumentationContent>> {
  try {
    const page = await prisma.documentationContent.findFirst({
      where: {
        repositoryId,
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
      data: page as any,
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
