import { notFound } from "next/navigation";
import { PageHeader } from "@kolosys-sites/theme";
import { Button, Icon } from "@kolosys-sites/theme";
import { getProjectBySlug } from "@/app/actions/projects";
import { getProjectNavigation } from "@/app/actions/navigation";
import { NavigationTree } from "./components/NavigationTree";
import { NavigationPreview } from "./components/NavigationPreview";

export default async function NavigationPage({
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
    emoji: string | null;
  };

  const navResult = await getProjectNavigation(project.id);
  const navData = navResult.success && navResult.data ? navResult.data : [];

  return (
    <div className="p-6">
      <PageHeader
        title="Navigation Structure"
        description={`Configure navigation for ${project.name}`}
        action={
          <Button
            variant="outline"
            size="sm"
            href={`/v2/projects/${project.slug}`}
          >
            <Icon name="arrow-left" pack="basic" size="sm" />
            Back to Project
          </Button>
        }
      />

      <NavigationTree projectId={project.id} initialData={navData} />
    </div>
  );
}
