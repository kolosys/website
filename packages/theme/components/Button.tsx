import React from "react";
import { Button as HeadlessButton, ButtonProps as HeadlessButtonProps } from '@headlessui/react'
import { cn } from "../tools";

export type ButtonProps = HeadlessButtonProps & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "flex items-center gap-1.5 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-100",
      outline: "text-gray-900 bg-transparent border border-gray-300 hover:bg-gray-900/10 focus:ring-gray-900/10",
      ghost: "text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm font-medium",
      md: "px-4 py-2 text-base font-medium",
      lg: "px-6 py-3 text-lg font-medium",
    };

    return (
      <HeadlessButton
        ref={ref}
        as={props.href ? "a" : "button"}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        href={props.href}
        target={props.target}
        rel={props.rel}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

