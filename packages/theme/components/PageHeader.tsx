import React, { ReactNode } from 'react';
import { cn } from '../tools';

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, action, className }, ref) => {
    return (
      <div ref={ref} className={className}>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="mb-0">{title}</h1>
            {description && (
              <p className="text-neutral-600 mt-2 mb-0">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
