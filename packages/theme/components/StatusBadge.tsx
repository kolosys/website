import React from 'react';
import { cn } from '../tools';

export type LibraryStatus = 'Stable' | 'Beta' | 'Alpha' | 'Experimental' | 'Release Candidate' | 'Unknown';
export type RepoStatus = 'active' | 'syncing' | 'published' | 'hidden' | 'featured';

export interface StatusBadgeProps {
  status: LibraryStatus | RepoStatus;
  showIcon?: boolean;
  className?: string;
}

const statusConfig: Record<LibraryStatus | RepoStatus, { color: string; icon: string | null; label?: string }> = {
  // Library statuses (docs)
  'Stable': { color: 'bg-success-100 text-success-800', icon: null },
  'Beta': { color: 'bg-primary-100 text-primary-800', icon: null },
  'Alpha': { color: 'bg-yellow-100 text-yellow-800', icon: null },
  'Experimental': { color: 'bg-accent-100 text-accent-800', icon: null },
  'Release Candidate': { color: 'bg-purple-100 text-purple-800', icon: null },
  'Unknown': { color: 'bg-neutral-100 text-neutral-800', icon: null },

  // Repo statuses (hub)
  'active': { color: 'bg-success-100 text-success-800', icon: '✓', label: 'Active' },
  'syncing': { color: 'bg-primary-100 text-primary-800', icon: '🔄', label: 'Syncing' },
  'published': { color: 'bg-primary-50 text-primary-700 border border-primary-200', icon: null, label: 'Published' },
  'hidden': { color: 'bg-neutral-100 text-neutral-600 border border-neutral-300', icon: null, label: 'Hidden' },
  'featured': { color: 'bg-yellow-50 text-yellow-800 border border-yellow-200', icon: '⭐', label: 'Featured' },
};

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, showIcon = true, className = '' }, ref) => {
    const config = statusConfig[status];
    const displayText = config.label || status;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          config.color,
          className
        )}
      >
        {showIcon && config.icon && `${config.icon} `}
        {displayText}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';
