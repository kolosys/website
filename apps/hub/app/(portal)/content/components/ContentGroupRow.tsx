"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faGripVertical,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import type { ContentGroup } from "@/lib/content/types";
import { ContentItemRow } from "./ContentItemRow";
import { ContentNodeRow } from "./ContentNodeRow";

type ContentGroupWithExpanded = ContentGroup & {
  expanded: boolean;
};

type ContentGroupRowProps = {
  group: ContentGroupWithExpanded;
  draggedGroup: string | null;
  draggedItem: { groupId: string; itemId: string; nodePath?: string[] } | null;
  draggedNode: { groupId: string; nodeId: string; path: string[] } | null;
  onToggleExpand: (groupId: string) => void;
  onGroupDragStart: (e: React.DragEvent, groupId: string) => void;
  onGroupDragOver: (e: React.DragEvent, groupId: string) => void;
  onGroupDragEnd: () => void;
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
  onItemSettings: (itemId: string) => void;
  onGroupSettings: (groupSlug: string) => void;
  onNodeDragStart: (groupId: string, nodeId: string, path: string[]) => void;
  onNodeDragOver: (groupId: string, targetNodeId: string, targetPath: string[]) => void;
  onNodeDragEnd: () => void;
  onNodeToggle: (groupId: string, nodeId: string) => void;
};

export function ContentGroupRow({
  group,
  draggedGroup,
  draggedItem,
  draggedNode,
  onToggleExpand,
  onGroupDragStart,
  onGroupDragOver,
  onGroupDragEnd,
  onItemDragStart,
  onItemDragOver,
  onItemDragEnd,
  onItemSettings,
  onGroupSettings,
  onNodeDragStart,
  onNodeDragOver,
  onNodeDragEnd,
  onNodeToggle,
}: ContentGroupRowProps) {
  return (
    <div key={group.id}>
      {/* Group Row */}
      <div
        draggable
        onDragStart={(e) => onGroupDragStart(e, group.id)}
        onDragOver={(e) => onGroupDragOver(e, group.id)}
        onDragEnd={onGroupDragEnd}
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
            onClick={() => onToggleExpand(group.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`w-4 h-4 transition-transform ${!group.expanded ? "-rotate-90" : ""
                }`}
            />
          </button>

          {/* Emoji and Name */}
          <span className="text-2xl shrink-0">{group.emoji || "📄"}</span>
          <span className="font-medium text-gray-900">{group.name}</span>
        </div>

        <div className="w-16 flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGroupSettings(group.id);
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
            <ContentItemRow
              key={item.id}
              item={item}
              groupId={group.id}
              isDragged={draggedItem?.itemId === item.id}
              onDragStart={onItemDragStart}
              onDragOver={onItemDragOver}
              onDragEnd={onItemDragEnd}
              onSettings={onItemSettings}
            />
          ))}

          {/* Render nested nodes */}
          {group.children &&
            group.children.map((node) => (
              <ContentNodeRow
                key={node.id}
                node={node}
                groupId={group.id}
                level={1}
                parentPath={[]}
                draggedItem={draggedItem}
                draggedNode={draggedNode}
                onItemDragStart={onItemDragStart}
                onItemDragOver={onItemDragOver}
                onItemDragEnd={onItemDragEnd}
                onItemSettings={onItemSettings}
                onNodeDragStart={onNodeDragStart}
                onNodeDragOver={onNodeDragOver}
                onNodeDragEnd={onNodeDragEnd}
                onNodeToggle={(nodeId) => onNodeToggle(group.id, nodeId)}
              />
            ))}
        </div>
      )}
    </div>
  );
}

