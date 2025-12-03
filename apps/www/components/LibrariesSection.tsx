import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSmile, faStar, faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faCode, faBolt, faBox } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getFeaturedLibraries } from '@/actions/libraries';
import type { LibraryData } from '@/lib/hub/types';

const categories = [
  { icon: faHandshake, label: 'Context-Aware' },
  { icon: faBolt, label: 'Performance-First' },
  { icon: faCheckCircle, label: 'Production Ready' },
  { icon: faSmile, label: 'Great DX' },
  { icon: faBox, label: 'Zero Dependencies' },
];

export const LibrariesSection = async () => {
  // Fetch featured libraries from the HUB API
  const featuredLibraries = await getFeaturedLibraries();

  return (
    <section id="libraries" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {categories.map((category, index) => {
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <FontAwesomeIcon icon={category.icon} className="w-8 h-8 text-gray-700" />
                <span className="text-sm text-gray-600">{category.label}</span>
              </div>
            );
          })}
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Our Libraries</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade Go libraries designed for high-performance applications with zero-allocation
            hot paths and minimal overhead.
          </p>
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
        <div className="text-center mt-12">
          <Link
            href="https://github.com/kolosys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:text-black transition-colors"
          >
            <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
            View All on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

const LibraryCard = ({ library }: { library: LibraryData }) => {
  // Map HUB API data format to component props
  const name = library.name;
  const version = library.latestTag || 'latest';
  const icon = library.emoji || library.faIcon || '📦';
  const description = library.description;
  const tags = library.topics?.slice(0, 3) || [];
  const stars = library.stargazersCount;
  const githubUrl = `https://github.com/${library.fullName}`;
  const docsUrl = library.baseSlug ? `/docs/${library.baseSlug}` : `/docs/${library.name.toLowerCase()}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm-lg transition-shadow-sm w-full max-w-sm">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-bold text-black">{name}</h4>
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              {version}
            </span>
          </div>
          {stars !== undefined && stars > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400" />
              <span>{stars.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
        >
          <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
          Code
        </Link>
        <Link
          href={docsUrl}
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
        >
          <span>📖</span>
          Docs
        </Link>
      </div>
    </div>
  );
};

