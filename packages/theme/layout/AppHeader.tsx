'use client';

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { AppLogo } from "./AppLogo";
import { Breadcrumbs, BreadcrumbItem } from "./AppBreadcrumbs";
import { Icon } from "../components/Icon";
import { useLayout } from "../context/LayoutContext";
import { cn } from "../tools";
import { Button } from "../components";
import { generateBreadcrumbs, BreadcrumbConfig } from "./breadcrumb-utils";

export interface AppHeaderProps {
    className?: string;
    siteName?: string;
    breadcrumbs?: BreadcrumbItem[];
    breadcrumbConfig?: BreadcrumbConfig;
    autoBreadcrumbs?: boolean;
    children?: ReactNode;
}

export function AppHeader({
    className,
    siteName,
    breadcrumbs,
    breadcrumbConfig,
    autoBreadcrumbs = true,
    children
}: AppHeaderProps) {
    const { hasSidebar, isSidebarOpen, toggleSidebar } = useLayout();
    const pathname = usePathname();

    const generatedBreadcrumbs = useMemo(() => {
        if (!autoBreadcrumbs || breadcrumbs) return breadcrumbs;

        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0) return undefined;

        return generateBreadcrumbs(segments, breadcrumbConfig);
    }, [pathname, autoBreadcrumbs, breadcrumbs, breadcrumbConfig]);

    return (
        <header className={cn("sticky top-0 z-90 bg-base border-b border-outline", className)}>
            {/* Main Row - Always Visible */}
            <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
                <AppLogo siteName={siteName} />
                <div className="flex items-center justify-end">
                    {children}
                </div>
            </div>

            {/* Secondary Row - Mobile Only (hidden on lg+) */}
            {hasSidebar && (
                <div className="flex items-center gap-3 h-12 px-4 border-t border-outline lg:hidden sm:px-6 lg:px-8">
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

                    {/* Breadcrumbs */}
                    {generatedBreadcrumbs && generatedBreadcrumbs.length > 0 && (
                        <Breadcrumbs items={generatedBreadcrumbs} />
                    )}
                </div>
            )}
        </header>
    );
}

export type { BreadcrumbItem };