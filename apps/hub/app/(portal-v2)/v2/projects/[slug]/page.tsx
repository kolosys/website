import { notFound } from "next/navigation";
import { AppSection, AutoBreadcrumbs, Breadcrumbs, PageHeader } from "@kolosys-sites/theme";
import { Button } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { getProjectBySlug } from "@/app/actions/projects";
import { ProjectTabs } from "./components/ProjectTabs";
import { SyncProjectButton } from "./components/SyncProjectButton";
import type { SourceProvider } from "@/prisma/client/enums";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data as {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    emoji: string | null;
    faIcon: string | null;
    published: boolean;
    featured: boolean;
    topics: string[];
    createdAt: Date;
    updatedAt: Date;
    sources: Array<{
      id: string;
      provider: SourceProvider;
      owner: string;
      repo: string;
      fullName: string;
      defaultBranch: string;
      docsPath: string;
      isPrimary: boolean;
      lastSyncedAt: Date | null;
    }>;
    versions: Array<{
      id: string;
      tag: string;
      isLatest: boolean;
      docsSynced: boolean;
      syncedAt: Date | null;
      fileCount: number;
      createdAt: Date;
    }>;
    _count: {
      sources: number;
      versions: number;
      navStructure: number;
    };
  };

  return (
    <AppSection>
      <PageHeader
        title={<><Icon emoji={project.emoji || "📦"} /> {project.name}</>}
        description={project.description}
        action={
          <div className="flex gap-2">
            <SyncProjectButton projectId={project.id} />
            <Button
              variant="outline"
              size="sm"
              href={`/v2/projects/${project.slug}/navigation`}
            >
              <Icon name="sitemap" pack="basic" size="sm" />
              Manage Navigation
            </Button>
            <Button variant="outline" size="sm" href="/v2/projects">
              <Icon name="arrow-left" pack="basic" size="sm" />
              Back to Projects
            </Button>
          </div>
        }
      />

      <ProjectTabs project={project} sources={project.sources} versions={project.versions} />
    </AppSection>
  );
}
