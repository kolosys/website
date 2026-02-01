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
    breadcrumbs?: BreadcrumbItem[];
    breadcrumbConfig?: BreadcrumbConfig;
    autoBreadcrumbs?: boolean;
    children?: ReactNode;
    persistent?: boolean;
    showBackButton?: boolean;
}

export function AppHeader({
    className,
    siteName,
    breadcrumbs,
    breadcrumbConfig,
    autoBreadcrumbs = true,
    persistent = false,
    showBackButton = true,
    children,
}: AppHeaderProps) {
    const { hasSidebar, isSidebarOpen, toggleSidebar } = useLayout();
    const router = useRouter();
    const pathname = usePathname();
    const previousPageName = useMemo(() => {
        const segments = pathname.split('/').filter(Boolean);
        return segments[segments.length - 1];
    }, [pathname]);

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
            {hasSidebar || persistent && (
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

                    {showBackButton && (
                        <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => router.back()}
                            aria-label="Back"
                        >
                            <Icon name="arrow-left" size="sm" />
                            Back to {previousPageName}
                        </Button>
                    )}
                    <AutoBreadcrumbs config={breadcrumbConfig} />
                </div>
            )}
        </header>
    );
}

export type { BreadcrumbItem };