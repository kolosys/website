import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStatusFromVersion } from '@/lib/utils/versions';
import { StatusBadge, VersionBadge } from '@kolosys-sites/theme';
import { getLibraries, getLibrary, getLibraryNavigation } from '@/actions/libraries';
import type { NavigationData } from '@kolosys-sites/hub-client';
import type { NavItem } from '@/lib/nav';
import { Suspense } from 'react';
import { Icon } from '@/lib/utils/icons';

function isValidVersion(version: string): boolean {
  return version === 'latest' || version === 'next' || /^v?\d+/.test(version);
}

function convertNavigationToNavItem(
  nav: NavigationData,
  repoId: string,
  version: string
): NavItem {
  const path = `/${repoId}/${version}/${nav.slug.join("/")}`;
  const children = nav.children && nav.children.length > 0
    ? nav.children.map((child) => convertNavigationToNavItem(child, repoId, version))
    : undefined;

  return {
    title: nav.title,
    path,
    icon: nav.emoji || nav.faIcon || undefined,
    children,
  };
}

async function RepoContent({
  repo,
  version,
  libraries,
}: {
  repo: string;
  version: string;
  libraries: Awaited<ReturnType<typeof getLibraries>>;
}) {
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

  const navigation: NavItem[] = navigationData.map((item) =>
    convertNavigationToNavItem(item, repo, version)
  );

  const displayVersion = version === 'latest'
    ? libraryConfig.latestTag || 'v0.0.0'
    : version;
  const status = getStatusFromVersion(displayVersion);

  const gettingStarted = navigation.find((item) =>
    item.path === `/${repo}/${version}/getting-started`
  );
  const installation = gettingStarted?.children?.find((item) =>
    item.path === `/${repo}/${version}/getting-started/installation`
  );

  return (
    <div className="max-w-none pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Icon emoji={libraryConfig.emoji} faIcon={libraryConfig.faIcon} size="lg" fallback="books" />
          <h1 className='mb-0'>{libraryConfig.name}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <StatusBadge status={status} />
          {displayVersion && <VersionBadge version={displayVersion} />}
          {version === 'next' && (
            <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded">
              Unreleased
            </span>
          )}
        </div>

        {libraryConfig.description && (
          <p className="text-lg text-gray-600 mb-6">
            {libraryConfig.description}
          </p>
        )}
      </div>

      {navigation.length > 0 && (gettingStarted || installation) && (
        <>
          <h2>Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {gettingStarted && (
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3>Quick Start</h3>
                <p className="text-gray-600 mb-4">Get started with {libraryConfig.name}</p>
                <Link
                  href={gettingStarted.path}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Guide
                </Link>
              </div>
            )}

            {installation && (
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3>Installation</h3>
                <p className="text-gray-600 mb-4">Install and configure {libraryConfig.name}</p>
                <Link
                  href={installation.path}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Instructions
                </Link>
              </div>
            )}
          </div>
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
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string; version: string }>;
}): Promise<{ title: string; description: string }> {
  const { repo, version } = await params;
  const title = `${repo.charAt(0).toUpperCase() + repo.slice(1)} Documentation (${version})`;
  const description = `Documentation and guides for ${repo} ${version}`;
  return { title, description };
}

async function RepoPageFallback() {
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
  librariesPromise,
}: {
  paramsPromise: Promise<{ repo: string; version: string }>;
  librariesPromise: Promise<Awaited<ReturnType<typeof getLibraries>>>;
}) {
  const { repo, version } = await paramsPromise;
  const libraries = await librariesPromise;

  if (!isValidVersion(version)) {
    notFound();
  }

  return <RepoContent repo={repo} version={version} libraries={libraries} />;
}

export default function VersionedRepoPage({
  params,
}: {
  params: Promise<{ repo: string; version: string }>;
}) {
  const librariesPromise = getLibraries();

  return (
    <Suspense fallback={<RepoPageFallback />}>
      <RepoPageWithData paramsPromise={params} librariesPromise={librariesPromise} />
    </Suspense>
  );
}
