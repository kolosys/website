import type { ContentGroup, ContentNode, ContentItem, TreeNode } from "./types";
import type { DocumentationContent } from "@/prisma";

/**
 * Builds nested tree structure for content groups
 */
export function buildNestedStructure(
  group: ContentGroup,
  item: DocumentationContent & { repository: { name: string } },
  slug: string[],
  orderIndex: number[],
  source: string
): void {
  if (!group.children) {
    group.children = [];
  }

  // Check if this is a directory row (empty content, filePath ends with index.md, slug doesn't end in "index")
  const isDirectoryRow =
    item.filePath.endsWith("/index.md") &&
    item.content === "" &&
    slug[slug.length - 1] !== "index";

  if (isDirectoryRow) {
    // This is a directory row - create/update the node at this path
    // The slug represents the directory path (e.g., ["examples", "circuit"])
    let currentLevel = group.children;
    let currentPath: string[] = [slug[0]]; // Start with group slug

    // Process each segment to build/create the node path
    for (let i = 1; i < slug.length; i++) {
      const segment = slug[i];
      currentPath.push(segment);

      // Find or create node at this level
      let node = currentLevel.find((n) => {
        // Match node by checking if its slug path matches up to this point
        return (
          n.slug.length === currentPath.length &&
          n.slug.every((seg, idx) => seg === currentPath[idx])
        );
      });

      if (!node) {
        const nodeName = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        // Get orderIndex for this level
        const nodeOrderIndex = orderIndex.slice(0, i + 1);

        node = {
          id: currentPath.join("/"),
          name: nodeName,
          emoji: item.emoji, // Use emoji from directory row
          slug: [...currentPath],
          orderIndex: nodeOrderIndex,
          level: i,
          items: [],
          children: [],
        };

        currentLevel.push(node);
      } else {
        // Update existing node with emoji from directory row if available
        if (item.emoji) {
          node.emoji = item.emoji;
        }
      }

      // If this is the last segment, we've created/updated the target node
      if (i === slug.length - 1) {
        break;
      }

      currentLevel = node.children;
    }
    return; // Directory row handled, don't process as file
  }

  // Regular file processing
  // Traverse/create path through nested structure
  let currentLevel = group.children;
  let currentPath: string[] = [slug[0]]; // Start with group slug

  // Process each segment except the last (which is the file)
  for (let i = 1; i < slug.length - 1; i++) {
    const segment = slug[i];
    currentPath.push(segment);

    // Find or create node at this level
    let node = currentLevel.find((n) => {
      // Match node by checking if its slug path matches up to this point
      return (
        n.slug.length === currentPath.length &&
        n.slug.every((seg, idx) => seg === currentPath[idx])
      );
    });

    if (!node) {
      const nodeName = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Get orderIndex for this level (orderIndex[i] corresponds to slug[i])
      const nodeOrderIndex = orderIndex.slice(0, i + 1);

      node = {
        id: currentPath.join("/"),
        name: nodeName,
        emoji: null,
        slug: [...currentPath],
        orderIndex: nodeOrderIndex,
        level: i,
        items: [],
        children: [],
      };

      currentLevel.push(node);
    }

    currentLevel = node.children;
  }

  // Add the file to the appropriate level (currentLevel is now the parent node's children or items)
  const fileSegment = slug[slug.length - 1];
  const itemName = fileSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const contentItem: ContentItem = {
    id: item.id,
    name: itemName,
    emoji: item.emoji,
    source,
    orderIndex,
    slug,
  };

  // Find the parent node to add the file to
  const parentPath = slug.slice(0, -1);
  let parentNode: ContentNode | undefined;

  if (parentPath.length === 1) {
    // File is directly in group root, add to group.items
    group.items.push(contentItem);
  } else {
    // Find the parent node
    let searchLevel = group.children;
    for (let i = 1; i < parentPath.length; i++) {
      const segment = parentPath[i];
      parentNode = searchLevel.find((n) => {
        return (
          n.slug.length === i + 1 &&
          n.slug[i] === segment &&
          n.slug.slice(0, i).every((seg, idx) => seg === parentPath[idx])
        );
      });
      if (!parentNode) break;
      searchLevel = parentNode.children;
    }

    if (parentNode) {
      parentNode.items.push(contentItem);
    } else {
      // Fallback: add to group items if parent not found
      group.items.push(contentItem);
    }
  }
}

/**
 * Sorts content groups and their nested structures by orderIndex
 */
export function sortContentGroups(groups: ContentGroup[]): ContentGroup[] {
  // Sort groups by orderIndex[0] (group order), then alphabetically
  const sortedGroups = Array.from(groups).sort((a, b) => {
    // Get first item from each group to compare group order
    const aFirstItem = a.items[0] || (a.children && a.children[0]?.items[0]);
    const bFirstItem = b.items[0] || (b.children && b.children[0]?.items[0]);

    const aGroupOrder = aFirstItem?.orderIndex[0];
    const bGroupOrder = bFirstItem?.orderIndex[0];

    // If both have group order, use that
    if (aGroupOrder !== undefined && bGroupOrder !== undefined) {
      return aGroupOrder - bGroupOrder;
    }

    // If only one has group order, prioritize it
    if (aGroupOrder !== undefined) return -1;
    if (bGroupOrder !== undefined) return 1;

    // Otherwise sort alphabetically
    return a.name.localeCompare(b.name);
  });

  // Recursive function to sort nested structures
  function sortNode(node: ContentNode | ContentGroup): void {
    // Sort items at this level
    if ("items" in node) {
      node.items.sort((a, b) => {
        const aOrder = a.orderIndex || [];
        const bOrder = b.orderIndex || [];

        // Compare arrays lexicographically
        const minLength = Math.min(aOrder.length, bOrder.length);
        for (let i = 0; i < minLength; i++) {
          if (aOrder[i] !== bOrder[i]) {
            return aOrder[i] - bOrder[i];
          }
        }

        // If arrays are equal up to minLength, shorter comes first
        if (aOrder.length !== bOrder.length) {
          return aOrder.length - bOrder.length;
        }

        // If orderIndex arrays are identical, sort by name
        return a.name.localeCompare(b.name);
      });
    }

    // Sort children recursively
    if ("children" in node && node.children) {
      node.children.sort((a, b) => {
        // Compare by orderIndex at their level
        const aOrder = a.orderIndex || [];
        const bOrder = b.orderIndex || [];
        const level = a.level;

        if (aOrder[level] !== undefined && bOrder[level] !== undefined) {
          return aOrder[level] - bOrder[level];
        }

        // Fallback to alphabetical
        return a.name.localeCompare(b.name);
      });

      // Recursively sort children
      node.children.forEach(sortNode);
    }
  }

  // Sort all groups and their nested structures
  for (const group of sortedGroups) {
    sortNode(group);
  }

  return sortedGroups;
}

/**
 * Builds a simple tree structure from flat content array (for API routes)
 */
export function buildSimpleTree(content: DocumentationContent[]): TreeNode[] {
  function addChildren(parentSlug: string[]): TreeNode[] {
    const children = content.filter((item) => {
      if (item.slug.length !== parentSlug.length + 1) return false;
      for (let i = 0; i < parentSlug.length; i++) {
        if (item.slug[i] !== parentSlug[i]) return false;
      }
      return true;
    });

    return children
      .sort((a, b) => {
        for (
          let i = 0;
          i < Math.max(a.orderIndex.length, b.orderIndex.length);
          i++
        ) {
          const ai = a.orderIndex[i] ?? -1;
          const bi = b.orderIndex[i] ?? -1;
          if (ai !== bi) return ai - bi;
        }
        return 0;
      })
      .map((item, index) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        emoji: item.emoji,
        faIcon: item.faIcon,
        order: index,
        children: addChildren(item.slug).filter(
          (child) => child.hidden === false
        ),
        hidden: item.hidden,
      }));
  }

  return addChildren([]);
}
