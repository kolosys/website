"use client";

import { useState } from "react";
import { Button } from "@kolosys-sites/theme";

type EmojiPickerProps = {
  currentEmoji: string;
  onSelect: (emoji: string) => void;
};

const COMMON_EMOJIS = [
  "📄", "📁", "🔗", "📖", "📝", "📋", "📌", "📍",
  "🏠", "⚙️", "🔧", "🔨", "💡", "🎯", "🎨", "🎭",
  "🔍", "🔎", "📊", "📈", "📉", "💻", "⌨️", "🖥️",
  "📱", "📞", "📧", "📬", "📮", "🗂️", "📂", "📑",
  "🗓️", "📅", "📆", "🕐", "⏰", "⏱️", "⏲️", "🔔",
  "🔕", "🔒", "🔓", "🔑", "🗝️", "🛡️", "🔐", "🔏",
  "✅", "✔️", "✖️", "❌", "➕", "➖", "➗", "✏️",
  "📐", "📏", "📌", "📍", "🔖", "🏷️", "💼", "👤",
];

export function EmojiPicker({ currentEmoji, onSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-xl hover:scale-110 transition-transform cursor-pointer"
        title="Click to change emoji"
      >
        {currentEmoji}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-1 z-50 bg-surface-base border border-surface-emphasis rounded-lg shadow-lg p-3 w-64">
            <div className="grid grid-cols-8 gap-1">
              {COMMON_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleSelect(emoji)}
                  className={`
                    text-xl p-1 rounded hover:bg-surface-emphasis transition-colors
                    ${emoji === currentEmoji ? "bg-accent-surface" : ""}
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
