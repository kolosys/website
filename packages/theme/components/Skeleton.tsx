import { forwardRef, PropsWithChildren } from "react";
import { cn } from "../tools";

export type SkeletonSegmentProps = {
    className?: string;
    elevated?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
}

export const SkeletonBar = forwardRef<HTMLDivElement, SkeletonSegmentProps>(({ className, elevated = false, ...props }, ref) => {
    const baseStyles = "block animate-pulse rounded-lg w-full h-4";
    const elevatedStyles = elevated ? "bg-subtle/70" : "bg-surface";
    const classes = cn(baseStyles, elevatedStyles, className);
    return (
        <div ref={ref} className={classes} {...props} />
    )
});

SkeletonBar.displayName = "SkeletonBar";

export const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonSegmentProps>(({ className, elevated = false, size = "md", ...props }, ref) => {
    const sizes = {
        sm: `size-6`,
        md: `size-10`,
        lg: `size-14`,
        xl: `size-18`,
    }
    const baseStyles = `block animate-pulse rounded-full shrink-0`;
    const elevatedStyles = elevated ? "bg-subtle/70" : "bg-surface";
    const classes = cn(baseStyles, sizes[size], elevatedStyles, className);
    return (
        <div ref={ref} className={classes} {...props} />
    )
});

SkeletonCircle.displayName = "SkeletonCircle";

type SkeletonGroupProps = PropsWithChildren<{ className?: string; type?: "row" | "column" }>;

export const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(({ className, children, type = "column", ...props }, ref) => {
    const baseStyles = "flex gap-2 w-full";
    const rowStyles = "flex-row";
    const columnStyles = "flex-col";
    const classes = cn(baseStyles, type === "row" ? rowStyles : columnStyles, className);
    return (
        <div ref={ref} className={classes} {...props}>
            {children}
        </div>
    )
});

SkeletonGroup.displayName = "SkeletonGroup";
