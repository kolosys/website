"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@kolosys-sites/theme";

type InlineNodeEditorProps = {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
};

export function InlineNodeEditor({ value, onSave, onCancel }: InlineNodeEditorProps) {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave(editValue);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  const handleBlur = () => {
    if (editValue.trim() !== value) {
      onSave(editValue);
    } else {
      onCancel();
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="h-6 text-sm px-2 py-1"
    />
  );
}
