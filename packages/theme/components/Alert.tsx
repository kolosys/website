import React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "info", title, children, ...props }, ref) => {
    const baseStyles = "rounded-lg p-4";
    
    const variantStyles = {
      info: "bg-blue-50 border border-blue-200 text-blue-800",
      success: "bg-green-50 border border-green-200 text-green-800",
      warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
      error: "bg-red-50 border border-red-200 text-red-800",
    };
    
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        role="alert"
        {...props}
      >
        {title && (
          <div className="font-semibold mb-1">{title}</div>
        )}
        <div>{children}</div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

