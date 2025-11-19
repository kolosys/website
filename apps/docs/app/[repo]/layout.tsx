import { Suspense } from 'react';
import { getLibraries, getLibraryNavigation } from '@/actions/libraries';
import { DocsLayoutClient } from '@/components/DocsLayoutClient';
import type { NavItem } from '@/lib/nav';
import type { NavigationData } from '@/lib/hub/types';
import { notFound } from 'next/navigation';

function convertNavigationToNavItem(
    nav: NavigationData,
    repoId: string
): NavItem | null {
    // Skip hidden items that don't have children
    const hasChildren = nav.children && nav.children.length > 0;
    if (nav.hidden && !hasChildren) {
        return null;
    }

    const path = `/${repoId}/${nav.slug.join("/")}`;
    const children = nav.children && nav.children.length > 0
        ? nav.children
            .map((child) => convertNavigationToNavItem(child, repoId))
            .filter((child): child is NavItem => child !== null)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
        : undefined;

    return {
        title: nav.title,
        path,
        icon: nav.emoji || nav.faIcon || undefined,
        children,
        order: nav.order || 0,
    };
}

async function RepoLayoutContent({
    repo,
    children,
}: {
    repo: string;
    children: React.ReactNode;
}) {
    const libraries = await getLibraries();

    // Find the matching library
    const libraryConfig = libraries.find(
        (library) =>
            library.name.toLowerCase() === repo.toLowerCase() ||
            library.baseSlug === repo ||
            library.id === repo
    );

    if (!libraryConfig) {
        notFound();
    }

    // Fetch navigation using Next.js caching - this will be cached server-side
    const navigationData = await getLibraryNavigation(libraryConfig.id);

    if (!navigationData) {
        notFound();
    }

    // Convert navigation to NavItem format
    const navigation: NavItem[] = navigationData
        .map((item) => convertNavigationToNavItem(item, repo))
        .filter((item): item is NavItem => item !== null)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    // Get repo URL
    const repoUrl = `https://github.com/${libraryConfig.fullName}`;

    return (
        <DocsLayoutClient
            currentRepo={repo}
            navigation={navigation}
            libraries={libraries}
            repoUrl={repoUrl}
        >
            {children}
        </DocsLayoutClient>
    );
}

export default async function RepoLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ repo: string }>;
}) {
    const { repo } = await params;

    return (
        <Suspense fallback={
            <DocsLayoutClient
                currentRepo={repo}
                navigation={[]}
                libraries={[]}
            >
                {children}
            </DocsLayoutClient>
        }>
            <RepoLayoutContent repo={repo}>
                {children}
            </RepoLayoutContent>
        </Suspense>
    );
}

