import { getLibraries } from '@/actions/libraries';
import type { LibraryData } from '@kolosys-sites/hub-client';
import { AppSection, AppContent, Icon, Button } from '@kolosys-sites/theme';
import Link from 'next/link';

export default async function DocsHomePage() {
  const libraries = await getLibraries();

  const stats = [
    { value: libraries.length.toString(), label: 'Libraries' },
    { value: '90%', label: 'Coverage' },
    { value: 'Zero', label: 'Dependencies' },
  ];

  return (
    <AppContent>
      {/* Hero Section */}
      <AppSection className="py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-base text-primary-text rounded-full text-sm font-medium">
            <Icon emoji="📚" size="sm" />
            <span>Documentation Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Build Faster with
            <span className="block text-primary-600 mt-2">Enterprise-Grade Libraries</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-12">
            Comprehensive documentation for high-performance Go libraries designed for production.
            Zero-allocation hot paths, minimal dependencies, and developer-friendly APIs.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AppSection>

      {/* Libraries Grid */}
      <AppSection id="libraries" elevated className="py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Explore Our Libraries
            </h2>
            <p className="text-caption max-w-2xl mx-auto">
              Choose a library to dive into detailed documentation, guides, and API references
            </p>
          </div>

          {libraries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {libraries.map((library) => (
                <LibraryDocCard key={library.id} library={library} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon emoji="📦" size="lg" className="mb-4 opacity-50" />
              <p className="text-caption">No libraries available yet</p>
            </div>
          )}

          {/* GitHub CTA */}
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              href="https://github.com/kolosys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="code-alt" pack="basic" size="sm" />
              Explore All Projects on GitHub
            </Button>
          </div>
        </div>
      </AppSection>

      {/* CTA Section */}
      <AppSection className="py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Join our community and get support from the team and other developers
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/join-discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="message-dots" pack="basic" size="sm" />
              Join Discord
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="https://github.com/kolosys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="code-alt" pack="basic" size="sm" />
              Contribute
            </Button>
          </div>
        </div>
      </AppSection>
    </AppContent>
  );
}

const LibraryDocCard = ({ library }: { library: LibraryData }) => {
  const docsUrl = `/docs/${library.name.toLowerCase()}/latest`;
  const version = library.latestTag || 'v0.0.0';
  const description = library.description || 'No description available';

  return (
    <Link
      href={docsUrl}
      className="group block bg-surface rounded-lg border border-border p-6 hover:border-primary-emphasis hover:shadow-lg transition-all"
    >
      <div className="flex items-start gap-4 mb-4">
        {library.emoji ? (
          <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-linear-to-br from-primary-base to-primary-subtle rounded-lg group-hover:scale-110 transition-transform">
            <Icon emoji={library.emoji} size="lg" />
          </div>
        ) : (
          <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-elevated rounded-lg border border-outline">
            <Icon name="box" pack="basic" size="lg" className="text-caption" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary-emphasis transition-colors truncate">
              {library.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              {version}
            </span>
            {library.stargazersCount !== undefined && library.stargazersCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-caption">
                <Icon name="star" pack="basic" size="xs" className="text-yellow-400" />
                <span>{library.stargazersCount.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-caption mb-4 line-clamp-2">
        {description}
      </p>

      {library.topics && library.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {library.topics.slice(0, 3).map((topic: string) => (
            <span
              key={topic}
              className="px-2 py-1 bg-elevated text-body text-xs rounded border border-outline"
            >
              {topic}
            </span>
          ))}
          {library.topics.length > 3 && (
            <span className="px-2 py-1 text-caption text-xs">
              +{library.topics.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm font-medium text-primary-emphasis group-hover:text-primary-700 flex items-center gap-2">
          View Documentation
          <Icon name="arrow-right" pack="basic" size="xs" className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
};
