'use client';

import { PropsWithChildren, useEffect } from "react";
import { useLayout } from "../context/LayoutContext";
import { cn } from "../tools";

export interface AppSidebarProps {
    className?: string;
    sticky?: boolean;
}

export function AppSidebar({ children, className, sticky = false }: PropsWithChildren<AppSidebarProps>) {
    const { isSidebarOpen, setSidebarPresence, closeSidebar } = useLayout();

    useEffect(() => {
        setSidebarPresence(true);
        return () => setSidebarPresence(false);
    }, [setSidebarPresence]);

    return (
        <>
            {/* Desktop Sidebar - Always visible on lg+ */}
            <aside className={cn(
                "hidden lg:flex w-64 flex-col border-r border-subtle bg-page",
                sticky ? "sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto" : "overflow-y-auto",
                className
            )}>
                {children}
            </aside>

            {/* Mobile Sidebar - Overlay with backdrop */}
            <>
                {/* Backdrop */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={closeSidebar}
                        aria-hidden="true"
                    />
                )}

                {/* Slide-in Sidebar */}
                <aside
                    id="mobile-sidebar"
                    aria-hidden={!isSidebarOpen}
                    className={cn(
                        "fixed top-[104px] left-0 bottom-0 w-64 bg-page z-50 lg:hidden",
                        "transform transition-transform duration-300 ease-in-out",
                        "border-r border-subtle overflow-y-auto",
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                        className
                    )}
                >
                    {children}
                </aside>
            </>
        </>
    );
}