'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { SearchBar } from './SearchBar';
import { toTitleCase } from '@/lib/utils/string';
import type { NavItem } from '@/lib/nav';
import type { LibraryData } from '@/lib/hub/types';
import { Icon } from '@kolosys-sites/theme';
import { Button } from '@kolosys-sites/theme';

interface DocsSidebarProps {
  currentRepo: string;
  navigation: NavItem[];
  activePath?: string;
  onClose?: () => void;
  libraries: LibraryData[];
}

export function DocsSidebar({ currentRepo, navigation, activePath, onClose, libraries: repos }: DocsSidebarProps) {
  const pathname = usePathname();
  // Use pathname if activePath not provided (for layout-based rendering)
  const effectiveActivePath = activePath || pathname;
  if (repos.length === 0) {
    return <div>No repositories found</div>;
  }

  const libraries = repos.map((repo) => ({
    id: repo.id,
    name: toTitleCase(repo.name),
    emoji: repo.emoji,
    faIcon: repo.faIcon,
    version: repo.latestTag || 'v0.0.0',
    // Store original values for comparison
    originalId: repo.id,
    originalBaseSlug: repo.baseSlug,
    originalName: repo.name,
  }));

  // Helper function to check if a library is the current active repo
  const isActiveRepo = (lib: typeof libraries[0]) => {
    if (!currentRepo) return false;
    const currentRepoLower = currentRepo.toLowerCase();
    return (
      lib.id === currentRepo ||
      lib.originalId === currentRepo ||
      lib.originalBaseSlug === currentRepo ||
      lib.originalName.toLowerCase() === currentRepoLower
    );
  };

  return (
    <aside className="w-full lg:w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 pt-6 space-y-6 shrink-0">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div>
            <div className="font-bold text-gray-900 text-lg">Kolosys</div>
            <div className="text-xs text-gray-500 -mt-1.5">Documentation</div>
          </div>
        </Link>

        {/* Library List */}
        <div className="space-y-1">
          {libraries.map((lib) => {
            const isActive = isActiveRepo(lib);
            return (
              <Link
                key={lib.id}
                href={`/${lib.name.toLowerCase()}`}
                className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon emoji={lib.emoji || '📚'} size="md" />
                  <div className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                    {toTitleCase(lib.name)}
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 shrink-0">
                  {lib.version}
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
      <div className="shrink-0 px-4 py-4 border-t text-xs space-y-2 border-gray-200">
        <Button variant="ghost" size="sm" className="w-full" href="https://kolosys.com/join-discord" target='_blank' rel='noopener noreferrer'>
          <Icon pack="brands" name="discord-alt" size="xs" className="w-4 h-4" />
          <span>Join Discord</span>
        </Button>

        <Button variant="ghost" size="sm" className="w-full" href="https://github.com/kolosys" target='_blank' rel='noopener noreferrer'>
          <Icon pack="brands" name="github" size="xs" className="w-4 h-4" />
          <span>GitHub</span>
        </Button>
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
  const pathname = usePathname();
  const effectiveActivePath = activePath || pathname;
  const isActive = effectiveActivePath === item.path;

  // Determine the link href for groups
  // If group has no index page, redirect to first child
  const groupHref = hasChildren && !item.hasIndex && item.children && item.children.length > 0
    ? item.children[0].path
    : item.path;

  // If item has children, render as a section group
  if (hasChildren) {
    return (
      <div className="space-y-1 mb-6">
        {/* Section Header - clickable if no index */}
        {item.hasIndex ? (
          <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {toTitleCase(item.title)}
          </h4>
        ) : (
          <Link
            href={groupHref}
            onClick={onClose}
            className={`block px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 hover:text-gray-700 transition-colors ${isActive
              ? 'text-blue-700'
              : ''
              }`}
          >
            {toTitleCase(item.title)}
          </Link>
        )}
        {/* Section Items */}
        <div className="space-y-0.5">
          {item.children!.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              onClick={onClose}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${activePath === child.path
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {child.icon && (
                <Icon
                  emoji={child.icon}
                  size="md"
                />
              )}
              <span>{toTitleCase(child.title)}</span>
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
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${isActive
          ? 'bg-blue-50 text-blue-700 font-medium'
          : 'text-gray-700 hover:bg-gray-100'
          }`}
      >
        {item.icon && (
          <Icon
            emoji={item.icon}
            size="md"
          />
        )}
        <span>{item.title}</span>
      </Link>
    </div>
  );
};

