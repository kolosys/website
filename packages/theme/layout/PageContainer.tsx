import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../tools";

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export const PageContainer = forwardRef<HTMLDivElement, Props>(({ children, className, ...props }, ref) => {
    return (
        <div ref={ref} {...props} className={cn("flex flex-1", className)}>
            {children}
        </div>
    )
})