"use server";

import prisma, { type DocumentationContent } from "@/prisma";
import type { ContentGroup } from "@/lib/content/types";
import {
  buildNestedStructure,
  buildSimpleTree,
  sortContentGroups,
} from "@/lib/content/tree-builder";

export async function getContentTree(repoId?: string | null) {
  try {
    const content = await prisma.documentationContent.findMany({
      where: {
        repositoryId: repoId ?? undefined,
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

    return buildSimpleTree(content as DocumentationContent[]);
  } catch (error) {
    console.error("Error building content tree:", error);
    throw new Error("Failed to build content tree");
  }
}

export async function getRepositoryContent(repositoryId: string) {
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
      return {
        success: true,
        content: [],
      };
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
        buildNestedStructure(
          group,
          item,
          slug,
          orderIndex,
          item.repository.name
        );
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
        buildNestedStructure(
          group,
          item,
          slug,
          orderIndex,
          item.repository.name
        );
      }
    }

    // Sort groups and their nested structures
    return {
      content: sortContentGroups(Array.from(groupsMap.values())),
      success: true,
    };
  } catch (error) {
    console.error("Error fetching documentation content:", error);
    return {
      success: false,
      error: "Failed to fetch documentation content",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getContentItem(id: string) {
  try {
    const item = await prisma.documentationContent.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        emoji: true,
        faIcon: true,
        status: true,
        version: true,
        slug: true,
        filePath: true,
        hidden: true,
      },
    });

    if (!item) {
      return {
        success: false,
        error: "Item not found",
      };
    }

    return {
      success: true,
      item,
    };
  } catch (error) {
    console.error("Error fetching content item:", error);
    return {
      success: false,
      error: "Failed to fetch item",
    };
  }
}

export async function updateContentItem(
  id: string,
  data: {
    emoji?: string | null;
    faIcon?: string | null;
    status?: string;
    version?: string | null;
    description?: string | null;
    hidden?: boolean;
  }
) {
  try {
    const updatedItem = await prisma.documentationContent.update({
      where: { id },
      data: {
        ...(data.emoji !== undefined && { emoji: data.emoji || null }),
        ...(data.faIcon !== undefined && { faIcon: data.faIcon || null }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.version !== undefined && { version: data.version || null }),
        ...(data.description !== undefined && {
          description: data.description || null,
        }),
        ...(data.hidden !== undefined && { hidden: data.hidden }),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        description: true,
        emoji: true,
        faIcon: true,
        status: true,
        version: true,
        slug: true,
        filePath: true,
        hidden: true,
      },
    });

    return {
      success: true,
      item: updatedItem,
    };
  } catch (error) {
    console.error("Error updating content item:", error);
    return {
      success: false,
      error: "Failed to update item",
    };
  }
}

export async function getContentGroup(groupSlug: string, repositoryId: string) {
  try {
    const groupIndex = await prisma.$queryRaw<
      Array<{
        id: string;
        title: string;
        description: string | null;
        emoji: string | null;
        fa_icon: string | null;
        hidden: boolean;
        slug: string[];
        file_path: string;
      }>
    >`
      SELECT id, title, description, emoji, fa_icon, hidden, slug, file_path
      FROM documentation_content
      WHERE repository_id = ${repositoryId}
        AND group_slug = ${groupSlug}
        AND array_length(slug, 1) = 1
        AND slug[1] = ${groupSlug}
        AND file_path LIKE '%/index.md'
      LIMIT 1
    `;

    if (groupIndex.length === 0) {
      return {
        success: false,
        error: "Group index not found",
      };
    }

    const result = groupIndex[0];
    return {
      success: true,
      group: {
        id: result.id,
        title: result.title,
        description: result.description,
        emoji: result.emoji,
        faIcon: result.fa_icon,
        hidden: result.hidden,
        slug: result.slug,
        filePath: result.file_path,
      },
    };
  } catch (error) {
    console.error("Error fetching group index:", error);
    return {
      success: false,
      error: "Failed to fetch group index",
    };
  }
}

export async function updateContentGroup(
  groupSlug: string,
  repositoryId: string,
  data: {
    emoji?: string | null;
    faIcon?: string | null;
    hidden?: boolean;
  }
) {
  try {
    const groupIndex = await prisma.$queryRaw<
      Array<{
        id: string;
        hidden: boolean;
      }>
    >`
      SELECT id, hidden
      FROM documentation_content
      WHERE repository_id = ${repositoryId}
        AND group_slug = ${groupSlug}
        AND array_length(slug, 1) = 1
        AND slug[1] = ${groupSlug}
        AND file_path LIKE '%/index.md'
      LIMIT 1
    `;

    if (groupIndex.length === 0) {
      return {
        success: false,
        error: "Group index not found",
      };
    }

    const indexRow = groupIndex[0];
    const updatedItem = await prisma.documentationContent.update({
      where: { id: indexRow.id },
      data: {
        emoji: data.emoji,
        faIcon: data.faIcon,
        hidden: data.hidden !== undefined ? data.hidden : indexRow.hidden,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      message: "Group index updated successfully",
      item: updatedItem,
    };
  } catch (error) {
    console.error("Error updating group index:", error);
    return {
      success: false,
      error: "Failed to update group index",
    };
  }
}

export async function updateContentOrder(
  repositoryId: string,
  groupOrder: Record<string, number>,
  itemOrders: Record<string, Record<string, number[] | number>>
) {
  try {
    if (!groupOrder || !itemOrders) {
      return {
        success: false,
        error: "Missing groupOrder or itemOrders",
      };
    }

    // First, fetch all items that need updating to preserve deeper orderIndex levels
    const allItemIds = new Set<string>();
    for (const itemOrderMap of Object.values(itemOrders)) {
      if (itemOrderMap) {
        Object.keys(itemOrderMap).forEach((id) => allItemIds.add(id));
      }
    }

    const currentItems = await prisma.documentationContent.findMany({
      where: {
        id: { in: Array.from(allItemIds) },
      },
      select: {
        id: true,
        orderIndex: true,
      },
    });

    const itemsMap = new Map(currentItems.map((item) => [item.id, item]));

    // Build update promises
    const updatePromises: Promise<any>[] = [];

    // Find group index rows
    const groupIndexRows = await prisma.$queryRaw<
      Array<{
        id: string;
        group_slug: string;
      }>
    >`
      SELECT id, group_slug
      FROM documentation_content
      WHERE repository_id = ${repositoryId}
        AND file_path LIKE '%/index.md'
        AND array_length(slug, 1) = 1
        AND slug[1] = group_slug
        AND content = ''
    `;

    const groupIndexMap = new Map(
      groupIndexRows.map((row) => [row.group_slug, row.id])
    );

    // Update group index rows
    for (const [groupId, groupOrderIndex] of Object.entries(groupOrder)) {
      const groupIndexRowId = groupIndexMap.get(groupId);

      if (groupIndexRowId) {
        updatePromises.push(
          prisma.documentationContent
            .update({
              where: { id: groupIndexRowId },
              data: {
                orderIndex: [groupOrderIndex as number],
              },
            })
            .catch((error) => {
              console.error(
                `Failed to update group index row for ${groupId}:`,
                error
              );
              throw error;
            })
        );
      }
    }

    // Update all items in each group
    for (const [groupId, groupOrderIndex] of Object.entries(groupOrder)) {
      const itemOrderMap = itemOrders[groupId] as
        | Record<string, number[] | number>
        | undefined;

      if (!itemOrderMap) continue;

      for (const [itemId, itemOrderIndexValue] of Object.entries(
        itemOrderMap
      )) {
        const currentItem = itemsMap.get(itemId);

        let newOrderIndex: number[];
        if (Array.isArray(itemOrderIndexValue)) {
          newOrderIndex = itemOrderIndexValue;
        } else {
          newOrderIndex = [groupOrderIndex as number, itemOrderIndexValue];

          if (currentItem?.orderIndex && currentItem.orderIndex.length > 2) {
            newOrderIndex.push(...currentItem.orderIndex.slice(2));
          }
        }

        updatePromises.push(
          prisma.documentationContent
            .update({
              where: { id: itemId },
              data: {
                orderIndex: newOrderIndex,
                groupSlug: groupId,
              },
            })
            .catch((error) => {
              console.error(`Failed to update item ${itemId}:`, error);
              throw error;
            })
        );
      }
    }

    await Promise.all(updatePromises);

    return {
      success: true,
      message: "Order saved successfully",
    };
  } catch (error) {
    console.error("Error saving content order:", error);
    return {
      success: false,
      error: "Failed to save order",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
