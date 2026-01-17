import { getFeaturedLibraries } from '@/actions/libraries';
import type { LibraryData } from '@kolosys-sites/hub-client';
import { AppSection, Icon } from '@kolosys-sites/theme';
import { Button } from '@kolosys-sites/theme';

const categories = [
  { icon: 'donate-heart', label: 'Context-Aware' },
  { icon: 'bolt', label: 'Performance-First' },
  { icon: 'check-circle', label: 'Production Ready' },
  { icon: 'smile', label: 'Great DX' },
  { icon: 'package', label: 'Zero Dependencies' },
] as const;

export const LibrariesSection = async () => {
  // Fetch featured libraries from the HUB API
  const featuredLibraries = await getFeaturedLibraries();

  return (
    <AppSection id="libraries" elevated>
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Libraries</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Enterprise-grade Go libraries designed for high-performance applications with zero-allocation
            hot paths and minimal overhead.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {categories.map((category, index) => {
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <Icon name={category.icon} pack="basic" size="lg" className="text-neutral-700" />
                <span className="text-sm text-neutral-600">{category.label}</span>
              </div>
            );
          })}
        </div>

        {/* Featured Libraries */}
        {featuredLibraries.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6">
            {featuredLibraries.map((library) => (
              <LibraryCard key={library.id} library={library} />
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="flex justify-center text-center mt-12">
          <Button
            variant="outline"
            size="md"
            href="https://github.com/kolosys"
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-sm"
          >
            <Icon name="code-alt" pack="basic" size="sm" />
            View All on GitHub
          </Button>
        </div>
      </div>
    </AppSection>
  );
};

const LibraryCard = ({ library }: { library: LibraryData }) => {
  // Map HUB API data format to component props
  const name = library.name;
  const version = library.latestTag || 'latest';
  const description = library.description;
  const tags = library.topics?.slice(0, 3) || [];
  const stars = library.stargazersCount;
  const githubUrl = `https://github.com/${library.fullName}`;
  const docsUrl = `/docs/${library.name.toLowerCase()}`;

  return (
    <div className="bg-panel rounded-lg border border-neutral-200 p-6 hover:shadow-sm-lg transition-shadow-sm w-full max-w-sm sm:max-w-xs">
      <div className="flex items-start gap-3 mb-3">
        {library.emoji ? (
          <Icon emoji={library.emoji} size="lg" />
        ) : (
          <Icon name="box" pack="basic" size="lg" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-bold text-foreground">{name}</h4>
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              {version}
            </span>
          </div>
          {stars !== undefined && stars > 0 && (
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Icon name="star" pack="basic" size="xs" className="text-yellow-400" />
              <span>{stars.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-neutral-600 mb-4">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 flex-row sm:flex-col">
        <Button
          variant="outline"
          size="sm"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 justify-center"
        >
          <Icon name="code-alt" pack="basic" size="sm" />
          Code
        </Button>
        <Button
          variant="outline"
          size="sm"
          href={docsUrl}
          className="flex-1 justify-center"
        >
          <Icon emoji="📖" size="sm" />
          Docs
        </Button>
      </div>
    </div>
  );
};

