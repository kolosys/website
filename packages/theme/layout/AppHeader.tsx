'use client';

import { ReactNode, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppLogo } from "./AppLogo";
import { Breadcrumbs, BreadcrumbItem, AutoBreadcrumbs } from "./AppBreadcrumbs";
import { Icon } from "../components/Icon";
import { useLayout } from "../context/LayoutContext";
import { cn } from "../tools";
import { Button } from "../components";
import { BreadcrumbConfig, generateBreadcrumbs } from "./breadcrumb-utils";

export interface AppHeaderProps {
    className?: string;
    siteName?: string;
    breadcrumbConfig?: BreadcrumbConfig;
    children?: ReactNode;
    persistent?: boolean;
}

export function AppHeader({
    className,
    siteName,
    breadcrumbConfig,
    persistent = false,
    children,
}: AppHeaderProps) {
    const { hasSidebar, isSidebarOpen, toggleSidebar } = useLayout();

    return (
        <header className={cn("sticky top-0 z-90 bg-base border-b border-outline", className)}>
            {/* Main Row - Always Visible */}
            <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
                <AppLogo siteName={siteName} />
                <div className="flex items-center justify-end">
                    {children}
                </div>
            </div>

            {/* Secondary Row - Visible up to md, hidden on lg+ */}
            {(hasSidebar || persistent) && (
                <div className={cn(
                    "flex items-center gap-3 h-12 px-4 border-t border-outline sm:px-6 lg:px-8",
                    !persistent && "lg:hidden"
                )}>
                    {/* Hamburger Button - Only if sidebar exists */}
                    {hasSidebar && (
                        <Button
                            variant="ghost"
                            size="xs"
                            onClick={toggleSidebar}
                            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                            aria-expanded={isSidebarOpen}
                            aria-controls="mobile-sidebar"
                            className="p-2"
                        >
                            <Icon name={isSidebarOpen ? "x" : "menu"} size="sm" className="mt-0.5" />
                        </Button>
                    )}
                    <AutoBreadcrumbs config={breadcrumbConfig} />
                </div>
            )}
        </header>
    );
}

export type { BreadcrumbItem };