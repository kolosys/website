import { Suspense } from "react";
import { getRepositories } from "@/app/actions/repositories";
import { getRepositoryContent } from "@/app/actions/content";
import type { ContentGroup } from "@/lib/content";
import ContentManagementClient from "./components/ContentManagementClient";

type Props = {
  searchParams: Promise<{ repo?: string }>;
};

export default async function ContentManagementPage({ searchParams }: Props) {
  const { repo } = await searchParams;

  const reposResult = await getRepositories();
  const repositories = reposResult.success ? reposResult.repositories : [];
  const repositoryOptions = repositories.map((repo) => ({
    id: repo.id,
    name: repo.name,
  }));

  const selectedRepositoryId = repo || repositories[0]?.id || null;

  let initialContent: ContentGroup[] = [];
  if (selectedRepositoryId) {
    const contentResult = await getRepositoryContent(selectedRepositoryId);
    if (contentResult.success) {
      initialContent = contentResult.content;
    }
  }

  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ContentManagementClient
        repositories={repositoryOptions}
        initialContent={initialContent}
        initialRepositoryId={selectedRepositoryId}
      />
    </Suspense>
  );
}
