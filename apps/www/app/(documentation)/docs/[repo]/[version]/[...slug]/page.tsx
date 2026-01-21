import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { getLibraries, getLibrary, getLibraryNavigation } from '@/actions/libraries';
import { notFound, redirect } from 'next/navigation';
import { findPageInNav } from '@/lib/nav-utils';
import { TableOfContents } from '../../../../_components/TableOfContents';
import type { Metadata } from 'next';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { AppSection } from '@kolosys-sites/theme';
import { useMDXComponents } from '../../../../_components/MDXComponents';
import { sanitizeMdxSource } from '@/lib/mdx/sanitize';

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
                repo: library.name.toLowerCase(),
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
    const mdxSource = library.page?.content ? sanitizeMdxSource(library.page.content) : '';

    return (
        <AppSection className="px-0! py-8">
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                <article className="flex-1 min-w-0 w-full overflow-x-hidden wrap-break-word">
                    {mdxSource ? (
                        <MDXRemote
                            source={mdxSource}
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
                        <div className="text-caption">No content available.</div>
                    )}
                </article>
                <TableOfContents
                    repo={repo}
                    version={metadata.version}
                    status={metadata.status}
                    lastUpdated={metadata.lastUpdated}
                />
            </div>
        </AppSection>
    );
}
