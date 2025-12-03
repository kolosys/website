import { Suspense } from 'react';
import { RepositoryCard } from './components/RepositoryCard';
import { getRepositories } from '@/app/actions/repositories';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function RepositoriesList() {
  const result = await getRepositories();

  // Log result for debugging
  if (!result.success) {
    console.error("[RepositoriesPage] getRepositories failed:", result.error, result.message);
  }

  const repositories = result.success ? result.repositories ?? [] : [];

  // Sort repositories: featured first, then by updatedAt descending
  const sortedRepositories = [...repositories].sort((a, b) => {
    // Featured repos come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Within featured/non-featured groups, sort by updatedAt descending
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (sortedRepositories.length === 0) {
    return (
      <EmptyState
        title="No repositories tracked yet"
        description={result.success
          ? "Add a repository to start syncing documentation."
          : `Error loading repositories: ${result.error || result.message || "Unknown error"}`}
      />
    );
  }

  return (
    <div className="space-y-4">
      {sortedRepositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}

export default async function RepositoriesPage({ searchParams }: Props) {
  // Await searchParams to make the page dynamic (even though we don't use it)
  await searchParams;

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <PageHeader
        title="Repositories"
        description="Manage GitHub repositories synced to your documentation platform. Configure sync settings, organize content, and monitor sync status."
      />

      <Suspense fallback={<div className="p-8">Loading repositories...</div>}>
        <RepositoriesList />
      </Suspense>
    </div>
  );
}
