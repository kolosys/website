'use client';

import { useState } from 'react';
import { Badge, Icon } from '@kolosys-sites/theme';
import type { SyncLog } from '@/prisma';

type SyncLogsTableProps = {
  repository: {
    id: string;
    name: string;
    fullName: string;
  };
  logs: SyncLog[];
};

type SyncLogMetadata = {
  repositoryName?: string;
  results?: Array<{
    status: string;
    syncType: string;
    recordsProcessed: number;
  }>;
  duration?: number;
};

function formatTimestamp(date: Date | null | undefined): string {
  if (!date) return '(NULL)';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  });
}

function formatDuration(ms: number | undefined): string {
  if (!ms) return 'N/A';
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="success" size="sm">
          <Icon name="check-circle" pack="basic" size="xs" className="mr-1" />
          Completed
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="error" size="sm">
          <Icon name="x-circle" pack="basic" size="xs" className="mr-1" />
          Failed
        </Badge>
      );
    case 'in_progress':
      return (
        <Badge variant="info" size="sm">
          <Icon name="loader-lines-alt" pack="basic" size="xs" className="mr-1 animate-spin" />
          In Progress
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="warning" size="sm">
          <Icon name="clock" pack="basic" size="xs" className="mr-1" />
          Pending
        </Badge>
      );
    default:
      return (
        <Badge variant="default" size="sm">
          {status}
        </Badge>
      );
  }
}

function SyncLogRow({ log }: { log: SyncLog }) {
  const [expanded, setExpanded] = useState(false);
  const metadata = log.metadata as SyncLogMetadata;

  return (
    <>
      <tr
        className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon
                name={expanded ? "chevron-down" : "chevron-right"}
                pack="basic"
                size="xs"
              />
            </button>
            <span className="text-sm font-mono text-gray-700">
              {log.id.substring(0, 8)}...
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="text-sm text-gray-700">{log.syncType}</span>
        </td>
        <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
        <td className="px-6 py-4">
          <span className="text-sm text-gray-700">
            {formatTimestamp(log.startedAt)}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="text-sm text-gray-700">
            {formatTimestamp(log.completedAt)}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="text-sm text-gray-700">
            {log.errorMessage || '(NULL)'}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="text-sm font-semibold text-gray-700">
            {log.recordsProcessed ?? 0}
          </span>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={7} className="px-6 py-4 bg-gray-50">
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-900 mb-2">
                  Metadata
                </h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {metadata.repositoryName && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Repository:
                      </span>
                      <span className="ml-2 text-sm text-gray-900">
                        {metadata.repositoryName}
                      </span>
                    </div>
                  )}
                  {metadata.duration !== undefined && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duration:
                      </span>
                      <span className="ml-2 text-sm text-gray-900">
                        {formatDuration(metadata.duration)}
                      </span>
                    </div>
                  )}
                  {metadata.results && metadata.results.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-2">
                        Sync Results:
                      </span>
                      <div className="space-y-2">
                        {metadata.results.map((result, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded border border-gray-200"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-gray-900">
                                {result.syncType.replace(/_/g, ' ')}
                              </span>
                              {getStatusBadge(result.status)}
                            </div>
                            <span className="text-sm text-gray-600">
                              {result.recordsProcessed} records
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {!metadata.results && !metadata.repositoryName && (
                    <pre className="text-xs text-gray-600 overflow-x-auto">
                      {JSON.stringify(metadata, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function SyncLogsTable({ repository, logs }: SyncLogsTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3>
              {repository.fullName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Total: {logs.length} log{logs.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sync Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Started At
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Completed At
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Error Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Records Processed
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No sync logs found
                </td>
              </tr>
            ) : (
              logs.map((log) => <SyncLogRow key={log.id} log={log} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
