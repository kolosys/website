"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faCog } from "@fortawesome/free-solid-svg-icons";
import type { ContentItem } from "@/lib/content";

type ContentItemRowProps = {
  item: ContentItem;
  groupId: string;
  nodePath?: string[];
  isDragged: boolean;
  indent?: number;
  onDragStart: (e: React.DragEvent, groupId: string, itemId: string, nodePath?: string[]) => void;
  onDragOver: (e: React.DragEvent, groupId: string, itemId: string, nodePath?: string[]) => void;
  onDragEnd: () => void;
  onSettings: (itemId: string) => void;
};

export function ContentItemRow({
  item,
  groupId,
  nodePath,
  isDragged,
  indent = 0,
  onDragStart,
  onDragOver,
  onDragEnd,
  onSettings,
}: ContentItemRowProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, groupId, item.id, nodePath)}
      onDragOver={(e) => onDragOver(e, groupId, item.id, nodePath)}
      onDragEnd={onDragEnd}
      className={`flex items-center px-6 py-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors cursor-move ${
        isDragged ? "opacity-50" : ""
      }`}
      style={{ paddingLeft: `${36 + indent}px` }}
    >
      <div className="flex-1 flex items-center space-x-3">
        {/* Drag Handle */}
        <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing shrink-0">
          <FontAwesomeIcon icon={faGripVertical} className="w-3 h-3" />
        </button>

        {/* Emoji and Name */}
        <span className="text-lg shrink-0">{item.emoji || "📄"}</span>
        <span className="text-sm text-gray-700">{item.name}</span>
      </div>

      <div className="w-40 flex items-center"></div>

      <div className="w-32 flex items-center">
        <span className="text-xs text-blue-600">{item.source}</span>
      </div>

      <div className="w-20 flex items-center justify-end">
        {/* Empty - items don't have item count */}
      </div>

      <div className="w-16 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSettings(item.id);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          title="Settings"
        >
          <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

