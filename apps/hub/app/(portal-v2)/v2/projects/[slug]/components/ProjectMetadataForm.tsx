"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@kolosys-sites/theme";
import { Input } from "@kolosys-sites/theme";
import { Fieldset, Field, Label } from "@kolosys-sites/theme";
import { Switch } from "@kolosys-sites/theme";
import { Card, CardHeader, CardContent } from "@kolosys-sites/theme";
import { updateProject } from "@/app/actions/projects";

type Project = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  emoji: string | null;
  faIcon: string | null;
  published: boolean;
  featured: boolean;
};

export function ProjectMetadataForm({ project }: { project: Project }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const result = await updateProject(project.id, {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      emoji: (formData.get("emoji") as string) || null,
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
    });

    if (result.success) {
      setIsEditing(false);
      router.refresh();
    } else {
      setError(result.error || "Failed to update project");
    }

    setIsSaving(false);
  };

  return (
    <Card variant="outlined">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Metadata</h3>
        {!isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-error-surface text-error-foreground rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Fieldset className="space-y-4">
            <Field>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={project.name}
                required
                disabled={!isEditing || isSaving}
              />
            </Field>

            <Field>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                type="text"
                value={project.slug}
                disabled
                className="bg-surface-muted"
              />
              <p className="text-xs text-foreground-muted mt-1">
                Slug cannot be changed
              </p>
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                defaultValue={project.description || ""}
                disabled={!isEditing || isSaving}
              />
            </Field>

            <Field>
              <Label htmlFor="emoji">Emoji</Label>
              <Input
                id="emoji"
                name="emoji"
                type="text"
                defaultValue={project.emoji || ""}
                maxLength={2}
                disabled={!isEditing || isSaving}
              />
            </Field>

            <Field className="flex items-center justify-between">
              <Label htmlFor="published">Published</Label>
              <Switch
                id="published"
                name="published"
                defaultChecked={project.published}
                disabled={!isEditing || isSaving}
              />
            </Field>

            <Field className="flex items-center justify-between">
              <Label htmlFor="featured">Featured</Label>
              <Switch
                id="featured"
                name="featured"
                defaultChecked={project.featured}
                disabled={!isEditing || isSaving}
              />
            </Field>
          </Fieldset>

          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setError(null);
                }}
                disabled={isSaving}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
