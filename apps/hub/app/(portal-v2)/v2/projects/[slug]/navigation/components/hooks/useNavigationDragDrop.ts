import { useState } from "react";
import { useRouter } from "next/navigation";
import { reorderNavNode, moveNavNode } from "@/app/actions/navigation";

type NavNode = {
  id: string;
  parentId: string | null;
  sortOrder: number;
};

type DropPosition = "before" | "after" | "inside";

export function useNavigationDragDrop(projectId: string) {
  const router = useRouter();
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dropTargetNodeId, setDropTargetNodeId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition | null>(null);

  const onDragStart = (nodeId: string) => {
    setDraggedNodeId(nodeId);
  };

  const onDragOver = (e: React.DragEvent, nodeId: string, hasChildren: boolean) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const height = rect.height;

    const thresholdTop = height * 0.25;
    const thresholdBottom = height * 0.75;

    let position: DropPosition;

    if (mouseY < thresholdTop) {
      position = "before";
    } else if (mouseY > thresholdBottom) {
      position = "after";
    } else if (hasChildren) {
      position = "inside";
    } else {
      position = mouseY < height / 2 ? "before" : "after";
    }

    setDropTargetNodeId(nodeId);
    setDropPosition(position);
  };

  const onDragLeave = () => {
    setDropTargetNodeId(null);
    setDropPosition(null);
  };

  const onDrop = async (
    e: React.DragEvent,
    targetNode: NavNode,
    allNodes: NavNode[]
  ) => {
    e.preventDefault();
    setDropTargetNodeId(null);
    setDropPosition(null);

    if (!draggedNodeId || draggedNodeId === targetNode.id) {
      setDraggedNodeId(null);
      return;
    }

    const draggedNode = allNodes.find((n) => n.id === draggedNodeId);
    if (!draggedNode) {
      setDraggedNodeId(null);
      return;
    }

    if (draggedNode.parentId === targetNode.parentId) {
      const siblings = allNodes
        .filter((n) => n.parentId === targetNode.parentId)
        .sort((a, b) => a.sortOrder - b.sortOrder);

      const targetIndex = siblings.findIndex((n) => n.id === targetNode.id);

      await reorderNavNode(projectId, draggedNodeId, targetIndex);
    } else {
      const newSiblings = allNodes.filter(
        (n) => n.parentId === targetNode.parentId
      );
      const newSortOrder = newSiblings.length;

      await moveNavNode(
        projectId,
        draggedNodeId,
        targetNode.parentId,
        newSortOrder
      );
    }

    setDraggedNodeId(null);
    router.refresh();
  };

  const onDragEnd = () => {
    setDraggedNodeId(null);
    setDropTargetNodeId(null);
    setDropPosition(null);
  };

  return {
    draggedNodeId,
    dropTargetNodeId,
    dropPosition,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
  };
}
