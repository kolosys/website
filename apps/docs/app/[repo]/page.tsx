import { DocsLayout } from '@/components/DocsLayout';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStatusFromVersion } from '@/lib/utils/versions';
import { StatusBadge } from '@/components/StatusBadge';
import { VersionBadge } from '@/components/VersionBadge';
import { getLibraries, getLibrary, getLibraryNavigation } from '@/actions/libraries';
import type { NavigationData } from '@/lib/hub/types';
import type { NavItem } from '@/lib/nav';
import { Suspense } from 'react';
import { Icon } from '@/lib/utils/icons';

/**
 * Check if a navigation item has an index page
 * A group has an index if it has children but also has actual content at its path
 * For now, we'll assume groups don't have indexes unless proven otherwise
 * This will be checked at render time by checking page content
 */
function hasIndexPage(nav: NavigationData): boolean {
  // By default, assume groups don't have indexes
  // The actual check will happen at render time by checking page content
  return false;
}

/**
 * Convert NavigationData from API to NavItem format
 */
function convertNavigationToNavItem(
  nav: NavigationData,
  repoId: string
): NavItem {
  const path = `/${repoId}/${nav.slug.join("/")}`;
  const children = nav.children && nav.children.length > 0
    ? nav.children.map((child) => convertNavigationToNavItem(child, repoId))
    : undefined;

  return {
    title: nav.title,
    path,
    icon: nav.emoji || nav.faIcon || undefined,
    children,
    // Store whether this group has an index page
    hasIndex: children ? hasIndexPage(nav) : undefined,
  };
}

async function RepoContent({ repo, libraries }: { repo: string; libraries: Awaited<ReturnType<typeof getLibraries>> }) {
  // Find the matching library
  const libraryConfig = libraries.find((library) => library.name.toLowerCase() === repo.toLowerCase());

  if (!libraryConfig) {
    notFound();
  }

  // Get cached navigation
  const navigationData = await getLibraryNavigation(libraryConfig.id);
  if (!navigationData) {
    notFound();
  }

  // Convert navigation to NavItem format
  const navigation: NavItem[] = navigationData
    .map((item) => convertNavigationToNavItem(item, repo))

  // Generate breadcrumbs
  const breadcrumbs = [
    { label: 'Docs', href: '/' },
    { label: libraryConfig.name },
  ];

  const version = libraryConfig.latestTag || 'v0.0.0';
  const status = getStatusFromVersion(version);

  // Layout handles sidebar and wrapper - just render content
  return (
    <div className="prose prose-gray max-w-none">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Icon emoji={libraryConfig.emoji} faIcon={libraryConfig.faIcon} size="4xl" fallback="📚" />
          <h1>{libraryConfig.name}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <StatusBadge status={status} />
          {version && <VersionBadge version={version} />}
        </div>

        {libraryConfig.description && (
          <p className="text-lg text-gray-600 mb-6">
            {libraryConfig.description}
          </p>
        )}
      </div>

      {navigation.length > 0 && (
        <>
          {(navigation.some(item => item.path === `/${repo}/getting-started`) ||
            navigation.some(item => item.path === `/${repo}/installation`)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {navigation.some(item => item.path === `/${repo}/getting-started`) && (
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3>Quick Start</h3>
                    <p className="text-gray-600 mb-4">Get started with {libraryConfig.name}</p>
                    <Link
                      href={`/${repo}/getting-started`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Guide →
                    </Link>
                  </div>
                )}

                {navigation.some(item => item.path === `/${repo}/installation`) && (
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3>Installation</h3>
                    <p className="text-gray-600 mb-4">Install and configure {libraryConfig.name}</p>
                    <Link
                      href={`/${repo}/installation`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Instructions →
                    </Link>
                  </div>
                )}
              </div>
            )}
        </>
      )}

      {navigation.length > 0 && (
        <div className="mb-8">
          <h2>Documentation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="font-medium text-black">{item.title}</div>
                {item.children && item.children.length > 0 && (
                  <div className="text-sm text-gray-500 mt-1">
                    {item.children.length} {item.children.length === 1 ? 'page' : 'pages'}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Link
          href={`https://github.com/kolosys/${libraryConfig.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
        >
          View on GitHub →
        </Link>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string }>;
}): Promise<{ title: string; description: string }> {
  const { repo } = await params;

  // Simplified metadata - full metadata will be set by the page component
  // This avoids uncached data access during static generation
  const title = `${repo.charAt(0).toUpperCase() + repo.slice(1)} Documentation`;
  const description = `Documentation and guides for ${repo}`;

  return {
    title,
    description,
  };
}

async function RepoPageContent({ paramsPromise }: { paramsPromise: Promise<{ repo: string }> }) {
  // Fetch libraries inside Suspense boundary
  const librariesPromise = getLibraries();

  return (
    <Suspense fallback={
      <RepoPageFallback librariesPromise={librariesPromise} />
    }>
      <RepoPageWithData paramsPromise={paramsPromise} librariesPromise={librariesPromise} />
    </Suspense>
  );
}

async function RepoPageFallback({ librariesPromise }: { librariesPromise: Promise<Awaited<ReturnType<typeof getLibraries>>> }) {
  // Fetch libraries for fallback (needed for sidebar) - this is cached
  const libraries = await librariesPromise;

  // Layout handles sidebar and wrapper - just render content
  return (
    <div className="prose prose-gray max-w-none">
      <div className="mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

async function RepoPageWithData({
  paramsPromise,
  librariesPromise
}: {
  paramsPromise: Promise<{ repo: string }>;
  librariesPromise: Promise<Awaited<ReturnType<typeof getLibraries>>>;
}) {
  const { repo } = await paramsPromise;
  const libraries = await librariesPromise;
  return <RepoContent repo={repo} libraries={libraries} />;
}

export default function RepoPage({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  return <RepoPageContent paramsPromise={params} />;
}

