"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@kolosys-sites/theme/modal";
import { Button, Input, Fieldset, Field, Label, Switch } from "@kolosys-sites/theme";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { createNavNode } from "@/app/actions/navigation";

type NodeType = "page" | "group" | "link";

const NODE_TYPES: { value: NodeType; label: string }[] = [
  { value: "page", label: "Page" },
  { value: "group", label: "Group" },
  { value: "link", label: "External Link" },
];

export function AddNodeButton({
  projectId,
  parentId,
}: {
  projectId: string;
  parentId?: string;
}) {
  const { openModal } = useModal();

  const openAddNodeModal = () => {
    openModal({
      content: <AddNodeModalContent projectId={projectId} parentId={parentId} />,
      showCloseButton: false,
    });
  };

  return (
    <Button onClick={openAddNodeModal} variant="ghost" size="xs" className="p-1">
      <Icon name="plus" pack="basic" size="xs" />
    </Button>
  );
}

function AddNodeModalContent({
  projectId,
  parentId,
}: {
  projectId: string;
  parentId?: string;
}) {
  const router = useRouter();
  const { closeAllModals } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<NodeType>("page");
  const [slugPattern, setSlugPattern] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const customTitle = formData.get("customTitle") as string;
    const customEmoji = formData.get("customEmoji") as string;
    const externalUrl = formData.get("externalUrl") as string;
    const hidden = formData.get("hidden") === "on";

    if (!slugPattern.trim()) {
      setError("Slug pattern is required");
      setIsSubmitting(false);
      return;
    }

    if (type === "link" && !externalUrl) {
      setError("External URL is required for link type");
      setIsSubmitting(false);
      return;
    }

    const result = await createNavNode(projectId, {
      parentId: parentId || null,
      slugPattern: [slugPattern.trim()],
      type,
      customTitle: customTitle || undefined,
      customEmoji: customEmoji || undefined,
      externalUrl: externalUrl || undefined,
      hidden,
    });

    if (result.success) {
      closeAllModals();
      router.refresh();
    } else {
      setError(result.error || "Failed to create navigation node");
      setIsSubmitting(false);
    }
  };

  const handleTypeSelect = (selectedType: NodeType) => {
    setType(selectedType);
    setStep(2);
  };

  if (step === 1) {
    return (
      <div className="w-full max-w-2xl bg-surface-base border border-surface-emphasis rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">
          {parentId ? "Add Child Node" : "Add Navigation Node"}
        </h2>
        <p className="text-sm text-foreground-muted mb-6">
          Choose the type of navigation node you want to create
        </p>

        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => handleTypeSelect("page")}
            className="p-6 border-2 border-surface-emphasis rounded-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all text-center group"
          >
            <div className="text-4xl mb-3">📄</div>
            <div className="font-semibold mb-2">Page</div>
            <p className="text-xs text-foreground-muted">
              A documentation page that matches content files
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleTypeSelect("group")}
            className="p-6 border-2 border-surface-emphasis rounded-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all text-center group"
          >
            <div className="text-4xl mb-3">📁</div>
            <div className="font-semibold mb-2">Group</div>
            <p className="text-xs text-foreground-muted">
              A folder that contains other pages or groups
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleTypeSelect("link")}
            className="p-6 border-2 border-surface-emphasis rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all text-center group"
          >
            <div className="text-4xl mb-3">🔗</div>
            <div className="font-semibold mb-2">External Link</div>
            <p className="text-xs text-foreground-muted">
              A link to an external website or resource
            </p>
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="secondary"
            onClick={() => closeAllModals()}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-surface-base border border-surface-emphasis rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setStep(1)}
          disabled={isSubmitting}
        >
          <Icon name="arrow-left" pack="basic" size="sm" />
        </Button>
        <h2 className="text-xl font-semibold">
          Configure {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-error-surface text-error-foreground rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Fieldset className="space-y-4">
          <Field>
            <Label htmlFor="slugPattern">Slug Pattern *</Label>
            <Input
              id="slugPattern"
              type="text"
              value={slugPattern}
              onChange={(e) => setSlugPattern(e.target.value)}
              placeholder="introduction"
              disabled={isSubmitting}
            />
            <p className="text-xs text-foreground-muted mt-1">
              Path segment to match (e.g., "introduction", "api", "*" for wildcard)
            </p>
          </Field>

          <Field>
            <Label htmlFor="customTitle">Custom Title</Label>
            <Input
              id="customTitle"
              name="customTitle"
              type="text"
              placeholder="Optional custom display title"
              disabled={isSubmitting}
            />
          </Field>

          <Field>
            <Label htmlFor="customEmoji">Custom Emoji</Label>
            <Input
              id="customEmoji"
              name="customEmoji"
              type="text"
              placeholder="📖"
              disabled={isSubmitting}
              maxLength={2}
            />
          </Field>

          {type === "link" && (
            <Field>
              <Label htmlFor="externalUrl">External URL *</Label>
              <Input
                id="externalUrl"
                name="externalUrl"
                type="url"
                placeholder="https://example.com"
                disabled={isSubmitting}
              />
            </Field>
          )}

          <div className="border-t border-surface-emphasis pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <Icon
                name={showAdvanced ? "chevron-down" : "chevron-right"}
                pack="basic"
                size="sm"
              />
              Advanced Options
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <Field className="flex items-center justify-between">
                  <Label htmlFor="hidden">Hidden</Label>
                  <Switch id="hidden" name="hidden" disabled={isSubmitting} />
                </Field>
              </div>
            )}
          </div>
        </Fieldset>

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => closeAllModals()}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Creating..." : "Create Node"}
          </Button>
        </div>
      </form>
    </div>
  );
}
