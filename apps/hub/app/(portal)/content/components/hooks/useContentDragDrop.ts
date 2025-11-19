import { useState, useCallback } from "react";
import type { ContentGroup, ContentNode, ContentItem } from "@/lib/content";

type ContentGroupWithExpanded = ContentGroup & {
  expanded: boolean;
};

type DraggedItem = {
  groupId: string;
  itemId: string;
  nodePath?: string[];
};

type DraggedNode = {
  groupId: string;
  nodeId: string;
  path: string[];
};

type UseContentDragDropProps = {
  content: ContentGroupWithExpanded[];
  setContent: React.Dispatch<React.SetStateAction<ContentGroupWithExpanded[]>>;
};

/**
 * Hook to manage drag and drop state and handlers for content table
 */
export function useContentDragDrop({
  content,
  setContent,
}: UseContentDragDropProps) {
  const [draggedGroup, setDraggedGroup] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [draggedNode, setDraggedNode] = useState<DraggedNode | null>(null);

  // Helper to find and remove item from nested structure
  const removeItemFromNode = useCallback(
    (
      node: ContentNode,
      itemId: string,
      pathToNode: string[]
    ): { item: ContentItem | null; updatedNode: ContentNode } | null => {
      // Check if this is the target node
      if (pathToNode.length === 0) {
        const itemIdx = node.items.findIndex((i) => i.id === itemId);
        if (itemIdx !== -1) {
          const newItems = [...node.items];
          const [removed] = newItems.splice(itemIdx, 1);
          return {
            item: removed,
            updatedNode: { ...node, items: newItems },
          };
        }
        return null;
      }

      // Recurse into children
      const [nextNodeId, ...remainingPath] = pathToNode;
      const childIdx = node.children.findIndex((n) => n.id === nextNodeId);
      if (childIdx === -1) return null;

      const result = removeItemFromNode(node.children[childIdx], itemId, remainingPath);
      if (!result) return null;

      const newChildren = [...node.children];
      newChildren[childIdx] = result.updatedNode;
      return {
        item: result.item,
        updatedNode: { ...node, children: newChildren },
      };
    },
    []
  );

  // Helper to add item to nested structure
  const addItemToNode = useCallback(
    (
      node: ContentNode,
      item: ContentItem,
      targetItemId: string,
      pathToNode: string[]
    ): { updatedNode: ContentNode; inserted: boolean } => {
      // Check if this is the target node
      if (pathToNode.length === 0) {
        const targetIdx = node.items.findIndex((i) => i.id === targetItemId);
        const newItems = [...node.items];
        if (targetIdx !== -1) {
          newItems.splice(targetIdx, 0, item);
          return { updatedNode: { ...node, items: newItems }, inserted: true };
        }
        // If target not found, append
        return { updatedNode: { ...node, items: [...newItems, item] }, inserted: true };
      }

      // Recurse into children
      const [nextNodeId, ...remainingPath] = pathToNode;
      const childIdx = node.children.findIndex((n) => n.id === nextNodeId);
      if (childIdx === -1) {
        // Path not found, return unchanged
        return { updatedNode: node, inserted: false };
      }

      const result = addItemToNode(
        node.children[childIdx],
        item,
        targetItemId,
        remainingPath
      );
      if (!result.inserted) {
        return { updatedNode: node, inserted: false };
      }

      const newChildren = [...node.children];
      newChildren[childIdx] = result.updatedNode;
      return { updatedNode: { ...node, children: newChildren }, inserted: true };
    },
    []
  );

  // Group drag handlers
  const handleGroupDragStart = useCallback((e: React.DragEvent, groupId: string) => {
    setDraggedGroup(groupId);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleGroupDragOver = useCallback(
    (e: React.DragEvent, targetGroupId: string) => {
      e.preventDefault();
      if (!draggedGroup || draggedGroup === targetGroupId) return;

      const draggedIdx = content.findIndex((g) => g.id === draggedGroup);
      const targetIdx = content.findIndex((g) => g.id === targetGroupId);

      if (draggedIdx === -1 || targetIdx === -1) return;

      const newContent = [...content];
      const [removed] = newContent.splice(draggedIdx, 1);
      newContent.splice(targetIdx, 0, removed);

      setContent(newContent);
    },
    [content, draggedGroup, setContent]
  );

  const handleGroupDragEnd = useCallback(() => {
    setDraggedGroup(null);
  }, []);

  // Item drag handlers
  const handleItemDragStart = useCallback(
    (e: React.DragEvent, groupId: string, itemId: string, nodePath?: string[]) => {
      setDraggedItem({ groupId, itemId, nodePath });
      e.dataTransfer.effectAllowed = "move";
      e.stopPropagation();
    },
    []
  );

  const handleItemDragOver = useCallback(
    (
      e: React.DragEvent,
      targetGroupId: string,
      targetItemId: string,
      targetNodePath?: string[]
    ) => {
      e.preventDefault();
      e.stopPropagation();

      if (
        !draggedItem ||
        (draggedItem.groupId === targetGroupId &&
          draggedItem.itemId === targetItemId &&
          JSON.stringify(draggedItem.nodePath || []) ===
            JSON.stringify(targetNodePath || []))
      )
        return;

      const newContent = [...content];
      const sourceGroupIdx = newContent.findIndex(
        (g) => g.id === draggedItem.groupId
      );
      const targetGroupIdx = newContent.findIndex((g) => g.id === targetGroupId);

      if (sourceGroupIdx === -1 || targetGroupIdx === -1) return;

      const sourceGroup = newContent[sourceGroupIdx];
      const targetGroup = newContent[targetGroupIdx];

      // Handle root-level items (no nodePath)
      const sourceIsRoot =
        !draggedItem.nodePath || draggedItem.nodePath.length === 0;
      const targetIsRoot = !targetNodePath || targetNodePath.length === 0;

      if (sourceIsRoot && targetIsRoot) {
        // Both are root-level items
        const itemIdx = sourceGroup.items.findIndex(
          (i) => i.id === draggedItem.itemId
        );
        const targetIdx = targetGroup.items.findIndex((i) => i.id === targetItemId);

        if (itemIdx === -1 || targetIdx === -1) return;

        const [removed] = sourceGroup.items.splice(itemIdx, 1);

        if (draggedItem.groupId === targetGroupId) {
          // Same group reorder
          const adjustedTargetIdx =
            itemIdx < targetIdx ? targetIdx - 1 : targetIdx;
          sourceGroup.items.splice(adjustedTargetIdx, 0, removed);
        } else {
          // Different group move
          targetGroup.items.splice(targetIdx, 0, removed);
        }
      } else if (!sourceIsRoot && !targetIsRoot) {
        // Both are nested items - check if same parent node
        const sourceNodeStr = draggedItem.nodePath!.join("/");
        const targetNodeStr = targetNodePath!.join("/");

        if (
          sourceNodeStr === targetNodeStr &&
          draggedItem.groupId === targetGroupId
        ) {
          // Same parent node - reorder within that node
          const updateNodeInTree = (
            nodes: ContentNode[],
            pathToNode: string[],
            updater: (node: ContentNode) => ContentNode
          ): ContentNode[] => {
            if (pathToNode.length === 0) {
              return nodes;
            }

            const [nextId, ...remaining] = pathToNode;
            return nodes.map((node) => {
              if (node.id === nextId) {
                if (remaining.length === 0) {
                  // This is the target node
                  return updater(node);
                }
                // Recurse deeper
                return {
                  ...node,
                  children: updateNodeInTree(node.children, remaining, updater),
                };
              }
              return node;
            });
          };

          // Find the node containing the items
          let targetNode: ContentNode | undefined;
          let searchNodes = targetGroup.children || [];
          for (const nodeId of draggedItem.nodePath!) {
            targetNode = searchNodes.find((n) => n.id === nodeId);
            if (!targetNode) return;
            searchNodes = targetNode.children;
          }

          if (targetNode) {
            const sourceIdx = targetNode.items.findIndex(
              (i) => i.id === draggedItem.itemId
            );
            const targetIdx = targetNode.items.findIndex((i) => i.id === targetItemId);

            if (sourceIdx !== -1 && targetIdx !== -1 && sourceIdx !== targetIdx) {
              const newItems = [...targetNode.items];
              const [removed] = newItems.splice(sourceIdx, 1);
              const adjustedTargetIdx =
                sourceIdx < targetIdx ? targetIdx - 1 : targetIdx;
              newItems.splice(adjustedTargetIdx, 0, removed);

              // Update the node in the tree
              targetGroup.children = updateNodeInTree(
                targetGroup.children || [],
                draggedItem.nodePath!,
                (node) => ({ ...node, items: newItems })
              );
            }
          }
        } else {
          // Different parent nodes or groups - move item
          const removeResult = removeItemFromNode(
            sourceGroup.children![0],
            draggedItem.itemId,
            draggedItem.nodePath!
          );

          if (removeResult) {
            const addResult = addItemToNode(
              targetGroup.children![0],
              removeResult.item!,
              targetItemId,
              targetNodePath!
            );
            if (addResult.inserted) {
              targetGroup.children = [addResult.updatedNode];
            }
          }
        }
      } else {
        // Mixed root and nested - move between levels
        if (sourceIsRoot) {
          // Moving from root to nested
          const itemIdx = sourceGroup.items.findIndex(
            (i) => i.id === draggedItem.itemId
          );
          if (itemIdx === -1) return;

          const [removed] = sourceGroup.items.splice(itemIdx, 1);
          const addResult = addItemToNode(
            targetGroup.children![0],
            removed,
            targetItemId,
            targetNodePath!
          );
          if (addResult.inserted) {
            targetGroup.children = [addResult.updatedNode];
          }
        } else {
          // Moving from nested to root
          const result = removeItemFromNode(
            sourceGroup.children![0],
            draggedItem.itemId,
            draggedItem.nodePath!
          );
          if (result && result.item) {
            const targetIdx = targetGroup.items.findIndex(
              (i) => i.id === targetItemId
            );
            if (targetIdx !== -1) {
              targetGroup.items.splice(targetIdx, 0, result.item);
            } else {
              targetGroup.items.push(result.item);
            }
          }
        }
      }

      setContent(newContent);
    },
    [content, draggedItem, removeItemFromNode, addItemToNode, setContent]
  );

  const handleItemDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  // Node drag handlers
  const handleNodeDragStart = useCallback(
    (groupId: string, nodeId: string, path: string[]) => {
      setDraggedNode({ groupId, nodeId, path });
    },
    []
  );

  const handleNodeDragOver = useCallback(
    (groupId: string, targetNodeId: string, targetPath: string[]) => {
      if (!draggedNode || draggedNode.nodeId === targetNodeId) return;

      // Only allow reordering if nodes are siblings (same parent)
      const draggedParentPath = draggedNode.path.slice(0, -1);
      const targetParentPath = targetPath.slice(0, -1);
      const draggedParentStr = draggedParentPath.join("/");
      const targetParentStr = targetParentPath.join("/");

      if (draggedParentStr !== targetParentStr) return;

      setContent((prev) => {
        return prev.map((g) => {
          if (g.id !== groupId) return g;

          const reorderNodes = (
            nodes: ContentNode[],
            pathToParent: string[]
          ): ContentNode[] => {
            // If pathToParent is empty, we're at the parent level
            if (pathToParent.length === 0) {
              const draggedIdx = nodes.findIndex(
                (n) => n.id === draggedNode.nodeId
              );
              const targetIdx = nodes.findIndex((n) => n.id === targetNodeId);

              if (draggedIdx === -1 || targetIdx === -1) {
                return nodes;
              }

              if (draggedIdx === targetIdx) return nodes;

              const newNodes = [...nodes];
              const [removed] = newNodes.splice(draggedIdx, 1);
              const adjustedTargetIdx =
                draggedIdx < targetIdx ? targetIdx - 1 : targetIdx;
              newNodes.splice(adjustedTargetIdx, 0, removed);

              return newNodes;
            }

            // Navigate deeper
            const [nextNodeId, ...remainingPath] = pathToParent;

            return nodes.map((node) => {
              if (node.id === nextNodeId) {
                return {
                  ...node,
                  children: reorderNodes(node.children, remainingPath),
                };
              }
              return node;
            });
          };

          return {
            ...g,
            children: reorderNodes(g.children || [], draggedParentPath),
          };
        });
      });
    },
    [content, draggedNode, setContent]
  );

  const handleNodeDragEnd = useCallback(() => {
    setDraggedNode(null);
  }, []);

  return {
    draggedGroup,
    draggedItem,
    draggedNode,
    handleGroupDragStart,
    handleGroupDragOver,
    handleGroupDragEnd,
    handleItemDragStart,
    handleItemDragOver,
    handleItemDragEnd,
    handleNodeDragStart,
    handleNodeDragOver,
    handleNodeDragEnd,
  };
}

