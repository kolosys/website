import { Suspense } from "react";
import { PageHeader } from "@kolosys-sites/theme";
import { EmptyState } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { getProjects } from "@/app/actions/projects";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectFilters } from "./components/ProjectFilters";
import { ImportProjectButton } from "./components/ImportProjectModal";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; search?: string }>;
}) {
  const params = await searchParams;

  const filters: {
    published?: boolean;
    featured?: boolean;
    search?: string;
  } = {};

  if (params.filter === "published") {
    filters.published = true;
  } else if (params.filter === "featured") {
    filters.featured = true;
  }

  if (params.search) {
    filters.search = params.search;
  }

  const result = await getProjects(filters);

  if (!result.success) {
    return (
      <div className="p-6">
        <div className="bg-error-50 text-error-600 p-4 rounded">
          {result.error || "Failed to load projects"}
        </div>
      </div>
    );
  }

  const projects = (result.data || []) as Array<{
    id: string;
    slug: string;
    name: string;
    description: string | null;
    emoji: string | null;
    published: boolean;
    featured: boolean;
    _count?: {
      sources: number;
      versions: number;
    };
  }>;

  return (
    <div className="p-6">
      <PageHeader
        title="Projects"
        description="Manage documentation projects and sources"
        action={<ImportProjectButton />}
      />

      <Suspense fallback={<div className="h-16" />}>
        <ProjectFilters />
      </Suspense>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Icon emoji="📦" size="lg" />}
          title="No projects yet"
          description={
            params.search || params.filter
              ? "No projects match your filters"
              : "Create your first project to get started"
          }
          action={!params.search && !params.filter ? <ImportProjectButton /> : undefined}
        />
      )}
    </div>
  );
}
