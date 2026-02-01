import { BreadcrumbItem } from "./AppBreadcrumbs";

export interface BreadcrumbConfig {
    basePath?: string;
    formatLabel?: (segment: string, index: number, allSegments: string[]) => string;
    excludeSegments?: string[];
    customLabels?: Record<string, string>;
}

const defaultFormatLabel = (segment: string): string => {
    return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export function getPreviousSegmentName(pathname: string, config: BreadcrumbConfig = {}): string {
    const {
        basePath = '',
        formatLabel = defaultFormatLabel,
        excludeSegments = [],
        customLabels = {}
    } = config;

    // Strip query string and hash fragment
    let cleanPath = pathname.split(/[?#]/)[0];

    // Normalize and remove basePath if provided
    if (basePath) {
        const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
        if (normalizedBase && cleanPath.startsWith(normalizedBase)) {
            cleanPath = cleanPath.slice(normalizedBase.length);
        }
    }

    // Split into meaningful segments (ignore empty segments from duplicate slashes)
    const segments = cleanPath.split('/').filter(Boolean);

    // Find the previous non-excluded segment by searching backward
    for (let i = segments.length - 2; i >= 0; i--) {
        const candidate = segments[i];
        if (excludeSegments.includes(candidate)) {
            continue;
        }

        return customLabels[candidate] || formatLabel(candidate, i, segments);
    }

    // No previous segment found
    return '';
}

export function generateBreadcrumbs(
    segments: string[],
    config: BreadcrumbConfig = {}
): BreadcrumbItem[] {
    const {
        basePath = '',
        formatLabel = defaultFormatLabel,
        excludeSegments = [],
        customLabels = {}
    } = config;

    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = basePath;

    segments.forEach((segment, index) => {
        if (excludeSegments.includes(segment)) {
            return;
        }

        currentPath = currentPath ? `${currentPath}/${segment}` : segment;

        const label = customLabels[segment] || formatLabel(segment, index, segments);

        breadcrumbs.push({
            label,
            href: `/${currentPath}`
        });
    });

    return breadcrumbs;
}
