'use client';

import { PropsWithChildren } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { LayoutProvider } from "../context/LayoutContext";

export function AppFrame({ children }: PropsWithChildren) {
    return (
        <ThemeProvider>
            <LayoutProvider>
                <div className="flex min-h-screen flex-col">
                    {children}
                </div>
            </LayoutProvider>
        </ThemeProvider>
    );
}