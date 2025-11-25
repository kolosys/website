"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faGripVertical,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { useModalActions } from "@kolosys-sites/theme/modal";
import type { ContentGroup, ContentNode, ContentItem } from "@/lib/content/types";
import ContentItemSettingsModal from "./ContentItemSettingsModal";
import GroupSettingsModal from "./GroupSettingsModal";

type ContentGroupWithExpanded = ContentGroup & {
  expanded: boolean;
};

type ContentNodeWithExpanded = ContentNode & {
  expanded: boolean;
};

type ContentTableProps = {
  content: ContentGroup[];
  repositoryId: string;
  onSave?: () => void;
  onChangesChange?: (hasChanges: boolean) => void;
  onSaveHandlerReady?: (handler: () => Promise<void>) => void;
};

export default function ContentTable({
  content: initialContent,
  repositoryId,
  onSave,
  onChangesChange,
  onSaveHandlerReady,
}: ContentTableProps) {
  const { openModal, closeModal } = useModalActions();
  const [content, setContent] = useState<ContentGroupWithExpanded[]>(
    initialContent.map((group) => ({ ...group, expanded: false }))
  );
  const [draggedGroup, setDraggedGroup] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<{
    groupId: string;
    itemId: string;
    nodePath?: string[]; // Path to the node containing this item (empty for root-level items)
  } | null>(null);
  const [draggedNode, setDraggedNode] = useState<{
    groupId: string;
    nodeId: string;
    path: string[]; // Path to identify the node in the tree
  } | null>(null);
  const [saving, setSaving] = useState(false);

  // Helper to collect all items from nested structure
  const collectAllItems = (group: ContentGroupWithExpanded): ContentItem[] => {
    const items: ContentItem[] = [...group.items];
    if (group.children) {
      const collectFromNode = (node: ContentNode): ContentItem[] => {
        const nodeItems: ContentItem[] = [...node.items];
        node.children.forEach((child) => {
          nodeItems.push(...collectFromNode(child));
        });
        return nodeItems;
      };
      group.children.forEach((node) => {
        items.push(...collectFromNode(node));
      });
    }
    return items;
  };

  const [originalOrder, setOriginalOrder] = useState(() => {
    return {
      groups: initialContent.map((g) => g.id),
      items: initialContent.reduce(
        (acc, group) => {
          acc[group.id] = collectAllItems(group as ContentGroupWithExpanded).map((item) => item.id);
          return acc;
        },
        {} as Record<string, string[]>
      ),
    };
  });

  // Update original order when initialContent changes (after save/reload)
  useEffect(() => {
    setOriginalOrder({
      groups: initialContent.map((g) => g.id),
      items: initialContent.reduce(
        (acc, group) => {
          acc[group.id] = collectAllItems(group as ContentGroupWithExpanded).map((item) => item.id);
          return acc;
        },
        {} as Record<string, string[]>
      ),
    });
    // Also update content state to match new initialContent
    setContent(
      initialContent.map((group) => ({ ...group, expanded: false }))
    );
  }, [initialContent]);

  // Helper to collect all node IDs in order (for comparison)
  const collectAllNodeIds = (group: ContentGroupWithExpanded): string[] => {
    const nodeIds: string[] = [];
    if (group.children) {
      const collectFromNode = (node: ContentNode): void => {
        nodeIds.push(node.id);
        node.children.forEach((child) => {
          collectFromNode(child);
        });
      };
      group.children.forEach((node) => {
        collectFromNode(node);
      });
    }
    return nodeIds;
  };

  // Check if content has changed
  const hasChanges = useMemo(() => {
    const currentGroupOrder = content.map((g) => g.id);
    if (
      JSON.stringify(currentGroupOrder) !==
      JSON.stringify(originalOrder.groups)
    ) {
      return true;
    }

    for (const group of content) {
      const currentItems = collectAllItems(group);
      const currentItemOrder = currentItems.map((item) => item.id);
      const originalItemOrder = originalOrder.items[group.id] || [];

      // Compare item order
      if (
        JSON.stringify(currentItemOrder) !==
        JSON.stringify(originalItemOrder)
      ) {
        return true;
      }
    }

    return false;
  }, [content, originalOrder]);

  // Notify parent of changes state
  useEffect(() => {
    if (onChangesChange) {
      onChangesChange(hasChanges);
    }
  }, [hasChanges, onChangesChange]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      // Calculate new order indices
      const groupOrder: Record<string, number> = {};
      const itemOrders: Record<string, Record<string, number[]>> = {}; // Changed to array to support nested orderIndex

      content.forEach((group, groupIndex) => {
        groupOrder[group.id] = groupIndex;

        itemOrders[group.id] = {};

        // Process root-level items
        group.items.forEach((item, itemIndex) => {
          // Build orderIndex: [groupOrder, itemOrder]
          itemOrders[group.id][item.id] = [groupIndex, itemIndex];
        });

        // Process nested nodes recursively
        if (group.children) {
          const processNode = (node: ContentNode, pathOrderIndex: number[]) => {
            // Process items at this node level
            // The pathOrderIndex represents the orderIndex path to this node
            // For items, we append the item's index within this node
            node.items.forEach((item, itemIndex) => {
              itemOrders[group.id][item.id] = [...pathOrderIndex, itemIndex];
            });

            // Process child nodes
            // Each child node's orderIndex is: [...pathOrderIndex, childIndex]
            node.children.forEach((childNode, childIndex) => {
              const childPathOrderIndex = [...pathOrderIndex, childIndex];
              processNode(childNode, childPathOrderIndex);
            });
          };

          // Process each top-level child node
          group.children.forEach((node, nodeIndex) => {
            const nodePathOrderIndex = [groupIndex, nodeIndex];
            processNode(node, nodePathOrderIndex);
          });
        }
      });

      const { updateContentOrder } = await import("@/app/actions/content");
      const result = await updateContentOrder(
        repositoryId,
        groupOrder,
        itemOrders
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to save order");
      }

      // Update original order to match current state
      setOriginalOrder({
        groups: content.map((g) => g.id),
        items: content.reduce(
          (acc, group) => {
            acc[group.id] = collectAllItems(group).map((item) => item.id);
            return acc;
          },
          {} as Record<string, string[]>
        ),
      });

      // Reload content from server
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save order. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [content, repositoryId, onSave]);

  // Expose save handler to parent
  useEffect(() => {
    if (onSaveHandlerReady) {
      onSaveHandlerReady(handleSave);
    }
  }, [onSaveHandlerReady, handleSave]);

  const toggleExpand = (groupId: string) => {
    setContent((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, expanded: !group.expanded } : group
      )
    );
  };

  // Group drag handlers
  const handleGroupDragStart = (e: React.DragEvent, groupId: string) => {
    setDraggedGroup(groupId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleGroupDragOver = (
    e: React.DragEvent,
    targetGroupId: string
  ) => {
    e.preventDefault();
    if (!draggedGroup || draggedGroup === targetGroupId) return;

    const draggedIdx = content.findIndex((g) => g.id === draggedGroup);
    const targetIdx = content.findIndex((g) => g.id === targetGroupId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const newContent = [...content];
    const [removed] = newContent.splice(draggedIdx, 1);
    newContent.splice(targetIdx, 0, removed);

    setContent(newContent);
  };

  const handleGroupDragEnd = () => {
    setDraggedGroup(null);
  };

  // Helper to find and remove item from nested structure
  const removeItemFromNode = (
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
  };

  // Helper to add item to nested structure
  const addItemToNode = (
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
  };

  // Item drag handlers
  const handleItemDragStart = (
    e: React.DragEvent,
    groupId: string,
    itemId: string,
    nodePath?: string[]
  ) => {
    setDraggedItem({ groupId, itemId, nodePath });
    e.dataTransfer.effectAllowed = "move";
    e.stopPropagation();
  };

  const handleItemDragOver = (
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
        JSON.stringify(draggedItem.nodePath || []) === JSON.stringify(targetNodePath || []))
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
    const sourceIsRoot = !draggedItem.nodePath || draggedItem.nodePath.length === 0;
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
        const adjustedTargetIdx = itemIdx < targetIdx ? targetIdx - 1 : targetIdx;
        sourceGroup.items.splice(adjustedTargetIdx, 0, removed);
      } else {
        // Different group move
        targetGroup.items.splice(targetIdx, 0, removed);
      }
    } else if (!sourceIsRoot && !targetIsRoot) {
      // Both are nested items - check if same parent node (items are in the same node)
      const sourceNodeStr = draggedItem.nodePath!.join('/');
      const targetNodeStr = targetNodePath!.join('/');

      if (
        sourceNodeStr === targetNodeStr &&
        draggedItem.groupId === targetGroupId
      ) {
        // Same parent node - reorder within that node
        // The nodePath points to the node containing the items
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

        // Find the node containing the items (use full nodePath, not parentPath)
        let targetNode: ContentNode | undefined;
        let searchNodes = targetGroup.children || [];
        for (const nodeId of draggedItem.nodePath!) {
          targetNode = searchNodes.find((n) => n.id === nodeId);
          if (!targetNode) return;
          searchNodes = targetNode.children;
        }

        if (targetNode) {
          const sourceIdx = targetNode.items.findIndex((i) => i.id === draggedItem.itemId);
          const targetIdx = targetNode.items.findIndex((i) => i.id === targetItemId);

          if (sourceIdx !== -1 && targetIdx !== -1 && sourceIdx !== targetIdx) {
            const newItems = [...targetNode.items];
            const [removed] = newItems.splice(sourceIdx, 1);
            const adjustedTargetIdx = sourceIdx < targetIdx ? targetIdx - 1 : targetIdx;
            newItems.splice(adjustedTargetIdx, 0, removed);

            // Update the node in the tree using the full nodePath
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
          const targetIdx = targetGroup.items.findIndex((i) => i.id === targetItemId);
          if (targetIdx !== -1) {
            targetGroup.items.splice(targetIdx, 0, result.item);
          } else {
            targetGroup.items.push(result.item);
          }
        }
      }
    }

    setContent(newContent);
  };

  const handleItemDragEnd = () => {
    setDraggedItem(null);
  };

  const handleItemSettings = async (itemId: string) => {
    try {
      // import full item details
      const { getContentItem } = await import("@/app/actions/content");
      const result = await getContentItem(itemId);

      if (!result.success || !result.item) {
        throw new Error(result.error || "Failed to import item details");
      }

      // Open settings modal
      const modalId = openModal({
        title: "Content Item Settings",
        size: "lg",
        content: (
          <ContentItemSettingsModal
            item={result.item}
            repositoryId={repositoryId}
            onSave={() => {
              if (onSave) onSave();
            }}
            onClose={() => closeModal(modalId)}
          />
        ),
      });
    } catch (error) {
      console.error("Error opening item settings:", error);
    }
  };

  const handleGroupSettings = async (groupSlug: string) => {
    try {
      // import group index details
      const { getContentGroup } = await import("@/app/actions/content");
      const result = await getContentGroup(groupSlug, repositoryId);

      if (!result.success || !result.group) {
        throw new Error(result.error || "Failed to import group index details");
      }

      // Open settings modal
      const modalId = openModal({
        title: "Group Settings",
        size: "lg",
        content: (
          <GroupSettingsModal
            group={result.group}
            repositoryId={repositoryId}
            onSave={() => {
              if (onSave) onSave();
            }}
            onClose={() => closeModal(modalId)}
          />
        ),
      });
    } catch (error) {
      console.error("Error opening group settings:", error);
      alert("Failed to load group settings. The group index may not exist yet.");
    }
  };

  return (
    <div className="space-y-4">

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </div>
          {/* <div className="w-40 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Group
          </div>
          <div className="w-32 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Source
          </div>
          <div className="w-20 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Items
          </div> */}
          {/* <div className="w-16 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
            Settings
          </div> */}
        </div>

        {/* Table Body */}
        <div>
          {content.map((group) => (
            <div key={group.id}>
              {/* Group Row */}
              <div
                draggable
                onDragStart={(e) => handleGroupDragStart(e, group.id)}
                onDragOver={(e) => handleGroupDragOver(e, group.id)}
                onDragEnd={handleGroupDragEnd}
                className={`flex items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-move ${draggedGroup === group.id ? "opacity-50" : ""
                  }`}
              >
                <div className="flex-1 flex items-center space-x-3">
                  {/* Drag Handle */}
                  <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0">
                    <FontAwesomeIcon icon={faGripVertical} className="w-4 h-4" />
                  </button>

                  {/* Expand/Collapse */}
                  <button
                    onClick={() => toggleExpand(group.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                  >
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`w-4 h-4 transition-transform ${!group.expanded ? "-rotate-90" : ""
                        }`}
                    />
                  </button>

                  {/* Emoji and Name */}
                  <span className="text-2xl shrink-0">
                    {group.emoji || "📄"}
                  </span>
                  <span className="font-medium text-gray-900">{group.name}</span>
                </div>
                {/* 
                <div className="w-40 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    {group.group}
                  </span>
                </div>

                <div className="w-32 flex items-center">
                  <span className="text-sm text-blue-600 font-medium">
                    {group.source}
                  </span>
                </div>

                <div className="w-20 flex items-center">
                  <span className="text-sm text-gray-900 font-medium">
                    {group.items.length}
                  </span>
                </div> */}

                <div className="w-16 flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGroupSettings(group.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    title="Group Settings"
                  >
                    <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Nested Items */}
              {group.expanded && (
                <div className="bg-gray-50">
                  {/* Render root-level items */}
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) =>
                        handleItemDragStart(e, group.id, item.id)
                      }
                      onDragOver={(e) =>
                        handleItemDragOver(e, group.id, item.id)
                      }
                      onDragEnd={handleItemDragEnd}
                      className={`flex items-center px-6 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors cursor-move ${draggedItem?.itemId === item.id ? "opacity-50" : ""
                        }`}
                    >
                      <div className="flex-1 flex items-center space-x-3 pl-12">
                        {/* Drag Handle */}
                        <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0">
                          <FontAwesomeIcon
                            icon={faGripVertical}
                            className="w-3 h-3"
                          />
                        </button>

                        {/* Emoji and Name */}
                        <span className="text-xl shrink-0">
                          {item.emoji || "📄"}
                        </span>
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>

                      {/* <div className="w-40 flex items-center"></div>

                      <div className="w-32 flex items-center">
                        <span className="text-xs text-blue-600">
                          {item.source}
                        </span>
                      </div> */}

                      {/* <div className="w-20 flex items-center justify-end">
                        {/ * Empty - items don't have item count * /}
                      </div> */}

                      <div className="w-16 flex items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemSettings(item.id);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                          title="Settings"
                        >
                          <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Render nested nodes */}
                  {group.children && group.children.map((node) => (
                    <NestedNode
                      key={node.id}
                      node={node}
                      groupId={group.id}
                      level={1}
                      parentPath={[]}
                      draggedItem={draggedItem}
                      draggedNode={draggedNode}
                      onItemDragStart={handleItemDragStart}
                      onItemDragOver={handleItemDragOver}
                      onItemDragEnd={handleItemDragEnd}
                      onItemSettings={handleItemSettings}
                      onNodeDragStart={(groupId, nodeId, path) => {
                        setDraggedNode({ groupId, nodeId, path });
                      }}
                      onNodeDragOver={(groupId, targetNodeId, targetPath) => {
                        if (!draggedNode || draggedNode.nodeId === targetNodeId) return;

                        // Only allow reordering if nodes are siblings (same parent)
                        const draggedParentPath = draggedNode.path.slice(0, -1);
                        const targetParentPath = targetPath.slice(0, -1);
                        const draggedParentStr = draggedParentPath.join('/');
                        const targetParentStr = targetParentPath.join('/');

                        if (draggedParentStr !== targetParentStr) return;

                        setContent((prev) => {
                          return prev.map((g) => {
                            if (g.id !== groupId) return g;

                            const reorderNodes = (
                              nodes: ContentNode[],
                              pathToParent: string[]
                            ): ContentNode[] => {
                              // If pathToParent is empty, we're at the parent level (reordering root-level nodes)
                              if (pathToParent.length === 0) {
                                // We're at the parent level - reorder siblings
                                const draggedIdx = nodes.findIndex((n) => n.id === draggedNode.nodeId);
                                const targetIdx = nodes.findIndex((n) => n.id === targetNodeId);

                                if (draggedIdx === -1 || targetIdx === -1) {
                                  // Nodes not found at this level, return unchanged
                                  return nodes;
                                }

                                // Don't reorder if already in the same position
                                if (draggedIdx === targetIdx) return nodes;

                                const newNodes = [...nodes];
                                const [removed] = newNodes.splice(draggedIdx, 1);

                                // Adjust target index if dragging forward (we removed an element before target)
                                const adjustedTargetIdx = draggedIdx < targetIdx ? targetIdx - 1 : targetIdx;
                                newNodes.splice(adjustedTargetIdx, 0, removed);

                                return newNodes;
                              }

                              // We need to navigate deeper - find the first node in the path
                              const [nextNodeId, ...remainingPath] = pathToParent;

                              return nodes.map((node) => {
                                if (node.id === nextNodeId) {
                                  // This is the node we need to recurse into
                                  return {
                                    ...node,
                                    children: reorderNodes(node.children, remainingPath),
                                  };
                                }
                                // Not on the path, return unchanged
                                return node;
                              });
                            };

                            return {
                              ...g,
                              children: reorderNodes(g.children || [], draggedParentPath),
                            };
                          });
                        });
                      }}
                      onNodeDragEnd={() => {
                        setDraggedNode(null);
                      }}
                      onNodeToggle={(nodeId) => {
                        // Handle node expansion/collapse
                        setContent((prev) =>
                          prev.map((g) => {
                            if (g.id === group.id) {
                              const updateNode = (n: ContentNode): ContentNodeWithExpanded => {
                                if (n.id === nodeId) {
                                  return { ...n, expanded: !((n as any).expanded ?? false) };
                                }
                                return {
                                  ...n,
                                  expanded: (n as any).expanded ?? false,
                                  children: n.children.map(updateNode),
                                } as ContentNodeWithExpanded;
                              };
                              return {
                                ...g,
                                children: g.children?.map(updateNode),
                              };
                            }
                            return g;
                          })
                        );
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component to render nested nodes recursively
function NestedNode({
  node,
  groupId,
  level,
  parentPath,
  draggedItem,
  draggedNode,
  onItemDragStart,
  onItemDragOver,
  onItemDragEnd,
  onItemSettings,
  onNodeDragStart,
  onNodeDragOver,
  onNodeDragEnd,
  onNodeToggle,
}: {
  node: ContentNode;
  groupId: string;
  level: number;
  parentPath: string[];
  draggedItem: { groupId: string; itemId: string; nodePath?: string[] } | null;
  draggedNode: { groupId: string; nodeId: string; path: string[] } | null;
  onItemDragStart: (e: React.DragEvent, groupId: string, itemId: string, nodePath?: string[]) => void;
  onItemDragOver: (e: React.DragEvent, groupId: string, itemId: string, nodePath?: string[]) => void;
  onItemDragEnd: () => void;
  onItemSettings?: (itemId: string) => void;
  onNodeDragStart: (groupId: string, nodeId: string, path: string[]) => void;
  onNodeDragOver: (groupId: string, targetNodeId: string, targetPath: string[]) => void;
  onNodeDragEnd: () => void;
  onNodeToggle: (nodeId: string) => void;
}) {
  const expanded = (node as any).expanded ?? false;
  const indent = level * 12; // 12px per level
  const nodePath = [...parentPath, node.id];
  const isDragged = draggedNode?.nodeId === node.id;

  return (
    <>
      {/* Node header (subdirectory) */}
      <div
        draggable
        onDragStart={(e) => {
          onNodeDragStart(groupId, node.id, nodePath);
          e.dataTransfer.effectAllowed = "move";
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!draggedNode || draggedNode.nodeId === node.id) return;
          onNodeDragOver(groupId, node.id, nodePath);
        }}
        onDragEnd={onNodeDragEnd}
        className={`flex items-center px-6 py-3 border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-move ${isDragged ? "opacity-50" : ""
          }`}
        style={{ paddingLeft: `${24 + indent}px` }}
      >
        <div className="flex-1 flex items-center space-x-3">
          {/* Drag Handle */}
          <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0">
            <FontAwesomeIcon icon={faGripVertical} className="w-3 h-3" />
          </button>

          {/* Expand/Collapse */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNodeToggle(node.id);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-3 h-3 transition-transform ${!expanded ? "-rotate-90" : ""
                }`}
            />
          </button>

          {/* Folder icon and Name */}
          <span className="text-lg shrink-0">📁</span>
          <span className="text-sm font-medium text-gray-800">{node.name}</span>
        </div>

        <div className="w-40 flex items-center"></div>

        <div className="w-32 flex items-center">
          {/* Empty - nodes don't have source */}
        </div>

        <div className="w-20 flex items-center justify-end">
          <span className="text-xs text-gray-500">
            {node.items.length + node.children.length}
          </span>
        </div>

        <div className="w-16 flex items-center justify-center"></div>
      </div>

      {/* Node children (files and subdirectories) */}
      {expanded && (
        <div className="bg-gray-50">
          {/* Files at this level */}
          {node.items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => onItemDragStart(e, groupId, item.id, nodePath)}
              onDragOver={(e) => onItemDragOver(e, groupId, item.id, nodePath)}
              onDragEnd={onItemDragEnd}
              className={`flex items-center px-6 py-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors cursor-move ${draggedItem?.itemId === item.id ? "opacity-50" : ""
                }`}
              style={{ paddingLeft: `${36 + indent}px` }}
            >
              <div className="flex-1 flex items-center space-x-3">
                {/* Drag Handle */}
                <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0">
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    className="w-3 h-3"
                  />
                </button>

                {/* Emoji and Name */}
                <span className="text-lg shrink-0">
                  {item.emoji || "📄"}
                </span>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>

              <div className="w-40 flex items-center"></div>

              <div className="w-32 flex items-center">
                <span className="text-xs text-blue-600">
                  {item.source}
                </span>
              </div>

              <div className="w-20 flex items-center justify-end">
                {/* Empty - items don't have item count */}
              </div>

              <div className="w-16 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemSettings?.(item.id);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  title="Settings"
                >
                  <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Nested subdirectories */}
          {node.children.map((childNode) => (
            <NestedNode
              key={childNode.id}
              node={childNode}
              groupId={groupId}
              level={level + 1}
              parentPath={nodePath}
              draggedItem={draggedItem}
              draggedNode={draggedNode}
              onItemDragStart={onItemDragStart}
              onItemDragOver={onItemDragOver}
              onItemDragEnd={onItemDragEnd}
              onItemSettings={onItemSettings}
              onNodeDragStart={onNodeDragStart}
              onNodeDragOver={onNodeDragOver}
              onNodeDragEnd={onNodeDragEnd}
              onNodeToggle={onNodeToggle}
            />
          ))}
        </div>
      )}
    </>
  );
}

