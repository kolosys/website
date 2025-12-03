import { RepositoryCard } from './components/RepositoryCard';
import { getRepositories } from '@/app/actions/repositories';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function RepositoriesPage() {
  const result = await getRepositories();
  const repositories = result.success ? result.repositories ?? [] : [];

  // Sort repositories: featured first, then by updatedAt descending
  const sortedRepositories = [...repositories].sort((a, b) => {
    // Featured repos come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // Within featured/non-featured groups, sort by updatedAt descending
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="space-y-6" suppressHydrationWarning >
      <PageHeader
        title="Repositories"
        description="Manage GitHub repositories synced to your documentation platform. Configure sync settings, organize content, and monitor sync status."
      />

      {/* Repository List */}
      {sortedRepositories.length === 0 ? (
        <EmptyState
          title="No repositories tracked yet"
          description="Add a repository to start syncing documentation."
        />
      ) : (
        <div className="space-y-4">
          {sortedRepositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
