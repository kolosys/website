import { PropsWithChildren } from "react";

export function AppContent({ children }: PropsWithChildren) {
    return (
        <main className="flex-1 bg-page">
            {children}
        </main>
    )
}