"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Icon } from "@kolosys-sites/theme";
import { AddNodeButton } from "./AddNodeModal";
import { NavigationTreeNode } from "./NavigationTreeNode";
import { NodeSettings } from "./NodeSettings";
import { PendingChanges } from "./PendingChanges";
import { useNavigationDragDrop } from "./hooks/useNavigationDragDrop";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { reorderNavNode, moveNavNode, updateNavNode, deleteNavNode } from "@/app/actions/navigation";

type NavNode = {
  id: string;
  projectId: string;
  parentId: string | null;
  slugPattern: string[];
  sortOrder: number;
  type: "page" | "group" | "link";
  customTitle: string | null;
  customEmoji: string | null;
  customIcon: string | null;
  externalUrl: string | null;
  hidden: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type NavigationTreeProps = {
  projectId: string;
  initialData: NavNode[];
};

export function NavigationTree({ projectId, initialData }: NavigationTreeProps) {
  const router = useRouter();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [localNodes, setLocalNodes] = useState<NavNode[]>(initialData);
  const [nodeUpdates, setNodeUpdates] = useState<Map<string, Partial<NavNode>>>(new Map());
  const [pendingChanges, setPendingChanges] = useState<Array<{
    type: "reorder" | "move";
    nodeId: string;
    targetIndex?: number;
    newParentId?: string | null;
    newSortOrder?: number;
  }>>([]);
  const [isSaving, setIsSaving] = useState(false);

  const {
    draggedNodeId,
    dropTargetNodeId,
    dropPosition,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDragEnd,
  } = useNavigationDragDrop(projectId);

  const { selectedNodeId: keyboardSelectedNodeId, setSelectedNodeId: setKeyboardSelectedNodeId } = useKeyboardNavigation({
    nodes: localNodes,
    onAddNode: () => { },
    onEditNode: (nodeId) => setSelectedNodeId(nodeId),
    onDeleteNode: (nodeId) => handleDeleteNode(nodeId),
  });

  const handleNodeChange = (nodeId: string, updates: Partial<NavNode>) => {
    const existingUpdates = nodeUpdates.get(nodeId) || {};
    const newUpdates = new Map(nodeUpdates);
    newUpdates.set(nodeId, { ...existingUpdates, ...updates });
    setNodeUpdates(newUpdates);

    setLocalNodes(localNodes.map(node =>
      node.id === nodeId ? { ...node, ...updates } : node
    ));
  };

  const handleDeleteNode = async (nodeId: string) => {
    const node = localNodes.find((n) => n.id === nodeId);
    if (!node) return;

    const children = localNodes.filter((n) => n.parentId === nodeId);
    if (children.length > 0) {
      alert("Cannot delete node with children. Delete children first.");
      return;
    }

    const displayTitle = node.customTitle || node.slugPattern[node.slugPattern.length - 1] || "Untitled";
    if (!confirm(`Delete "${displayTitle}"?`)) {
      return;
    }

    const result = await deleteNavNode(projectId, nodeId);
    if (result.success) {
      setLocalNodes(localNodes.filter(n => n.id !== nodeId));
      if (selectedNodeId === nodeId) {
        setSelectedNodeId(null);
      }
      router.refresh();
    } else {
      alert(result.error || "Failed to delete node");
    }
  };

  const getAllDescendants = (nodeId: string, nodes: NavNode[]): string[] => {
    const descendants: string[] = [];
    const children = nodes.filter(n => n.parentId === nodeId);

    for (const child of children) {
      descendants.push(child.id);
      descendants.push(...getAllDescendants(child.id, nodes));
    }

    return descendants;
  };

  const handleDrop = (
    e: React.DragEvent,
    targetNode: NavNode,
    allNodes: NavNode[]
  ) => {
    e.preventDefault();

    if (!draggedNodeId || !dropPosition) {
      onDragEnd();
      return;
    }

    if (draggedNodeId === targetNode.id) {
      onDragEnd();
      return;
    }

    const draggedNode = allNodes.find((n) => n.id === draggedNodeId);
    if (!draggedNode) {
      onDragEnd();
      return;
    }

    const updatedNodes = [...localNodes];
    let newParentId: string | null;
    let targetIndex: number;

    if (dropPosition === "inside") {
      newParentId = targetNode.id;
      const childrenInTarget = allNodes.filter((n) => n.parentId === targetNode.id);
      targetIndex = childrenInTarget.length;
    } else {
      newParentId = targetNode.parentId;
      const siblings = allNodes
        .filter((n) => n.parentId === targetNode.parentId)
        .sort((a, b) => a.sortOrder - b.sortOrder);

      const targetNodeIndex = siblings.findIndex((n) => n.id === targetNode.id);
      targetIndex = dropPosition === "before" ? targetNodeIndex : targetNodeIndex + 1;

      if (draggedNode.parentId === newParentId) {
        const draggedIndex = siblings.findIndex((n) => n.id === draggedNodeId);
        if (draggedIndex < targetIndex) {
          targetIndex--;
        }
      }
    }

    if (newParentId === draggedNodeId) {
      console.warn("Cannot drop node into itself");
      onDragEnd();
      return;
    }

    if (newParentId !== null) {
      const descendants = getAllDescendants(draggedNodeId, allNodes);
      if (descendants.includes(newParentId)) {
        console.warn("Cannot drop node into its own descendant");
        onDragEnd();
        return;
      }
    }

    const siblingsInNewParent = updatedNodes
      .filter((n) => n.parentId === newParentId && n.id !== draggedNodeId)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    siblingsInNewParent.splice(targetIndex, 0, draggedNode);

    siblingsInNewParent.forEach((node, index) => {
      const nodeInArray = updatedNodes.find((n) => n.id === node.id);
      if (nodeInArray) {
        nodeInArray.sortOrder = index;
        if (node.id === draggedNodeId) {
          nodeInArray.parentId = newParentId;
        }
      }
    });

    setLocalNodes(updatedNodes);

    if (draggedNode.parentId === newParentId) {
      setPendingChanges([...pendingChanges, {
        type: "reorder",
        nodeId: draggedNodeId,
        targetIndex,
      }]);
    } else {
      setPendingChanges([...pendingChanges, {
        type: "move",
        nodeId: draggedNodeId,
        newParentId,
        newSortOrder: targetIndex,
      }]);
    }

    onDragEnd();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const [nodeId, updates] of nodeUpdates) {
        await updateNavNode(projectId, nodeId, {
          customTitle: updates.customTitle ?? null,
          customEmoji: updates.customEmoji ?? null,
          externalUrl: updates.externalUrl ?? null,
          hidden: updates.hidden ?? false,
        });
      }

      for (const change of pendingChanges) {
        if (change.type === "reorder" && change.targetIndex !== undefined) {
          await reorderNavNode(projectId, change.nodeId, change.targetIndex);
        } else if (change.type === "move" && change.newSortOrder !== undefined) {
          await moveNavNode(
            projectId,
            change.nodeId,
            change.newParentId ?? null,
            change.newSortOrder
          );
        }
      }

      setNodeUpdates(new Map());
      setPendingChanges([]);
      router.refresh();
    } catch (error) {
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setLocalNodes(initialData);
    setNodeUpdates(new Map());
    setPendingChanges([]);
  };

  const hasPendingChanges = pendingChanges.length > 0 || nodeUpdates.size > 0;
  const selectedNode = selectedNodeId ? localNodes.find(n => n.id === selectedNodeId) ?? null : null;
  const selectedNodeChildren = selectedNodeId ? localNodes.filter(n => n.parentId === selectedNodeId) : [];

  const rootNodes = localNodes
    .filter((node) => node.parentId === null)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (localNodes.length === 0) {
    return (
      <>
        <Card className="p-12 text-center">
          <div className="text-foreground-muted mb-4">
            <p className="text-sm">No navigation structure defined yet.</p>
            <p className="text-xs mt-2">
              Create your first navigation node to get started.
            </p>
          </div>
          <AddNodeButton projectId={projectId} />
        </Card>
        <NodeSettings
          node={null}
          onChange={handleNodeChange}
          onDelete={handleDeleteNode}
          hasChildren={false}
          onSave={handleSave}
          onDiscard={handleDiscard}
          hasPendingChanges={hasPendingChanges}
          isSaving={isSaving}
        />
      </>
    );
  }

  return (
    <Card className="flex flex-row w-full h-fit border border-foreground">
      <div className="flex flex-col overflow-y-auto border-r border-foreground min-w-100">
        <div className="flex items-center justify-between px-3 py-2">
          <h3 className="text-sm font-semibold">Structure tree</h3>
          <AddNodeButton projectId={projectId} />
        </div>
        <div className="space-y-0.5 px-3 pb-2">
          {rootNodes.map((node) => {
            const children = localNodes
              .filter((n) => n.parentId === node.id)
              .sort((a, b) => a.sortOrder - b.sortOrder);

            return (
              <NavigationTreeNode
                key={node.id}
                node={node}
                children={children}
                allNodes={localNodes}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={handleDrop}
                onDragEnd={onDragEnd}
                isDragging={draggedNodeId === node.id}
                isDropTarget={dropTargetNodeId === node.id}
                dropPosition={dropTargetNodeId === node.id ? dropPosition : null}
                isSelected={selectedNodeId === node.id}
                setSelectedNodeId={setSelectedNodeId}
                selectedNodeId={selectedNodeId}
                draggedNodeId={draggedNodeId}
                dropTargetNodeId={dropTargetNodeId}
                dropPositionGlobal={dropPosition}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col flex-1 shrink-0">
        <NodeSettings
          node={selectedNode}
          onChange={handleNodeChange}
          onDelete={handleDeleteNode}
          hasChildren={selectedNodeChildren.length > 0}
          onSave={handleSave}
          onDiscard={handleDiscard}
          hasPendingChanges={hasPendingChanges}
          isSaving={isSaving}
        />
      </div>
    </Card>
  );
}
