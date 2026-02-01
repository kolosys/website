"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Fieldset, Field, Label, Switch, Icon } from "@kolosys-sites/theme";
import { updateNavNode } from "@/app/actions/navigation";

type NavNode = {
  id: string;
  projectId: string;
  slugPattern: string[];
  type: "page" | "group" | "link";
  customTitle: string | null;
  customEmoji: string | null;
  externalUrl: string | null;
  hidden: boolean;
};

type NodeEditSidebarProps = {
  node: NavNode;
  isOpen: boolean;
  onClose: () => void;
};

export function NodeEditSidebar({ node, isOpen, onClose }: NodeEditSidebarProps) {
  const router = useRouter();
  const [customTitle, setCustomTitle] = useState(node.customTitle || "");
  const [customEmoji, setCustomEmoji] = useState(node.customEmoji || "");
  const [externalUrl, setExternalUrl] = useState(node.externalUrl || "");
  const [hidden, setHidden] = useState(node.hidden);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setCustomTitle(node.customTitle || "");
    setCustomEmoji(node.customEmoji || "");
    setExternalUrl(node.externalUrl || "");
    setHidden(node.hidden);
    setHasChanges(false);
  }, [node]);

  useEffect(() => {
    const changed =
      customTitle !== (node.customTitle || "") ||
      customEmoji !== (node.customEmoji || "") ||
      externalUrl !== (node.externalUrl || "") ||
      hidden !== node.hidden;
    setHasChanges(changed);
  }, [customTitle, customEmoji, externalUrl, hidden, node]);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateNavNode(node.projectId, node.id, {
      customTitle: customTitle || null,
      customEmoji: customEmoji || null,
      externalUrl: externalUrl || null,
      hidden,
    });

    if (result.success) {
      setHasChanges(false);
      router.refresh();
    } else {
      alert(result.error || "Failed to update node");
    }
    setIsSaving(false);
  };

  const handleClose = () => {
    if (hasChanges) {
      if (confirm("You have unsaved changes. Discard them?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={handleClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-surface-base border-l border-surface-emphasis z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-surface-emphasis">
          <h2 className="text-lg font-semibold">Edit Node</h2>
          <Button onClick={handleClose} size="sm" variant="ghost">
            <Icon name="x" pack="basic" size="sm" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Fieldset className="space-y-4">
            <Field>
              <Label>Type</Label>
              <div className="px-3 py-2 bg-surface-emphasis/50 rounded capitalize text-foreground-muted">
                {node.type}
              </div>
              <p className="text-xs text-foreground-muted mt-1">Type cannot be changed</p>
            </Field>

            <Field>
              <Label>Slug Pattern</Label>
              <div className="px-3 py-2 bg-surface-emphasis/50 rounded text-foreground-muted font-mono text-sm">
                {node.slugPattern.join(" / ")}
              </div>
              <p className="text-xs text-foreground-muted mt-1">
                Slug pattern cannot be changed
              </p>
            </Field>

            <Field>
              <Label htmlFor="customTitle">Custom Title</Label>
              <Input
                id="customTitle"
                type="text"
                placeholder="Optional custom display title"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                disabled={isSaving}
              />
            </Field>

            <Field>
              <Label htmlFor="customEmoji">Custom Emoji</Label>
              <Input
                id="customEmoji"
                type="text"
                placeholder="📖"
                value={customEmoji}
                onChange={(e) => setCustomEmoji(e.target.value)}
                disabled={isSaving}
                maxLength={2}
              />
            </Field>

            {node.type === "link" && (
              <Field>
                <Label htmlFor="externalUrl">External URL *</Label>
                <Input
                  id="externalUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  disabled={isSaving}
                />
              </Field>
            )}

            <Field className="flex items-center justify-between">
              <Label htmlFor="hidden">Hidden</Label>
              <Switch
                id="hidden"
                checked={hidden}
                onChange={setHidden}
                disabled={isSaving}
              />
            </Field>
          </Fieldset>
        </div>

        <div className="p-4 border-t border-surface-emphasis">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={isSaving}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="flex-1"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
