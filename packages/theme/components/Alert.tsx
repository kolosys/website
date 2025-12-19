import React, { ReactNode } from "react";
import { cn } from "../tools";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "info", title, icon, action, children, ...props }, ref) => {
    const baseStyles = "flex items-center gap-3 border rounded-lg p-4";

    const variantStyles = {
      info: "bg-blue-50 border border-blue-200 text-blue-800",
      success: "bg-green-50 border border-green-200 text-green-800",
      warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
      error: "bg-red-50 border border-red-200 text-red-800",
    };

    const iconStyles = {
      info: "text-blue-600",
      success: "text-green-600",
      warning: "text-yellow-600",
      error: "text-red-600",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        role="alert"
        {...props}
      >
        {icon && <span className={cn(iconStyles[variant])}>{icon}</span>}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold">{title}</div>
          )}
          <div>{children}</div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);

Alert.displayName = "Alert";

