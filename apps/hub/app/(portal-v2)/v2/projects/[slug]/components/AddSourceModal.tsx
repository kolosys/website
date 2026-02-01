"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@kolosys-sites/theme/modal";
import { Button } from "@kolosys-sites/theme";
import { Input } from "@kolosys-sites/theme";
import { Fieldset, Field, Label } from "@kolosys-sites/theme";
import { Switch } from "@kolosys-sites/theme";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { addProjectSource } from "@/app/actions/projects";
import type { SourceProvider } from "@/prisma/client/enums";

const PROVIDERS: { value: SourceProvider; label: string }[] = [
  { value: "github", label: "GitHub" },
  { value: "gitlab", label: "GitLab" },
  { value: "bitbucket", label: "Bitbucket" },
];

export function AddSourceButton({ projectId }: { projectId: string }) {
  const { openModal } = useModal();

  const openAddSourceModal = () => {
    openModal({
      content: <AddSourceModalContent projectId={projectId} />,
      showCloseButton: false,
    });
  };

  return (
    <Button onClick={openAddSourceModal}>
      <Icon name="plus" pack="basic" size="sm" className="mr-2" />
      Add Source
    </Button>
  );
}

function AddSourceModalContent({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { closeAllModals } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<SourceProvider>("github");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const owner = formData.get("owner") as string;
    const repo = formData.get("repo") as string;
    const defaultBranch = formData.get("defaultBranch") as string;
    const docsPath = formData.get("docsPath") as string;
    const isPrimary = formData.get("isPrimary") === "on";

    if (!owner || !repo) {
      setError("Owner and repository are required");
      setIsSubmitting(false);
      return;
    }

    const result = await addProjectSource(projectId, {
      provider,
      owner,
      repo,
      defaultBranch: defaultBranch || "main",
      docsPath: docsPath || "docs",
      isPrimary,
    });

    if (result.success) {
      closeAllModals();
      router.refresh();
    } else {
      setError(result.error || "Failed to add source");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-surface-base border border-surface-emphasis rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add Project Source</h2>

      {error && (
        <div className="mb-4 p-3 bg-error-surface text-error-foreground rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Fieldset className="space-y-4">
          <Field>
            <Label htmlFor="provider">Provider *</Label>
            <Listbox value={provider} onChange={setProvider} disabled={isSubmitting}>
              <ListboxButton>
                <span className="capitalize">{provider}</span>
                <Icon name="chevron-down" pack="basic" size="sm" />
              </ListboxButton>
              <ListboxOptions>
                {PROVIDERS.map((p) => (
                  <ListboxOption key={p.value} value={p.value}>
                    {p.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </Field>

          <Field>
            <Label htmlFor="owner">Owner *</Label>
            <Input
              id="owner"
              name="owner"
              type="text"
              required
              placeholder="organization-name"
              disabled={isSubmitting}
            />
            <p className="text-xs text-foreground-muted mt-1">
              GitHub organization or username
            </p>
          </Field>

          <Field>
            <Label htmlFor="repo">Repository *</Label>
            <Input
              id="repo"
              name="repo"
              type="text"
              required
              placeholder="repository-name"
              disabled={isSubmitting}
            />
          </Field>

          <Field>
            <Label htmlFor="defaultBranch">Default Branch</Label>
            <Input
              id="defaultBranch"
              name="defaultBranch"
              type="text"
              placeholder="main"
              defaultValue="main"
              disabled={isSubmitting}
            />
          </Field>

          <Field>
            <Label htmlFor="docsPath">Docs Path</Label>
            <Input
              id="docsPath"
              name="docsPath"
              type="text"
              placeholder="docs"
              defaultValue="docs"
              disabled={isSubmitting}
            />
            <p className="text-xs text-foreground-muted mt-1">
              Path to documentation folder in the repository
            </p>
          </Field>

          <Field className="flex items-center justify-between">
            <Label htmlFor="isPrimary">Set as Primary Source</Label>
            <Switch
              id="isPrimary"
              name="isPrimary"
              disabled={isSubmitting}
            />
          </Field>
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Adding..." : "Add Source"}
          </Button>
        </div>
      </form>
    </div>
  );
}
