'use client';

import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { LayoutProvider } from "../context/LayoutContext";

export function AppFrame({ children }: PropsWithChildren) {
    return (
        <ThemeProvider
            attribute="data-theme"
            storageKey="theme"
            defaultTheme="system"
            enableSystem={true}
        >
            <LayoutProvider>
                <div className="flex min-h-screen flex-col">
                    {children}
                </div>
            </LayoutProvider>
        </ThemeProvider>
    );
}