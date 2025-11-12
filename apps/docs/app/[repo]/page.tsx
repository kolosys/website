import { DocsLayout } from '@/components/DocsLayout';
import { generateNavigation, getAvailableRepos, getRepoConfig, getAllReposMetadata, getRepoMetadata } from '@/lib/docs-loader';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getStatusFromVersion } from '@/utils/versions';
import { StatusBadge } from '@/components/StatusBadge';
import { VersionBadge } from '@/components/VersionBadge';

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
  return repos.map((repo) => ({ repo }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;
  const repoConfig = getRepoConfig(repo);
  const metadata = await getRepoMetadata(repo);

  if (!repoConfig) {
    return {};
  }

  const title = `${repoConfig.displayName} Documentation`;
  const description = metadata?.description || `Documentation and guides for ${repoConfig.displayName}, an enterprise-grade Go library`;
  const url = `https://docs.kolosys.com/${repo}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Kolosys Docs',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function RepoPage({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;
  
  // Get repo config
  const repoConfig = getRepoConfig(repo);
  if (!repoConfig) {
    notFound();
  }

  // Generate navigation
  const navigation = await generateNavigation(repo);
  
  // Get metadata for all repos
  const allReposMetadata = await getAllReposMetadata();
  
  // Get metadata for this specific repo
  const metadata = await getRepoMetadata(repo);

  // Generate breadcrumbs
  const breadcrumbs = [
    { label: 'Docs', href: '/' },
    { label: repoConfig.displayName },
  ];

  const version = metadata?.version || 'v0.0.0';
  const status = getStatusFromVersion(version);

  return (
    <DocsLayout
      currentRepo={repo}
      navigation={navigation}
      activePath={`/${repo}`}
      metadata={{
        version,
        status,
        lastUpdated: metadata?.lastUpdated 
          ? new Date(metadata.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'N/A',
      }}
      repoUrl={`https://github.com/${repoConfig.org}/${repoConfig.repo}`}
      allReposMetadata={allReposMetadata}
      breadcrumbs={breadcrumbs}
    >
      <div className="prose prose-gray max-w-none">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{repoConfig.icon}</span>
            <h1 className="text-3xl font-bold text-black mb-0">{repoConfig.displayName}</h1>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <StatusBadge status={status} />
            {metadata?.version && <VersionBadge version={metadata.version} />}
          </div>
          
          {metadata?.description && (
            <p className="text-lg text-gray-600 mb-6">
              {metadata.description}
            </p>
          )}

          {metadata?.topics && metadata.topics.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {metadata.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {navigation.length > 0 && (
          <>
            {(navigation.some(item => item.path === `/${repo}/getting-started`) || 
              navigation.some(item => item.path === `/${repo}/installation`)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {navigation.some(item => item.path === `/${repo}/getting-started`) && (
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-black mb-2">Quick Start</h3>
                    <p className="text-gray-600 mb-4">Get started with {repoConfig.displayName}</p>
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
                    <h3 className="text-lg font-semibold text-black mb-2">Installation</h3>
                    <p className="text-gray-600 mb-4">Install and configure {repoConfig.displayName}</p>
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
            <h2 className="text-2xl font-bold text-black mb-4">Documentation</h2>
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
            href={`https://github.com/${repoConfig.org}/${repoConfig.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            View on GitHub →
          </Link>
        </div>
      </div>
    </DocsLayout>
  );
}

