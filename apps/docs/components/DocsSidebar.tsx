'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SearchBar } from './SearchBar';

interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
  icon?: string;
}

interface DocsSidebarProps {
  currentRepo: string;
  navigation: NavItem[];
  activePath?: string;
  onClose?: () => void;
  allReposMetadata?: Record<string, { version: string; lastUpdated: string; description?: string }>;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ 
  currentRepo, 
  navigation, 
  activePath,
  onClose,
  allReposMetadata = {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const libraries = [
    { id: 'ion', name: 'Ion', icon: '⚡' },
    { id: 'nova', name: 'Nova', icon: '🌟' },
    { id: 'timecapsule', name: 'TimeCapsule', icon: '⏰' },
    { id: 'discord', name: 'Discord', icon: '💬' },
    { id: 'discord-types', name: 'Discord Types', icon: '📘' },
  ];

  // Build searchable index from navigation
  const searchIndex = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      content: string;
      url: string;
      repo: string;
    }> = [];

    // Add library pages
    libraries.forEach((lib) => {
      const metadata = allReposMetadata[lib.id];
      items.push({
        id: `${lib.id}-home`,
        title: lib.name,
        content: metadata?.description || `${lib.name} documentation`,
        url: `/${lib.id}`,
        repo: lib.name,
      });
    });

    // Add navigation items
    const addNavItems = (navItems: NavItem[], repo: string) => {
      navItems.forEach((item) => {
        items.push({
          id: `${repo}-${item.path}`,
          title: item.title,
          content: `${item.title} documentation`,
          url: item.path,
          repo,
        });
        if (item.children) {
          addNavItems(item.children, repo);
        }
      });
    };

    if (currentRepo && navigation.length > 0) {
      const currentLib = libraries.find((lib) => lib.id === currentRepo);
      addNavItems(navigation, currentLib?.name || currentRepo);
    }

    return items;
  }, [libraries, allReposMetadata, navigation, currentRepo]);

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return searchIndex
      .filter((item) => 
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.repo.toLowerCase().includes(query)
      )
      .slice(0, 10); // Limit to 10 results
  }, [searchQuery, searchIndex]);

  return (
    <aside className="w-full lg:w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 pt-6 space-y-6 flex-shrink-0">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div>
            <div className="font-bold text-lg">Kolosys Dev</div>
            <div className="text-xs text-gray-500 -mt-1.5">Documentation</div>
          </div>
        </Link>

        {/* Search */}
        <SearchBar onSearch={handleSearch} results={searchResults} />

        {/* Library List */}
        <div className="space-y-1">
          {libraries.map((lib) => {
            const metadata = allReposMetadata[lib.id];
            const version = metadata?.version || 'v0.0.0';
            
            return (
                  <Link
                    key={lib.id}
                    href={`/${lib.id}`}
                    className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors ${
                      currentRepo === lib.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl">{lib.icon}</span>
                  <div className={`text-sm font-medium ${
                    currentRepo === lib.id ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {lib.name}
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex-shrink-0">
                  {version}
                </span>
              </Link>
            );
          })}
        </div>

      </div>

      {/* Navigation Tree - Fills available space */}
      {navigation.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 pt-4 border-t border-gray-200">
          <nav className="space-y-1 pb-4">
            {navigation.map((item) => (
              <NavItemComponent 
                key={item.path}
                item={item}
                activePath={activePath}
                onClose={onClose}
              />
            ))}
          </nav>
        </div>
      )}

      {/* Footer Links - Pushed to bottom */}
      <div className="flex-shrink-0 px-4 py-4 border-t text-xs space-y-2 border-gray-200">
        <Link href="#" className="block text-gray-600 hover:text-black transition-colors">
          Community
        </Link>
        <Link href="https://github.com/kolosys" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-black transition-colors">
          GitHub
        </Link>
      </div>
    </aside>
  );
};

const NavItemComponent: React.FC<{
  item: NavItem;
  activePath?: string;
  onClose?: () => void;
}> = ({ item, activePath, onClose }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activePath === item.path;

  // If item has children, render as a section group
  if (hasChildren) {
    return (
      <div className="space-y-1 mb-6">
        {/* Section Header */}
        <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {item.title}
        </h4>
        {/* Section Items */}
        <div className="space-y-0.5">
          {item.children!.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              onClick={onClose}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                activePath === child.path
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {child.icon && <span className="text-base">{child.icon}</span>}
              <span>{child.title}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Top-level item without children
  return (
    <div className="mb-4">
      <Link
        href={item.path}
        onClick={onClose}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
          isActive 
            ? 'bg-blue-50 text-blue-700 font-medium' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {item.icon && <span className="text-base">{item.icon}</span>}
        <span>{item.title}</span>
      </Link>
    </div>
  );
};

