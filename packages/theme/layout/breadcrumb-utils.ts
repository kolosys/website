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

export function generateDocsBreadcrumbs(params: {
    repo: string;
    version?: string;
    slug?: string[];
}): BreadcrumbItem[] {
    const { repo, version, slug = [] } = params;

    const segments: string[] = [repo];

    if (version) {
        segments.push(version);
    }

    if (slug.length > 0) {
        segments.push(...slug);
    }

    return generateBreadcrumbs(segments, {
        basePath: 'docs',
        customLabels: {
            'latest': 'Latest',
            'next': 'Next'
        }
    });
}
