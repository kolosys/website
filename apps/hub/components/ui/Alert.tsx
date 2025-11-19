import { PropsWithChildren, ReactNode } from "react";

type AlertVariant = "warning" | "info" | "success" | "error";

type AlertProps = PropsWithChildren<{
  variant?: AlertVariant;
  icon?: ReactNode;
  title?: string;
  action?: ReactNode;
  className?: string;
}>;

const variantStyles: Record<AlertVariant, string> = {
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  info: "bg-blue-50 border-blue-200 text-blue-900",
  success: "bg-green-50 border-green-200 text-green-900",
  error: "bg-red-50 border-red-200 text-red-900",
};

const iconStyles: Record<AlertVariant, string> = {
  warning: "text-yellow-600",
  info: "text-blue-600",
  success: "text-green-600",
  error: "text-red-600",
};

export function Alert({
  variant = "info",
  icon,
  title,
  children,
  action,
  className = "",
}: AlertProps) {
  return (
    <div
      className={`flex items-center gap-3 border rounded-lg px-4 py-2 ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className={`text-lg ${iconStyles[variant]}`}>{icon}</span>}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-medium truncate mb-1">{title}</p>
        )}
        <div className="text-sm">{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

