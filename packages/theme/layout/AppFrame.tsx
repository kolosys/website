'use client';

import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { LayoutProvider } from "../context/LayoutContext";
import { NavigationLoadingProvider } from "../context/NavigationLoadingContext";
import { NavigationProgressBar } from "../components/NavigationProgressBar";

export function AppFrame({ children }: PropsWithChildren) {
    return (
        <ThemeProvider
            attribute="data-theme"
            storageKey="theme"
            defaultTheme="system"
            enableSystem={true}
        >
            <LayoutProvider>
                <NavigationLoadingProvider>
                    <NavigationProgressBar />
                    <div className="flex min-h-screen flex-col overflow-x-clip">
                        {children}
                    </div>
                </NavigationLoadingProvider>
            </LayoutProvider>
        </ThemeProvider>
    );
}