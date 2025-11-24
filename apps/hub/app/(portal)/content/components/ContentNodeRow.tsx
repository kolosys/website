"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { ContentNode } from "@/lib/content/types";
import { ContentItemRow } from "./ContentItemRow";

type ContentNodeWithExpanded = ContentNode & {
  expanded: boolean;
};

type ContentNodeRowProps = {
  node: ContentNode;
  groupId: string;
  level: number;
  parentPath: string[];
  draggedItem: { groupId: string; itemId: string; nodePath?: string[] } | null;
  draggedNode: { groupId: string; nodeId: string; path: string[] } | null;
  onItemDragStart: (
    e: React.DragEvent,
    groupId: string,
    itemId: string,
    nodePath?: string[]
  ) => void;
  onItemDragOver: (
    e: React.DragEvent,
    groupId: string,
    itemId: string,
    nodePath?: string[]
  ) => void;
  onItemDragEnd: () => void;
  onItemSettings?: (itemId: string) => void;
  onNodeDragStart: (groupId: string, nodeId: string, path: string[]) => void;
  onNodeDragOver: (groupId: string, targetNodeId: string, targetPath: string[]) => void;
  onNodeDragEnd: () => void;
  onNodeToggle: (groupId: string, nodeId: string) => void;
};

export function ContentNodeRow({
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
}: ContentNodeRowProps) {
  const expanded = (node as ContentNodeWithExpanded).expanded ?? false;
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
              onNodeToggle(groupId, node.id);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-3 h-3 transition-transform ${!expanded ? "-rotate-90" : ""}`}
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
            <ContentItemRow
              key={item.id}
              item={item}
              groupId={groupId}
              nodePath={nodePath}
              isDragged={draggedItem?.itemId === item.id}
              indent={indent}
              onDragStart={onItemDragStart}
              onDragOver={onItemDragOver}
              onDragEnd={onItemDragEnd}
              onSettings={onItemSettings || (() => { })}
            />
          ))}

          {/* Nested subdirectories */}
          {node.children.map((childNode) => (
            <ContentNodeRow
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
              onNodeToggle={(nodeId) => onNodeToggle(groupId, nodeId)}
            />
          ))}
        </div>
      )}
    </>
  );
}

