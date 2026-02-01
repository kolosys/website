"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@kolosys-sites/theme/modal";
import { Button } from "@kolosys-sites/theme";
import { Input } from "@kolosys-sites/theme";
import { Fieldset, Field, Label } from "@kolosys-sites/theme";
import { Switch } from "@kolosys-sites/theme";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { importGitHubRepo, getOrgRepositories, importAndSyncGitHubProject } from "@/app/actions/github";
import { slugifyRepoName } from "@/lib/github";

const GITHUB_ORG = process.env.NEXT_PUBLIC_GITHUB_ORG || "kolosys";

export function ImportProjectButton() {
  const { openModal } = useModal();

  const openImportModal = () => {
    openModal({
      title: "Import Project from GitHub",
      content: <ImportProjectModalContent />,
      showCloseButton: true,
      size: "md",
    });
  };

  return (
    <Button onClick={openImportModal}>
      Import Project
    </Button>
  );
}

type GitHubMetadata = {
  name: string;
  owner: string;
  repo: string;
  fullName: string;
  description: string | null;
  topics: string[];
  defaultBranch: string;
};

type OrgRepository = {
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
};

function ImportProjectModalContent() {
  const router = useRouter();
  const { closeAllModals } = useModal();

  const [step, setStep] = useState<"import" | "review">("import");
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [repositories, setRepositories] = useState<OrgRepository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<OrgRepository | null>(null);
  const [query, setQuery] = useState("");
  const [metadata, setMetadata] = useState<GitHubMetadata | null>(null);
  const comboboxButtonRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    setIsLoadingRepos(true);
    setError(null);

    const result = await getOrgRepositories(GITHUB_ORG);

    if (result.success && result.data) {
      setRepositories(result.data as OrgRepository[]);
    } else {
      setError(result.error || "Failed to load repositories");
    }

    setIsLoadingRepos(false);
  };

  const handleImport = async () => {
    if (!selectedRepo) {
      setError("Please select a repository");
      return;
    }

    setIsImporting(true);
    setError(null);

    const result = await importGitHubRepo(selectedRepo.fullName);

    if (result.success && result.data) {
      const data = result.data as GitHubMetadata;
      setMetadata(data);
      setName(data.name);
      setSlug(slugifyRepoName(data.name));
      setDescription(data.description || "");
      setTopics(data.topics || []);
      setStep("review");
    } else {
      setError(result.error || "Failed to import repository");
    }

    setIsImporting(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!name || !slug || !metadata) {
      setError("Name and slug are required");
      setIsSubmitting(false);
      return;
    }

    const result = await importAndSyncGitHubProject({
      name,
      slug,
      description: description || undefined,
      topics: topics.length > 0 ? topics : undefined,
      published,
      featured,
      owner: metadata.owner,
      repo: metadata.repo,
      defaultBranch: metadata.defaultBranch,
      docsPath: "docs",
    });

    if (result.success) {
      closeAllModals();
      router.refresh();
      router.push(`/v2/projects/${slug}`);
    } else {
      setError(result.error || "Failed to create project");
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep("import");
    setError(null);
  };

  if (step === "import") {
    const filteredRepositories = query === ""
      ? repositories
      : repositories.filter((repo) => {
        const searchText = query.toLowerCase();
        return (
          repo.name.toLowerCase().includes(searchText) ||
          repo.fullName.toLowerCase().includes(searchText) ||
          repo.description?.toLowerCase().includes(searchText)
        );
      });

    return (
      <>
        {error && (
          <div className="mb-4 p-3 bg-error-50 text-error-600 rounded">
            {error}
          </div>
        )}

        <Fieldset className="space-y-4">
          <Field>
            <Label htmlFor="repo">Select Repository</Label>
            <Combobox value={selectedRepo} onChange={setSelectedRepo} disabled={isLoadingRepos || isImporting}>
              <div className="relative">
                <ComboboxInput
                  placeholder={isLoadingRepos ? "Loading repositories..." : `Search ${GITHUB_ORG} repositories...`}
                  displayValue={(repo) => (repo as unknown as OrgRepository | null)?.fullName ?? ""}
                  onChange={(e) => setQuery(e.target.value)}
                  onClick={() => comboboxButtonRef.current?.click()}
                  disabled={isLoadingRepos || isImporting}
                />
                <ComboboxButton ref={comboboxButtonRef}>
                  <Icon name="chevron-down" pack="basic" size="sm" />
                </ComboboxButton>
              </div>
              <ComboboxOptions>
                {filteredRepositories.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-caption">
                    {isLoadingRepos ? "Loading..." : query ? "No repositories found" : "No repositories available"}
                  </div>
                ) : (
                  filteredRepositories.map((repo) => (
                    <ComboboxOption key={repo.fullName} value={repo}>
                      <div className="flex flex-col">
                        <span className="font-medium">{repo.name}</span>
                        {repo.description && (
                          <span className="text-xs text-caption truncate">
                            {repo.description}
                          </span>
                        )}
                      </div>
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Combobox>
            <p className="text-xs text-caption mt-1">
              Type to search repositories from the {GITHUB_ORG} organization
            </p>
          </Field>

          {selectedRepo && (
            <div className="mt-6 p-4 bg-subtle rounded-lg border border-divider space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">Import Preview</h4>
                  <p className="text-xs text-caption mt-1">
                    The following project will be created from this repository
                  </p>
                </div>
                {selectedRepo.isPrivate && (
                  <span className="px-2 py-1 bg-surface text-caption text-xs rounded border border-divider">
                    Private
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Icon name="folder" pack="basic" size="sm" className="text-caption mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{selectedRepo.name}</div>
                    <div className="text-xs text-caption">{selectedRepo.fullName}</div>
                  </div>
                </div>

                {selectedRepo.description && (
                  <div className="pl-6">
                    <div className="text-xs text-body">{selectedRepo.description}</div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-divider">
                <div className="text-xs font-medium text-foreground mb-2">What will be synced:</div>
                <ul className="space-y-1.5 text-xs text-body">
                  <li className="flex items-center gap-2">
                    <Icon name="check" pack="basic" size="xs" className="text-success-600" />
                    <span>Create project: <span className="font-medium">{slugifyRepoName(selectedRepo.name)}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" pack="basic" size="xs" className="text-success-600" />
                    <span>Add GitHub source: <span className="font-medium">{selectedRepo.fullName}</span></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" pack="basic" size="xs" className="text-success-600" />
                    <span>Sync all version tags from GitHub</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" pack="basic" size="xs" className="text-success-600" />
                    <span>Sync documentation for latest version</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" pack="basic" size="xs" className="text-success-600" />
                    <span>Generate navigation structure</span>
                  </li>
                </ul>
                <p className="text-xs text-caption mt-3">
                  This process may take a few moments depending on repository size.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => closeAllModals()}
              disabled={isImporting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleImport}
              disabled={isImporting || !selectedRepo || isLoadingRepos}
              className="flex-1"
            >
              {isImporting ? "Importing..." : "Import Repository"}
            </Button>
          </div>
        </Fieldset>
      </>
    );
  }

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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </Field>

          {topics.length > 0 && (
            <Field>
              <Label>Topics (from GitHub)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-primary-base text-primary-emphasis text-xs rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </Field>
          )}

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
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
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
            {isSubmitting ? "Importing & Syncing..." : "Import Project"}
          </Button>
        </div>
      </form>
    </>
  );
}
