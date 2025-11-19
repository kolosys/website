type StatusBadgeProps = {
  status: "active" | "syncing" | "published" | "hidden";
  className?: string;
};

const statusConfig = {
  active: {
    label: "✓ Active",
    className: "bg-green-100 text-green-800",
  },
  syncing: {
    label: "🔄 Syncing",
    className: "bg-blue-100 text-blue-800",
  },
  published: {
    label: "Published",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  hidden: {
    label: "Hidden",
    className: "bg-gray-100 text-gray-600 border border-gray-300",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}

