import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRepositorySyncLogs } from '@/app/actions/repositories';
import { PageHeader, Icon } from '@kolosys-sites/theme';
import { LoadingState } from '@/components/ui/LoadingState';
import SyncLogsTable from './components/SyncLogsTable';

type Props = {
  params: Promise<{ id: string }>;
};

async function SyncLogsContent({ repositoryId }: { repositoryId: string }) {
  const result = await getRepositorySyncLogs(repositoryId);

  if (!result.success) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          {result.error || 'Failed to load sync logs'}
        </p>
        {result.message && (
          <p className="text-red-600 text-sm mt-1">{result.message}</p>
        )}
      </div>
    );
  }

  if (!result.data) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No sync logs found for this repository.</p>
      </div>
    );
  }

  return (
    <SyncLogsTable
      repository={result.data.repository}
      logs={result.data.logs}
    />
  );
}

export default async function RepositoryLogsPage({ params }: Props) {
  const { id } = await params;

  // Verify repository exists
  const result = await getRepositorySyncLogs(id, 1);
  if (!result.success || !result.data) {
    notFound();
  }

  const repository = result.data.repository;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link
          href="/repositories"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Icon name="arrow-left" pack="basic" size="sm" />
          Back to Repositories
        </Link>
      </div>

      <PageHeader
        title={`Sync Logs - ${repository.name}`}
        description={`View synchronization logs for ${repository.fullName}`}
      />

      <Suspense fallback={<LoadingState message="Loading sync logs..." />}>
        <SyncLogsContent repositoryId={id} />
      </Suspense>
    </div>
  );
}
