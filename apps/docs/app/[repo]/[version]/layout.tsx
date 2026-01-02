import { Suspense } from 'react';
import { getLibraries, getLibraryNavigation } from '@/actions/libraries';
import { DocsLayoutClient } from '@/components/DocsLayoutClient';
import type { NavItem } from '@/lib/nav';
import type { NavigationData } from '@/lib/hub/types';
import { notFound } from 'next/navigation';

function isValidVersion(version: string): boolean {
  return version === 'latest' || version === 'next' || /^v?\d+/.test(version);
}

function convertNavigationToNavItem(
  nav: NavigationData,
  repoId: string,
  version: string
): NavItem | null {
  const hasChildren = nav.children && nav.children.length > 0;
  if (nav.hidden && !hasChildren) {
    return null;
  }

  const path = `/${repoId}/${version}/${nav.slug.join("/")}`;
  const children =
    nav.children && nav.children.length > 0
      ? nav.children
          .map((child) => convertNavigationToNavItem(child, repoId, version))
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

async function VersionedLayoutContent({
  repo,
  version,
  children,
}: {
  repo: string;
  version: string;
  children: React.ReactNode;
}) {
  if (!isValidVersion(version)) {
    notFound();
  }

  const libraries = await getLibraries();

  const libraryConfig = libraries.find(
    (library) =>
      library.name.toLowerCase() === repo.toLowerCase() ||
      library.baseSlug === repo ||
      library.id === repo
  );

  if (!libraryConfig) {
    notFound();
  }

  const navigationData = await getLibraryNavigation(libraryConfig.id, version);

  if (!navigationData) {
    notFound();
  }

  const navigation: NavItem[] = navigationData
    .map((item) => convertNavigationToNavItem(item, repo, version))
    .filter((item): item is NavItem => item !== null)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const repoUrl = `https://github.com/${libraryConfig.fullName}`;

  return (
    <DocsLayoutClient
      currentRepo={repo}
      currentVersion={version}
      versions={libraryConfig.versions}
      navigation={navigation}
      libraries={libraries}
      repoUrl={repoUrl}
    >
      {children}
    </DocsLayoutClient>
  );
}

export default async function VersionedRepoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ repo: string; version: string }>;
}) {
  const { repo, version } = await params;

  return (
    <Suspense
      fallback={
        <DocsLayoutClient currentRepo={repo} navigation={[]} libraries={[]}>
          {children}
        </DocsLayoutClient>
      }
    >
      <VersionedLayoutContent repo={repo} version={version}>
        {children}
      </VersionedLayoutContent>
    </Suspense>
  );
}
