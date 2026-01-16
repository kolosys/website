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
      info: "bg-primary-100 border border-primary-200 text-primary-900",
      success: "bg-success-100 border border-success-200 text-success-900",
      warning: "bg-accent-100 border border-accent-200 text-accent-900",
      error: "bg-error-100 border border-error-200 text-error-900",
    };

    const iconStyles = {
      info: "text-primary-600",
      success: "text-success-600",
      warning: "text-accent-600",
      error: "text-error-600",
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

