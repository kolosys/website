'use client';

import { Badge, BadgeProps, Icon } from '@kolosys-sites/theme';
import { Label } from './Label';

type Issue = {
  id: number;
  title: string;
  repository: string;
  author: string;
  createdAt: string;
  comments: number;
  labels: string[];
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'open' | 'closed';
};

type IssueCardProps = {
  issue: Issue;
};

const priorityVariantMap: Record<string, BadgeProps['variant']> = {
  HIGH: 'error' as const,
  MEDIUM: 'warning' as const,
  LOW: 'info' as const,
};

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm-md transition-shadow-sm cursor-pointer">
      <div className="flex items-start justify-between">
        {/* Issue Content */}
        <div className="flex items-start space-x-3 flex-1">
          {/* Status Icon */}
          <div className="mt-1">
            {issue.status === 'open' ? (
              <Icon name="info-circle" pack="basic" size="md" className="text-green-500" />
            ) : (
              <Icon name="check-circle" pack="basic" size="md" className="text-purple-500" />
            )}
          </div>

          {/* Issue Details */}
          <div className="flex-1 min-w-0">
            <h3 className="mb-2">{issue.title}</h3>

            <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
              <span className="font-medium">#{issue.id}</span>
              <span>•</span>
              <span>{issue.repository}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Icon name="user" pack="basic" size="sm" />
                <span>{issue.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Icon name="clock" pack="basic" size="sm" />
                <span>{issue.createdAt}</span>
              </span>
            </div>

            {/* Labels */}
            <div className="flex flex-wrap gap-2">
              {issue.labels.map((label) => (
                <Label key={label}>{label}</Label>
              ))}
            </div>
          </div>
        </div>

        {/* Priority & Comments */}
        <div className="flex items-center space-x-3 ml-4">
          <Badge variant={priorityVariantMap[issue.priority]}>
            {issue.priority}
          </Badge>

          <div className="flex items-center space-x-1 text-gray-600">
            <Icon name="message" pack="basic" size="md" />
            <span className="text-sm font-medium">{issue.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

