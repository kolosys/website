'use client';

import Link from "next/link";
import { Icon } from "../components/Icon";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbConfig, generateBreadcrumbs } from "./breadcrumb-utils";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    if (!items || items.length === 0) return null;

    const truncateItems = (max: number) => {
        if (items.length <= max) return items;
        return [
            items[0],
            { label: "...", href: "#" },
            ...items.slice(-(max - 1))
        ];
    };

    const mobileItems = truncateItems(2);
    const smItems = truncateItems(3);
    const mdItems = items;

    const renderItems = (displayItems: BreadcrumbItem[], responsiveClass: string) => (
        <div className={`${responsiveClass} items-center gap-2`}>
            {displayItems.map((item, idx) => {
                const isLastItem = idx === displayItems.length - 1;
                return (
                    <div key={`${item.href}-${idx}`} className="flex items-center gap-2">
                        {item.label === "..." ? (
                            <span className="text-neutral-400">...</span>
                        ) : isLastItem ? (
                            <span className="text-neutral-900 font-medium text-decoration-underline">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="text-neutral-600 hover:text-neutral-900">
                                {item.label}
                            </Link>
                        )}
                        {!isLastItem && <Icon name="chevron-right" size="xs" className="text-neutral-400" />}
                    </div>
                );
            })}
        </div>
    );

    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm overflow-x-auto h-fit">
            {renderItems(mobileItems, "flex sm:hidden")}
            {renderItems(smItems, "hidden sm:flex md:hidden")}
            {renderItems(mdItems, "hidden md:flex")}
        </nav>
    );
}

export function AutoBreadcrumbs({ config }: { config?: BreadcrumbConfig }) {
    const pathname = usePathname();

    const breadcrumbs = useMemo(() => {

        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0) return undefined;

        return generateBreadcrumbs(segments, config);
    }, [pathname, config]);

    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return <Breadcrumbs items={breadcrumbs} />;
}