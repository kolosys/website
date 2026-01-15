import React from "react";
import { Button as HeadlessButton, ButtonProps as HeadlessButtonProps } from '@headlessui/react'
import { cn } from "../tools";
import Link from "next/link";

export type ButtonProps = HeadlessButtonProps & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  href?: string;
  target?: string;
  rel?: string;
  isActive?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isActive = false, href, target, rel, children, ...props }, ref) => {
    const baseStyles = "flex items-center gap-1.5 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary: "bg-primary-600 text-white hover:bg-primary-700",
      secondary: "bg-neutral-200 text-foreground hover:bg-neutral-300",
      outline: "text-foreground bg-transparent border border-border hover:bg-neutral-50",
      ghost: "text-foreground hover:bg-neutral-100",
    };

    const sizeStyles = {
      xs: "p-1 text-sm/8 font-medium",
      sm: "px-3 py-1.5 text-sm font-medium",
      md: "px-4 py-2 text-base font-medium",
      lg: "px-6 py-3 text-lg font-medium",
      xl: "px-8 py-3 text-xl font-medium",
    };

    const activeStyles = isActive ? {
      primary: "bg-primary-700",
      secondary: "bg-neutral-300",
      outline: "border-primary-600 bg-primary-50 text-primary-700",
      ghost: "bg-primary-950 text-primary-50",
    } : {};

    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], activeStyles[variant], className);

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={classes}
          ref={ref as any}
        >
          {typeof children === 'function' ? children({} as any) : children}
        </Link>
      );
    }

    return (
      <HeadlessButton
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </HeadlessButton>
    );
  }
);

Button.displayName = "Button";

