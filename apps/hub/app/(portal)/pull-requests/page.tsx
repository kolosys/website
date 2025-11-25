'use client';

import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCodeMerge,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

const MOCK_PRS = [
  {
    id: 15,
    number: 15,
    title: 'Add comprehensive examples for AWS Lambda integration',
    repository: 'sst/ion',
    author: 'docs-contributor',
    createdAt: '1 day ago',
    comments: 12,
    labels: ['documentation', 'examples'],
    status: 'open',
    additions: 324,
    deletions: 45,
    files: 8,
    approvals: 6,
  },
  {
    id: 15,
    number: 15,
    title: 'Update API reference with new SDK methods',
    repository: 'sst/ion',
    author: 'maintainer',
    createdAt: '3 days ago',
    comments: 7,
    labels: ['documentation', 'api'],
    status: 'merged',
    additions: 156,
    deletions: 23,
    files: 4,
    approvals: 4,
  },
  {
    id: 15,
    number: 15,
    title: 'Fix typos in getting started guide',
    repository: 'sst/ion',
    author: 'community-member',
    createdAt: '5 days ago',
    comments: 2,
    labels: ['documentation', 'typo'],
    status: 'merged',
    additions: 12,
    deletions: 12,
    files: 2,
    approvals: 2,
  },
  {
    id: 14,
    number: 14,
    title: 'Add migration guide from v2 to v3',
    repository: 'openai/openai-node',
    author: 'core-team',
    createdAt: '2 days ago',
    comments: 18,
    labels: ['documentation', 'migration'],
    status: 'open',
    additions: 892,
    deletions: 156,
    files: 12,
    approvals: 8,
  },
  {
    id: 14,
    number: 14,
    title: 'Improve code examples formatting',
    repository: 'openai/openai-node',
    author: 'contributor',
    createdAt: '1 week ago',
    comments: 5,
    labels: ['documentation', 'formatting'],
    status: 'closed',
    additions: 45,
    deletions: 67,
    files: 6,
    approvals: 5,
  },
  {
    id: 14,
    number: 14,
    title: 'Add TypeScript examples to all endpoints',
    repository: 'openai/openai-node',
    author: 'typescript-advocate',
    createdAt: '4 days ago',
    comments: 9,
    labels: ['documentation', 'typescript'],
    status: 'open',
    additions: 567,
    deletions: 89,
    files: 15,
    approvals: 3,
  },
];

export default function PullRequestsPage() {
  const openPRs = MOCK_PRS.filter(pr => pr.status === 'open');
  const mergedPRs = MOCK_PRS.filter(pr => pr.status === 'merged');
  const closedPRs = MOCK_PRS.filter(pr => pr.status === 'closed');

  const openCount = openPRs.length;
  const mergedCount = mergedPRs.length;
  const closedCount = closedPRs.length;


  return (
    <div className="space-y-6">
      <PageHeader
        title="Pull Requests"
        description="Review and manage pull requests from your synced GitHub repositories. Track documentation updates, code changes, and community contributions."
      />

      {/* Filter Tabs */}
      <Tabs
        variant="underline"
        tabs={[
          {
            label: `All PRs (${MOCK_PRS.length})`,
            content: null,//<div className="space-y-3">{MOCK_PRS.map((pr, index) => <PRCard key={`${pr.id}-${index}`} pr={pr} />)}</div>,
          },
          {
            label: (
              <span className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4" />
                <span>Open ({openCount})</span>
              </span>
            ),
            content: null,//<div className="space-y-3">{openPRs.map((pr, index) => <PRCard key={`${pr.id}-${index}`} pr={pr} />)}</div>,
          },
          {
            label: (
              <span className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCodeMerge} className="w-4 h-4" />
                <span>Merged ({mergedCount})</span>
              </span>
            ),
            content: null,//<div className="space-y-3">{mergedPRs.map((pr, index) => <PRCard key={`${pr.id}-${index}`} pr={pr} />)}</div>,
          },
          {
            label: (
              <span className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCircleXmark} className="w-4 h-4" />
                <span>Closed ({closedCount})</span>
              </span>
            ),
            content: null,//<div className="space-y-3">{closedPRs.map((pr, index) => <PRCard key={`${pr.id}-${index}`} pr={pr} />)}</div>,
          },
        ]}
      />
    </div>
  );
}

