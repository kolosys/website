"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@kolosys-sites/theme/modal";
import { Button } from "@kolosys-sites/theme";
import { Input } from "@kolosys-sites/theme";
import { Fieldset, Field, Label } from "@kolosys-sites/theme";
import { Switch } from "@kolosys-sites/theme";
import { createProject } from "@/app/actions/projects";

export function CreateProjectButton() {
  const { openModal } = useModal();

  const openCreateModal = () => {
    const modalId = openModal({
      title: "Create New Project",
      content: <CreateProjectModalContent />,
      showCloseButton: true,
      size: "md",
    });
  };

  return (
    <Button onClick={openCreateModal}>
      Create Project
    </Button>
  );
}

function CreateProjectModalContent() {
  const router = useRouter();
  const { closeAllModals } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const emoji = formData.get("emoji") as string;

    if (!name || !slug) {
      setError("Name and slug are required");
      setIsSubmitting(false);
      return;
    }

    const result = await createProject({
      name,
      slug,
      description: description || undefined,
      emoji: emoji || undefined,
      published,
      featured,
    });

    if (result.success) {
      setPublished(false);
      setFeatured(false);
      closeAllModals();
      router.refresh();
      router.push(`/v2/projects/${slug}`);
    } else {
      setError(result.error || "Failed to create project");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-error-50 text-error-600 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Fieldset className="space-y-4">
          <Field>
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="My Awesome Project"
              disabled={isSubmitting}
            />
          </Field>

          <Field>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              type="text"
              required
              placeholder="my-awesome-project"
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens allowed"
              disabled={isSubmitting}
            />
            <p className="text-xs text-caption mt-1">
              URL-friendly identifier (lowercase, no spaces)
            </p>
          </Field>

          <Field>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="A brief description of your project"
              disabled={isSubmitting}
            />
          </Field>

          <Field>
            <Label htmlFor="emoji">Emoji</Label>
            <Input
              id="emoji"
              name="emoji"
              type="text"
              placeholder="📦"
              maxLength={2}
              disabled={isSubmitting}
            />
          </Field>

          <Field className="flex items-center justify-between">
            <Label htmlFor="published">Published</Label>
            <Switch
              id="published"
              checked={published}
              onChange={setPublished}
              disabled={isSubmitting}
            />
          </Field>

          <Field className="flex items-center justify-between">
            <Label htmlFor="featured">Featured</Label>
            <Switch
              id="featured"
              checked={featured}
              onChange={setFeatured}
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
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </>
  );
}
