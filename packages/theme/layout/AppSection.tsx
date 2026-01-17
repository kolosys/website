import { PropsWithChildren } from "react";
import { cn } from "../tools";

type Props = {
    id?: string;
    className?: string;
    elevated?: boolean;
}

export function AppSection({ id, className, elevated, children }: PropsWithChildren<Props>) {
    return (
        <section id={id} className={cn("py-8 px-6", elevated ? "bg-subtle" : "", className)}>
            {children}
        </section>
    )
}