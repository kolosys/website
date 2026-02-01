"use client";

import { Tabs, type TabItem } from "@kolosys-sites/theme";
import { ProjectMetadataForm } from "./ProjectMetadataForm";
import { ProjectSourcesTable } from "./ProjectSourcesTable";
import { ProjectVersionsTable } from "./ProjectVersionsTable";
import { AddSourceButton } from "./AddSourceModal";
import type { SourceProvider } from "@/prisma/client/enums";

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

type ProjectSource = {
  id: string;
  provider: SourceProvider;
  owner: string;
  repo: string;
  fullName: string;
  defaultBranch: string;
  docsPath: string;
  isPrimary: boolean;
  lastSyncedAt: Date | null;
};

type Version = {
  id: string;
  tag: string;
  isLatest: boolean;
  docsSynced: boolean;
  syncedAt: Date | null;
  _count?: {
    content: number;
  };
};

type ProjectTabsProps = {
  project: Project;
  sources: ProjectSource[];
  versions: Version[];
};

export function ProjectTabs({ project, sources, versions }: ProjectTabsProps) {
  const tabs: TabItem[] = [
    {
      label: "Overview",
      content: (
        <div className="space-y-6">
          <ProjectMetadataForm project={project} />
        </div>
      ),
    },
    {
      label: "Sources",
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Project Sources</h2>
              <p className="text-sm text-foreground-muted mt-1">
                Configure repositories to sync documentation from
              </p>
            </div>
            <AddSourceButton projectId={project.id} />
          </div>
          <ProjectSourcesTable sources={sources} projectId={project.id} />
        </div>
      ),
    },
    {
      label: "Versions",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Project Versions</h2>
            <p className="text-sm text-foreground-muted mt-1">
              Manage documentation versions for this project
            </p>
          </div>
          <ProjectVersionsTable versions={versions} projectId={project.id} />
        </div>
      ),
    },
    {
      label: "Settings",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Project Settings</h2>
            <p className="text-sm text-foreground-muted mt-1">
              Additional project configuration
            </p>
          </div>
          <div className="p-12 text-center text-foreground-muted border border-surface-emphasis rounded-lg">
            <p className="text-sm">Settings panel coming soon</p>
          </div>
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} variant="underline" defaultIndex={0} />;
}
