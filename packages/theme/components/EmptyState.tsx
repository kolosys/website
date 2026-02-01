import React, { ReactNode } from 'react';
import { cn } from '../tools';

export interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center',
          'bg-panel border border-strong rounded-lg p-8 text-center',
          className
        )}
      >
        {icon && <div className="mb-4">{icon}</div>}
        {title && <h3>{title}</h3>}
        <p className="text-neutral-600">{description}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
