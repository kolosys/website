import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSmile, faStar, faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faCode, faBolt, faBox, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const categories = [
  { icon: faHandshake, label: 'Context-Aware' },
  { icon: faBolt, label: 'Performance-First' },
  { icon: faCheckCircle, label: 'Production Ready' },
  { icon: faSmile, label: 'Great DX' },
  { icon: faBox, label: 'Zero Dependencies' },
];

// Fallback data in case API is unavailable
const fallbackLibraries = [
  {
    name: 'Ion',
    version: 'v0.1.1',
    goVersion: 'Go 1.21+',
    icon: '⚡',
    description: 'Concurrency & scheduling primitives - the backbone for concurrent Go applications with robust, context-aware primitives.',
    tags: ['Concurrency', 'Performance', 'Low-Latency'],
    features: [
      'Zero-alloc hot paths',
      'Sub-200ns operations',
      'High throughput',
      'Context propagation',
    ],
  },
  {
    name: 'Neva',
    version: 'v1.3.0',
    goVersion: 'Go 1.19+',
    icon: '🌟',
    description: 'Enterprise-grade event systems with predicate semantics and thread-delivery guarantees.',
    tags: ['Networking', 'Events', 'Primitives'],
    features: [
      'Event-driven',
      'Type-safe',
      'High performance',
      'Dead-simple',
    ],
  },
  {
    name: 'TimeCapsule',
    version: 'v1.3.2',
    goVersion: 'Go 1.19+',
    icon: '⏰',
    description: 'A lightweight library for storing values that are only retrievable after a specified time.',
    tags: ['Utilities', 'Storage', 'Scheduling'],
    features: [
      'Time-delayed retrieval',
      'Zero-overhead',
      'Thread-safe',
      'Minimal API',
    ],
  },
];

const additionalLibraries = [
  {
    name: 'Discord',
    version: 'v1.5.0',
    goVersion: 'Go 1.20+',
    icon: '💬',
    description: 'High-performance, type-safe Discord bot development for Go with complete Discord API coverage and type mapping.',
    tags: ['Discord', 'Bot', 'Ergonomic'],
    features: [
      'Type-safe Events',
      'Complete API',
      'Low overhead',
      'Intent-friendly',
    ],
  },
  {
    name: 'Discord-Types',
    version: 'v1.2.0',
    goVersion: 'Go 1.19+',
    icon: '📘',
    description: 'Complete Discord API v10+ type definitions with helper utilities for type-safe Discord formatting.',
    tags: ['Discord', 'Types', 'API'],
    features: [
      'Rich API Coverage',
      'Format helpers',
      'Integer Unions',
      'Type correct',
    ],
  },
];

export const LibrariesSection = async () => {
  // Fetch libraries from the docs API
  // Note: Disabled during build since docs API may not be available
  // const apiLibraries = await getAllLibraries();
  const apiLibraries: any[] = [];

  // Use API data if available, otherwise fall back to hardcoded data
  const allLibs = apiLibraries.length > 0 ? apiLibraries : [...fallbackLibraries, ...additionalLibraries];

  // Split into featured (first 3) and additional (rest)
  const featured = allLibs.slice(0, 3);
  const additional = allLibs.filter((library) => library.name.includes('Discord'));

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
        {featured.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">⭐</span>
              <h3 className="text-xl font-bold text-black">Featured Libraries</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((library) => (
                <LibraryCard key={library.name || (library as any).id} library={library} />
              ))}
            </div>
          </div>
        )}

        {/* Additional Libraries */}
        {additional.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-black mb-6">Additional Libraries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additional.map((library) => (
                <LibraryCard key={library.name || (library as any).id} library={library} />
              ))}
            </div>
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

const LibraryCard = ({ library }: { library: any }) => {
  // Support both API format and fallback format
  const name = library.name;
  const version = library.version;
  const icon = library.icon;
  const description = library.description;
  const tags = library.tags || library.topics?.slice(0, 3) || [];
  const features = library.features || [];
  const stars = library.stars;
  const githubUrl = library.githubUrl || `https://github.com/kolosys/${(library.id || library.name).toLowerCase()}`;
  const docsUrl = library.docsUrl || `/docs/${(library.id || library.name).toLowerCase()}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
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
          {library.goVersion && (
            <div className="text-xs text-gray-500">{library.goVersion}</div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {features.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-700 mb-2">Key Features</div>
          <ul className="space-y-1">
            {features.map((feature: string) => (
              <li key={feature} className="text-xs text-gray-600 flex items-center gap-1">
                <span className="text-gray-400">•</span> {feature}
              </li>
            ))}
          </ul>
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

