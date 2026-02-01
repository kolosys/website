import { PropsWithChildren } from "react";

export function AppContent({ children }: PropsWithChildren) {
    return (
        <main className="flex-1 bg-base min-w-0 min-h-0">
            {children}
        </main>
    )
}