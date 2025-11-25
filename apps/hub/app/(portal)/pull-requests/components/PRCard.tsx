'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCodeMerge,
  faCircleXmark,
  faUser,
  faClock,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/components/ui/Badge';
import { Label } from '@/components/ui/Label';

type PullRequest = {
  id: number;
  number: number;
  title: string;
  repository: string;
  author: string;
  createdAt: string;
  comments: number;
  labels: string[];
  status: 'open' | 'merged' | 'closed';
  additions: number;
  deletions: number;
  files: number;
  approvals: number;
};

type PRCardProps = {
  pr: PullRequest;
};

const statusVariantMap = {
  open: 'success' as const,
  merged: 'info' as const,
  closed: 'danger' as const,
};

const statusLabelMap = {
  open: 'OPEN',
  merged: 'MERGED',
  closed: 'CLOSED',
};

export function PRCard({ pr }: PRCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm-md transition-shadow-sm cursor-pointer">
      <div className="flex items-start justify-between">
        {/* PR Content */}
        <div className="flex items-start space-x-3 flex-1">
          {/* Status Icon */}
          <div className="mt-1">
            {pr.status === 'open' && (
              <FontAwesomeIcon icon={faCalendarDays} className="w-5 h-5 text-green-500" />
            )}
            {pr.status === 'merged' && (
              <FontAwesomeIcon icon={faCodeMerge} className="w-5 h-5 text-purple-500" />
            )}
            {pr.status === 'closed' && (
              <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5 text-red-500" />
            )}
          </div>

          {/* PR Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{pr.title}</h3>

            <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
              <span className="font-medium">#{pr.number}</span>
              <span>•</span>
              <span>{pr.repository}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span>{pr.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                <span>{pr.createdAt}</span>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Labels */}
              <div className="flex flex-wrap gap-2">
                {pr.labels.map((label) => (
                  <Label key={label}>{label}</Label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status, Stats & Comments */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Status Badge */}
          <Badge variant={statusVariantMap[pr.status]}>
            {statusLabelMap[pr.status]}
          </Badge>

          {/* File Changes */}
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <FontAwesomeIcon icon={faComment} className="w-4 h-4" />
              <span className="font-medium">{pr.comments}</span>
            </div>
            <span className="text-green-600 font-medium">+{pr.additions}</span>
            <span className="text-red-600 font-medium">-{pr.deletions}</span>
            <span className="text-gray-500">{pr.files} files</span>
          </div>
        </div>
      </div>
    </div>
  );
}

