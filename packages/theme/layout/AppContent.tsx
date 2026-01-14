import { PropsWithChildren } from "react";

export function AppContent({ children }: PropsWithChildren) {
    return (
        <main className="flex-1 overflow-y-auto bg-page">
            {children}
        </main>
    )
}