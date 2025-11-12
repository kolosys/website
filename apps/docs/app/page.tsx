import Link from 'next/link';
import { docsConfig } from '@kolosys-sites/docs-sync/config';

export default function Home() {
  const libraries = docsConfig.repos.map(repo => ({
    name: repo.displayName,
    icon: repo.icon || '📚',
    path: `/${repo.repo}/overview`,
    description: `Documentation for ${repo.displayName}`,
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Kolosys Documentation</h1>
            <p className="text-xl text-gray-600">
              Choose a library to explore its documentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {libraries.map((library) => (
              <Link
                key={library.name}
                href={`/${library.name.toLowerCase()}`}
                className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{library.icon}</span>
                  <h2 className="text-2xl font-bold text-black">{library.name}</h2>
                </div>
                <p className="text-gray-600">{library.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
