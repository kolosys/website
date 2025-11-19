import { PrismaClient } from "@/prisma/client";
import type { ContentGroup } from "./content/types";
import { buildNestedStructure, sortContentGroups } from "./content/tree-builder";

const prisma = new PrismaClient();

// Re-export types for convenience
export type { ContentItem, ContentNode, ContentGroup, TreeNode } from "./content/types";

/**
 * Fetch documentation content grouped by repository
 * Groups content by groupSlug (explicit group field)
 * Respects saved order from orderIndex array: [groupOrder, itemOrder, ...]
 */
export async function getDocumentationContentByRepository(
  repositoryId: string
): Promise<ContentGroup[]> {
  try {
    const content = await prisma.documentationContent.findMany({
      where: {
        repositoryId,
      },
      include: {
        repository: {
          select: {
            name: true,
          },
        },
      },
    });

    if (content.length === 0) {
      return [];
    }

    // Group content by groupSlug (explicit group field)
    const groupsMap = new Map<string, ContentGroup>();

    for (const item of content) {
      const groupKey = item.groupSlug || "uncategorized";
      const groupName = groupKey
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      if (!groupsMap.has(groupKey)) {
        groupsMap.set(groupKey, {
          id: groupKey,
          name: groupName,
          emoji: null, // Could be extracted from frontmatter or metadata
          group: "Documentation", // Default group type
          source: item.repository.name,
          items: [],
          children: [],
        });
      }

      const group = groupsMap.get(groupKey)!;
      const orderIndex = item.orderIndex || [];
      const slug = item.slug;

      // Check if this is a directory row (index.md placeholder with empty content and slug doesn't end in "index")
      const isDirectoryRow =
        item.filePath.endsWith("/index.md") &&
        item.content === "" &&
        slug[slug.length - 1] !== "index";

      if (isDirectoryRow) {
        // This is a directory row - treat it as a node, not a file
        // The slug represents the directory path (e.g., ["examples", "circuit"])
        buildNestedStructure(group, item, slug, orderIndex, item.repository.name);
      } else if (slug.length === 1) {
        // File at root level of group
        const itemName = item.title
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        group.items.push({
          id: item.id,
          name: itemName,
          emoji: item.emoji,
          source: item.repository.name,
          orderIndex,
          slug,
        });
      } else {
        // Nested file - build tree structure
        buildNestedStructure(group, item, slug, orderIndex, item.repository.name);
      }
    }

    // Sort groups and their nested structures
    return sortContentGroups(Array.from(groupsMap.values()));
  } catch (error) {
    console.error(
      `Error fetching documentation content for repository ${repositoryId}:`,
      error
    );
    return [];
  }
}

