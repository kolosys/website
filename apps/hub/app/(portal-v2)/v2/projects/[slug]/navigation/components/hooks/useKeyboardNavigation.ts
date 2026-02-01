import { useEffect, useState } from "react";

type NavNode = {
  id: string;
  parentId: string | null;
  sortOrder: number;
};

type KeyboardNavigationOptions = {
  nodes: NavNode[];
  onAddNode: () => void;
  onEditNode: (nodeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onDuplicateNode?: (nodeId: string) => void;
};

export function useKeyboardNavigation({
  nodes,
  onAddNode,
  onEditNode,
  onDeleteNode,
  onDuplicateNode,
}: KeyboardNavigationOptions) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl && e.key === "n") {
        e.preventDefault();
        onAddNode();
        return;
      }

      if (cmdOrCtrl && e.key === "d" && selectedNodeId) {
        e.preventDefault();
        if (onDuplicateNode) {
          onDuplicateNode(selectedNodeId);
        }
        return;
      }

      if (!selectedNodeId) return;

      if (e.key === "Enter") {
        e.preventDefault();
        onEditNode(selectedNodeId);
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        onDeleteNode(selectedNodeId);
        return;
      }

      const flatNodes = nodes.sort((a, b) => a.sortOrder - b.sortOrder);
      const currentIndex = flatNodes.findIndex((n) => n.id === selectedNodeId);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % flatNodes.length;
        setSelectedNodeId(flatNodes[nextIndex].id);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + flatNodes.length) % flatNodes.length;
        setSelectedNodeId(flatNodes[prevIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodes, selectedNodeId, onAddNode, onEditNode, onDeleteNode, onDuplicateNode]);

  return {
    selectedNodeId,
    setSelectedNodeId,
  };
}
