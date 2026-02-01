"use client";

import { useState, useEffect } from "react";
import { Card, Input, Fieldset, Field, Label, Switch, Icon, Button } from "@kolosys-sites/theme";
import { EmojiPicker } from "./EmojiPicker";

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

type NodeSettingsProps = {
  node: NavNode | null;
  onChange: (nodeId: string, updates: Partial<NavNode>) => void;
  onDelete: (nodeId: string) => void;
  hasChildren: boolean;
  onSave: () => void;
  onDiscard: () => void;
  hasPendingChanges: boolean;
  isSaving: boolean;
};

export function NodeSettings({ node, onChange, onDelete, hasChildren, onSave, onDiscard, hasPendingChanges, isSaving }: NodeSettingsProps) {
  const [customTitle, setCustomTitle] = useState("");
  const [customEmoji, setCustomEmoji] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (node) {
      setCustomTitle(node.customTitle || "");
      setCustomEmoji(node.customEmoji || "");
      setExternalUrl(node.externalUrl || "");
      setHidden(node.hidden);
    }
  }, [node]);

  if (!node) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-foreground-muted">
          <div className="text-4xl mb-3 opacity-50">📝</div>
          <p className="text-sm">Select a node to view and edit its settings</p>
        </div>
      </Card>
    );
  }

  const handleTitleChange = (value: string) => {
    setCustomTitle(value);
    onChange(node.id, { customTitle: value || null });
  };

  const handleEmojiChange = (value: string) => {
    setCustomEmoji(value);
    onChange(node.id, { customEmoji: value || null });
  };

  const handleExternalUrlChange = (value: string) => {
    setExternalUrl(value);
    onChange(node.id, { externalUrl: value || null });
  };

  const handleHiddenChange = (value: boolean) => {
    setHidden(value);
    onChange(node.id, { hidden: value });
  };

  const handleDelete = () => {
    if (hasChildren) {
      alert("Cannot delete node with children. Delete children first.");
      return;
    }

    const displayTitle = node.customTitle || node.slugPattern[node.slugPattern.length - 1] || "Untitled";
    if (confirm(`Delete "${displayTitle}"?`)) {
      onDelete(node.id);
    }
  };

  const displayEmoji = customEmoji || (node.type === "page" ? "📄" : node.type === "group" ? "📁" : "🔗");

  return (
    <div className="h-full flex flex-col">
      <div className="px-3 py-2 border-b border-foreground">
        <div className="flex items-center justify-between">
          <h4>Section</h4>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              onClick={handleDelete}
              isElevated
            >
              <Icon name="trash" pack="basic" size="xs" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <Fieldset className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Title & Icon</h4>
            <p className="text-xs text-foreground-muted mb-3">
              This title and icon will appear in your site's navigation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 border border-surface-emphasis rounded bg-surface-emphasis/30">
                  <EmojiPicker currentEmoji={displayEmoji} onSelect={handleEmojiChange} />
                </div>
                <Input
                  id="customTitle"
                  type="text"
                  placeholder="Display Title"
                  value={customTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {node.type === "link" && (
            <div>
              <h4 className="text-sm font-semibold mb-3">External URL</h4>
              <Input
                id="externalUrl"
                type="url"
                placeholder="https://example.com"
                value={externalUrl}
                onChange={(e) => handleExternalUrlChange(e.target.value)}
              />
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold mb-3">Slug</h4>
            <p className="text-xs text-foreground-muted mb-3">
              Set the URL segment for your site section.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground-muted">https://docs.kolosys.com/</span>
              <span className="text-sm font-mono font-semibold">{node.slugPattern.join("/")}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-emphasis">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="hidden" className="text-sm font-semibold">Hidden</Label>
                <p className="text-xs text-foreground-muted mt-1">
                  Hide this node from navigation
                </p>
              </div>
              <Switch
                id="hidden"
                checked={hidden}
                onChange={handleHiddenChange}
              />
            </div>
          </div>

          <div className="bg-surface-emphasis/50 rounded p-3">
            <div className="text-xs font-semibold mb-2 text-foreground-muted">Node Information</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-foreground-muted">Type:</span>
                <span className="font-mono capitalize">{node.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Sort Order:</span>
                <span className="font-mono">{node.sortOrder}</span>
              </div>
            </div>
          </div>
        </Fieldset>
      </div>

      {hasPendingChanges && (
        <div className="p-4 border-t border-surface-emphasis bg-surface-emphasis/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="alert-triangle" pack="basic" size="sm" className="text-warning" />
              <span className="text-foreground-muted">You have unsaved changes</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onDiscard}
                disabled={isSaving}
              >
                Discard
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
