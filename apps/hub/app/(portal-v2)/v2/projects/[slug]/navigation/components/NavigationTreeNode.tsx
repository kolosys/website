"use client";

import { useState } from "react";
import { Badge, cn, Icon } from "@kolosys-sites/theme";

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

type DropPosition = "before" | "after" | "inside";

type NavigationTreeNodeProps = {
  node: NavNode;
  children: NavNode[];
  allNodes: NavNode[];
  level?: number;
  onDragStart: (nodeId: string) => void;
  onDragOver: (e: React.DragEvent, nodeId: string, hasChildren: boolean) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, node: NavNode, allNodes: NavNode[]) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isDropTarget: boolean;
  dropPosition: DropPosition | null;
  isSelected?: boolean;
  setSelectedNodeId?: (nodeId: string) => void;
  selectedNodeId?: string | null;
  draggedNodeId?: string | null;
  dropTargetNodeId?: string | null;
  dropPositionGlobal?: DropPosition | null;
};

export function NavigationTreeNode({
  node,
  children,
  allNodes,
  level = 0,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  isDragging,
  isDropTarget,
  dropPosition,
  isSelected = false,
  setSelectedNodeId,
  selectedNodeId,
  draggedNodeId,
  dropTargetNodeId,
  dropPositionGlobal,
}: NavigationTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const displayTitle =
    node.customTitle || node.slugPattern[node.slugPattern.length - 1] || "Untitled";
  const displayEmoji = node.customEmoji || (node.type === "page" ? "📄" : node.type === "group" ? "📁" : "🔗");

  const getAllDescendants = (nodeId: string): string[] => {
    const descendants: string[] = [];
    const children = allNodes.filter(n => n.parentId === nodeId);

    for (const child of children) {
      descendants.push(child.id);
      descendants.push(...getAllDescendants(child.id));
    }

    return descendants;
  };

  const isValidDropTarget = (): boolean => {
    if (!draggedNodeId || draggedNodeId === node.id) {
      return false;
    }

    let newParentId: string | null;

    if (dropPosition === "inside") {
      newParentId = node.id;
    } else {
      newParentId = node.parentId;
    }

    if (newParentId === draggedNodeId) {
      return false;
    }

    if (newParentId !== null) {
      const descendants = getAllDescendants(draggedNodeId);
      if (descendants.includes(newParentId)) {
        return false;
      }
    }

    return true;
  };

  const showDropIndicator = isDropTarget && isValidDropTarget();

  return (
    <div className={`${level > 0 ? "ml-6 relative" : ""}`}>
      {level > 0 && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-emphasis" />
          <div className="absolute left-0 top-3 w-3 h-px bg-surface-emphasis" />
        </>
      )}

      {showDropIndicator && dropPosition === "before" && (
        <div className="relative h-0.5! mb-1 mx-2">
          <div className="absolute inset-0 bg-accent-surface rounded-full shadow-accent-surface" />
        </div>
      )}

      <div
        draggable
        onClick={(e) => {
          e.stopPropagation();
          setSelectedNodeId?.(node.id);
        }}
        onDragStart={() => onDragStart(node.id)}
        onDragOver={(e) => onDragOver(e, node.id, children.length > 0)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, node, allNodes)}
        onDragEnd={onDragEnd}
        className={cn(
          "group flex items-center gap-2 px-3 py-2 rounded-md transition-all cursor-pointer relative",
          isDragging ? "opacity-50 cursor-grabbing" : "",
          isSelected ? "bg-accent-surface/50" : "hover:bg-surface-emphasis/50",
          showDropIndicator && dropPosition === "inside" ? "ring-2 ring-accent-surface ring-inset" : "",
        )}
      >
        {children.length > 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="shrink-0 w-4 h-4 flex items-center justify-center"
            type="button"
          >
            <Icon
              name={isExpanded ? "chevron-down" : "chevron-right"}
              pack="basic"
              size="sm"
            />
          </button>
        ) : (
          <div className="w-4 shrink-0" />
        )}

        <span className="text-lg shrink-0">{displayEmoji}</span>

        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className="text-sm truncate">{displayTitle}</span>
          {node.type === "group" && (
            <Badge variant="info" size="sm">Group</Badge>
          )}
          {node.hidden && (
            <Icon name="eye-slash" pack="basic" size="sm" className="text-foreground-muted shrink-0" />
          )}
        </div>
      </div>

      {showDropIndicator && dropPosition === "after" && (
        <div className="relative h-0.5! mt-1 mx-2">
          <div className="absolute inset-0 bg-accent-surface rounded-full shadow-accent-surface" />
        </div>
      )}

      {isExpanded && children.length > 0 && (
        <div className="mt-0.5">
          {children.map((child) => {
            const grandchildren = allNodes.filter((n) => n.parentId === child.id);
            return (
              <NavigationTreeNode
                key={child.id}
                node={child}
                children={grandchildren}
                allNodes={allNodes}
                level={level + 1}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                isDragging={draggedNodeId === child.id}
                isDropTarget={dropTargetNodeId === child.id}
                dropPosition={dropTargetNodeId === child.id ? dropPositionGlobal : null}
                isSelected={selectedNodeId === child.id}
                setSelectedNodeId={setSelectedNodeId}
                selectedNodeId={selectedNodeId}
                draggedNodeId={draggedNodeId}
                dropTargetNodeId={dropTargetNodeId}
                dropPositionGlobal={dropPositionGlobal}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
