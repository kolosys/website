import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { getLibraries, getLibrary, getLibraryNavigation } from '@/actions/libraries';
import { notFound, redirect } from 'next/navigation';
import { findPageInNav } from '@/lib/nav-utils';
import { TableOfContents } from '@/components/docs';
import type { Metadata } from 'next';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { AppSection } from '@kolosys-sites/theme';
import { useMDXComponents } from '@/components/mdx';

type PageProps = {
    params: Promise<{
        repo: string;
        version: string;
        slug: string[];
    }>;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

    const navData = await getLibraryNavigation(libraryConfig.id, version);
    const navItem = navData ? findPageInNav(navData, slug) : null;

    const title = navItem
        ? `${navItem.title} - ${libraryConfig.name} (${version})`
        : `${libraryConfig.name} Documentation`;
    const description = library.page?.description || navItem?.title || `${libraryConfig.name} documentation`;
    const url = `https://kolosys.com/docs/${repo}/${version}/${slug.join('/')}`;

    return {
        title,
        description,
        openGraph: { title, description, url, type: 'article', siteName: 'Kolosys' },
        twitter: { card: 'summary', title, description },
        alternates: { canonical: url },
    };
}

export default async function DocsSlugPage({ params }: PageProps) {
    const { repo, version, slug } = await params;
    const libraries = await getLibraries();

    const libraryConfig = libraries.find(
        (library) =>
            library.name.toLowerCase() === repo.toLowerCase() ||
            library.baseSlug === repo ||
            library.id === repo
    );

    if (!libraryConfig) notFound();

    const navigationData = await getLibraryNavigation(libraryConfig.id, version);
    if (!navigationData) notFound();

    const navItem = findPageInNav(navigationData, slug);
    if (!navItem) notFound();

    if (navItem.children && navItem.children.length > 0) {
        const library = await getLibrary(libraryConfig.id, slug, version);
        const hasContent = library?.page?.content && library.page.content.trim().length > 50;

        if (!hasContent) {
            const sortedChildren = [...navItem.children].sort((a, b) => (a.order || 0) - (b.order || 0));
            const firstChild = sortedChildren[0];
            if (firstChild && firstChild.slug && firstChild.slug.length > 0) {
                redirect(`/docs/${repo}/${version}/${firstChild.slug.join('/')}`);
            }
        }
    }

    const library = await getLibrary(libraryConfig.id, slug, version);
    if (!library) notFound();

    const metadata = {
        version: version === 'latest' ? libraryConfig.latestTag || 'v0.0.0' : version,
        status: version === 'next' ? 'Unreleased' : 'Stable',
        lastUpdated: libraryConfig.lastSync
            ? new Date(libraryConfig.lastSync).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
            : 'N/A',
    };

    const components = useMDXComponents();

    return (
        <AppSection className="flex gap-8">
            <article className="prose prose-neutral dark:prose-invert max-w-4xl flex-1 min-w-0 prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-transparent prose-pre:p-0 prose-code:text-primary-600 dark:prose-code:text-primary-400">
                {library.page?.content ? (
                    <MDXRemote
                        source={library.page.content}
                        components={components}
                        options={{
                            disableImports: true,
                            mdxOptions: {
                                development: process.env.NODE_ENV === 'development',
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [rehypeSlug],
                            },
                        }}
                    />
                ) : (
                    <div className="text-gray-500">No content available.</div>
                )}
            </article>
            <TableOfContents
                repo={repo}
                version={metadata.version}
                status={metadata.status}
                lastUpdated={metadata.lastUpdated}
            />
        </AppSection>
    );
}
