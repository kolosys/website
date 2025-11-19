'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faCircleCheck,
  faUser,
  faClock,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { Badge } from './Badge';
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

const priorityVariantMap = {
  HIGH: 'danger' as const,
  MEDIUM: 'warning' as const,
  LOW: 'info' as const,
};

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        {/* Issue Content */}
        <div className="flex items-start space-x-3 flex-1">
          {/* Status Icon */}
          <div className="mt-1">
            {issue.status === 'open' ? (
              <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5 text-green-500" />
            ) : (
              <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5 text-purple-500" />
            )}
          </div>

          {/* Issue Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
              <span className="font-medium">#{issue.id}</span>
              <span>•</span>
              <span>{issue.repository}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span>{issue.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
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
            <FontAwesomeIcon icon={faComment} className="w-5 h-5" />
            <span className="text-sm font-medium">{issue.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

