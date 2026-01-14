import React from 'react';
import { Badge } from './Badge';

export interface VersionBadgeProps {
  version: string;
  className?: string;
}

export const VersionBadge = React.forwardRef<HTMLSpanElement, VersionBadgeProps>(
  ({ version, className }, ref) => {
    return (
      <Badge ref={ref} variant="default" size="sm" className={className}>
        {version}
      </Badge>
    );
  }
);

VersionBadge.displayName = 'VersionBadge';
