import { DocsLayout } from '@/components/DocsLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocPage, generateNavigation, getAllDocSlugs, getAvailableRepos, getRepoConfig, getAllReposMetadata } from '@/lib/docs-loader';
import { notFound } from 'next/navigation';
import { getStatusFromVersion } from '@/utils/versions';
import { mdxComponents } from '@/components/MdxComponents';
import remarkGfm from 'remark-gfm';

/**
 * Convert text to Title Case (proper case)
 */
function toTitleCase(text: string): string {
  return text
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export async function generateStaticParams() {
  const repos = getAvailableRepos();
  const params: { repo: string; slug: string[] }[] = [];

  for (const repo of repos) {
    try {
      const slugs = await getAllDocSlugs(repo);
      for (const slug of slugs) {
        params.push({ repo, slug });
      }
    } catch (error) {
      console.error(`Error generating params for ${repo}:`, error);
      // Add fallback
      params.push({ repo, slug: ['overview'] });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string; slug: string[] }>;
}) {
  const { repo, slug } = await params;
  const repoConfig = getRepoConfig(repo);
  const docPage = await getDocPage(repo, slug);

  if (!repoConfig || !docPage) {
    return {};
  }

  const title = `${docPage.title} - ${repoConfig.displayName}`;
  const description = docPage.description || `${docPage.title} documentation for ${repoConfig.displayName}`;
  const url = `https://docs.kolosys.com/${repo}/${slug.join('/')}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Kolosys Docs',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ repo: string; slug: string[] }>;
}) {
  const { repo, slug } = await params;
  
  // Get repo config
  const repoConfig = getRepoConfig(repo);
  if (!repoConfig) {
    notFound();
  }

  // Get the doc page
  const docPage = await getDocPage(repo, slug);
  if (!docPage) {
    notFound();
  }

  // Generate navigation
  const navigation = await generateNavigation(repo);
  const currentPath = `/${repo}/${slug.join('/')}`;
  
  // Get metadata for all repos
  const allReposMetadata = await getAllReposMetadata();

  // Generate breadcrumbs
  const breadcrumbs = [
    { label: 'Docs', href: '/' },
    { label: repoConfig.displayName, href: `/${repo}` },
    { label: toTitleCase(docPage.title) },
  ];

  const version = docPage.metadata.version || 'v0.1.0';
  const status = docPage.metadata.status || getStatusFromVersion(version);

  return (
    <DocsLayout
      currentRepo={repo}
      navigation={navigation}
      activePath={currentPath}
      metadata={{
        version,
        status,
        lastUpdated: docPage.metadata.lastUpdated || 'Nov 11, 2025',
      }}
      repoUrl={`https://github.com/${repoConfig.org}/${repoConfig.repo}`}
      allReposMetadata={allReposMetadata}
      breadcrumbs={breadcrumbs}
    >
      <article className="prose prose-gray max-w-none">
        <MDXRemote 
          source={docPage.content} 
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>
    </DocsLayout>
  );
}
