import { RepositoryCard } from './components/RepositoryCard';
import { getRepositories } from '@/app/actions/repositories';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default async function RepositoriesPage() {
  const result = await getRepositories();
  const repositories = result.success ? result.repositories ?? [] : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Repositories"
        description="Manage GitHub repositories synced to your documentation platform. Configure sync settings, organize content, and monitor sync status."
      />

      {/* Repository List */}
      {repositories.length === 0 ? (
        <EmptyState
          title="No repositories tracked yet"
          description="Add a repository to start syncing documentation."
        />
      ) : (
        <div className="space-y-4">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
