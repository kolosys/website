import { ReactNode } from "react";

type EmptyStateProps = {
  title?: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-8 text-center ${className}`}
    >
      {icon && <div className="mb-4">{icon}</div>}
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      )}
      <p className="text-gray-600 mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

