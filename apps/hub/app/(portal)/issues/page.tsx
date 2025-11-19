'use client';

import { Tabs } from '@/components/ui/Tabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { IssueCard } from '@/components/ui/IssueCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

const MOCK_ISSUES = [
  {
    id: 42,
    title: 'Documentation for SST Ion deployment is unclear',
    repository: 'sst/ion',
    author: 'developer123',
    createdAt: '2 days ago',
    comments: 8,
    labels: ['documentation', 'bug'],
    priority: 'HIGH',
    status: 'open',
  },
  {
    id: 38,
    title: 'Add examples for Next.js 15 integration',
    repository: 'sst/ion',
    author: 'nextjs-dev',
    createdAt: '5 days ago',
    comments: 3,
    labels: ['enhancement', 'examples'],
    priority: 'MEDIUM',
    status: 'open',
  },
  {
    id: 35,
    title: 'Fix broken links in API reference',
    repository: 'sst/ion',
    author: 'contributor42',
    createdAt: '1 week ago',
    comments: 12,
    labels: ['documentation', 'fixed'],
    priority: 'LOW',
    status: 'closed',
  },
  {
    id: 29,
    title: 'Improve error messages in CLI',
    repository: 'openai/openai-node',
    author: 'cli-user',
    createdAt: '3 days ago',
    comments: 5,
    labels: ['cli', 'enhancement'],
    priority: 'MEDIUM',
    status: 'open',
  },
  {
    id: 24,
    title: 'TypeScript types are incomplete',
    repository: 'openai/openai-node',
    author: 'ts-developer',
    createdAt: '1 day ago',
    comments: 15,
    labels: ['typescript', 'bug'],
    priority: 'HIGH',
    status: 'open',
  },
];

export default function IssuesPage() {
  const openIssues = MOCK_ISSUES.filter(i => i.status === 'open');
  const closedIssues = MOCK_ISSUES.filter(i => i.status === 'closed');
  const openCount = openIssues.length;
  const closedCount = closedIssues.length;


  return (
    <div className="space-y-6">
      <PageHeader
        title="Issues"
        description="Track and manage issues from your synced GitHub repositories. Monitor bug reports, feature requests, and documentation improvements."
      />

      {/* Filter Tabs */}
      <Tabs
        variant="underline"
        tabs={[
          {
            label: `All Issues (${MOCK_ISSUES.length})`,
            content: <div className="space-y-3">{MOCK_ISSUES.map((issue) => <IssueCard key={issue.id} issue={issue} />)}</div>,
          },
          {
            label: (
              <span className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4" />
                <span>Open ({openCount})</span>
              </span>
            ),
            content: <div className="space-y-3">{openIssues.map((issue) => <IssueCard key={issue.id} issue={issue} />)}</div>,
          },
          {
            label: (
              <span className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
                <span>Closed ({closedCount})</span>
              </span>
            ),
            content: <div className="space-y-3">{closedIssues.map((issue) => <IssueCard key={issue.id} issue={issue} />)}</div>,
          },
        ]}
      />
    </div>
  );
}

