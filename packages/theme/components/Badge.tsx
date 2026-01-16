import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center font-medium rounded-full";

    const variantStyles = {
      default: "bg-neutral-100 text-neutral-800 border border-strong",
      success: "bg-success-100 text-success-800",
      warning: "bg-accent-100 text-accent-800",
      error: "bg-error-100 text-error-800",
      info: "bg-primary-100 text-primary-800",
      neutral: "bg-neutral-100 text-neutral-800",
    };

    const sizeStyles = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

