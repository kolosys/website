import { getLibraries, getLibrary, getLibraryNavigation } from '@/actions/libraries';
import { notFound, redirect } from 'next/navigation';
import type { NavigationData } from '@/lib/hub/types';
import { Suspense } from 'react';
import { Markdown } from '@/components/MDComponents';

function isValidVersion(version: string): boolean {
  return version === 'latest' || version === 'next' || /^v?\d+/.test(version);
}

function normalizeContent(content: string): string {
  if (!content || content.length === 0) return content;
  if (!content.includes('\\')) return content;

  const hasEscapedChars = /\\[ntr"']/.test(content);
  if (!hasEscapedChars) return content;

  return content
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\');
}

async function MdxContent({
  content,
  filePath,
  title,
}: {
  content: string;
  filePath?: string;
  title?: string;
}) {
  const normalizedContent = normalizeContent(content);

  try {
    return <Markdown content={normalizedContent} />;
  } catch (error) {
    console.error('Error rendering markdown content:', error);
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded-lg">
        <p className="font-semibold mb-2">Error rendering markdown content</p>
        {filePath && <p className="text-sm mb-2"><strong>File:</strong> {filePath}</p>}
        {title && <p className="text-sm mb-2"><strong>Title:</strong> {title}</p>}
        <p className="text-sm mb-4">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
      </div>
    );
  }
}

export async function generateStaticParams() {
  try {
    const libraries = await getLibraries();
    return libraries.flatMap((library) => {
      const versions = library.versions?.map((v) => v.tag) || ['latest'];
      return versions.map((version) => ({
        repo: library.baseSlug || library.id,
        version,
        slug: ['overview'],
      }));
    });
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string; version: string; slug: string[] }>;
}) {
  const { repo, version, slug } = await params;

  const libraries = await getLibraries();
  const libraryConfig = libraries.find(
    (library) =>
      library.baseSlug === repo ||
      library.id === repo ||
      library.name.toLowerCase() === repo.toLowerCase()
  );

  if (!libraryConfig) return {};

  const library = await getLibrary(libraryConfig.id, slug, version);
  if (!library) return {};

  function findPageInNav(items: NavigationData[], targetSlug: string[]): NavigationData | null {
    for (const item of items) {
      if (JSON.stringify(item.slug) === JSON.stringify(targetSlug)) return item;
      if (item.children && item.children.length > 0) {
        const found = findPageInNav(item.children, targetSlug);
        if (found) return found;
      }
    }
    return null;
  }

  const navItem = findPageInNav(library.navigation, slug);
  const title = navItem
    ? `${navItem.title} - ${libraryConfig.name} (${version})`
    : `${libraryConfig.name} Documentation`;
  const description = library.page?.description || navItem?.title || `${libraryConfig.name} documentation`;
  const url = `https://docs.kolosys.com/${repo}/${version}/${slug.join('/')}`;

  return {
    title,
    description,
    openGraph: { title, description, url, type: 'article', siteName: 'Kolosys Docs' },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: url },
  };
}

async function DocContent({
  repo,
  version,
  slug,
  libraries,
}: {
  repo: string;
  version: string;
  slug: string[];
  libraries: Awaited<ReturnType<typeof getLibraries>>;
}) {
  const libraryConfig = libraries.find(
    (library) =>
      library.name.toLowerCase() === repo.toLowerCase() ||
      library.baseSlug === repo ||
      library.id === repo
  );

  if (!libraryConfig) notFound();

  const navigationData = await getLibraryNavigation(libraryConfig.id, version);
  if (!navigationData) notFound();

  function findPageInNav(items: NavigationData[], targetSlug: string[]): NavigationData | null {
    for (const item of items) {
      if (JSON.stringify(item.slug) === JSON.stringify(targetSlug)) return item;
      if (item.children && item.children.length > 0) {
        const found = findPageInNav(item.children, targetSlug);
        if (found) return found;
      }
    }
    return null;
  }

  const navItem = findPageInNav(navigationData, slug);
  if (!navItem) notFound();

  // If this is a group path with children but no content, redirect to first child
  if (navItem.children && navItem.children.length > 0) {
    const library = await getLibrary(libraryConfig.id, slug, version);
    const hasContent = library?.page?.content && library.page.content.trim().length > 50;

    if (!hasContent) {
      const sortedChildren = [...navItem.children].sort((a, b) => (a.order || 0) - (b.order || 0));
      const firstChild = sortedChildren[0];
      if (firstChild && firstChild.slug && firstChild.slug.length > 0) {
        redirect(`/${repo}/${version}/${firstChild.slug.join('/')}`);
      }
    }
  }

  const library = await getLibrary(libraryConfig.id, slug, version);
  if (!library) notFound();

  return (
    <article className="prose prose-gray max-w-none">
      {library.page?.content ? (
        <MdxContent
          content={library.page.content}
          filePath={`${repo}/${version}/${slug.join('/')}`}
          title={library.page.title || navItem.title}
        />
      ) : (
        <div className="text-gray-500">No content available.</div>
      )}
    </article>
  );
}

async function DocPageFallback() {
  return (
    <article className="prose prose-gray max-w-none">
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-gray-600 text-sm font-medium">Loading documentation...</p>
        <div className="mt-8 w-full max-w-2xl space-y-3">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
          </div>
        </div>
      </div>
    </article>
  );
}

async function DocPageWithData({
  paramsPromise,
  librariesPromise,
}: {
  paramsPromise: Promise<{ repo: string; version: string; slug: string[] }>;
  librariesPromise: Promise<Awaited<ReturnType<typeof getLibraries>>>;
}) {
  const { repo, version, slug } = await paramsPromise;
  const libraries = await librariesPromise;

  if (!isValidVersion(version)) notFound();

  return <DocContent repo={repo} version={version} slug={slug} libraries={libraries} />;
}

export default function VersionedDocPage({
  params,
}: {
  params: Promise<{ repo: string; version: string; slug: string[] }>;
}) {
  const librariesPromise = getLibraries();

  return (
    <Suspense fallback={<DocPageFallback />}>
      <DocPageWithData paramsPromise={params} librariesPromise={librariesPromise} />
    </Suspense>
  );
}
