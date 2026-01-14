'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toTitleCase } from '@/lib/utils/string';
import type { NavItem } from '@/lib/nav';
import type { LibraryData, VersionInfo } from '@/lib/hub/types';
import { Icon, Button, Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@kolosys-sites/theme';

interface DocsSidebarProps {
  currentRepo: string;
  currentVersion?: string;
  versions?: VersionInfo[];
  navigation: NavItem[];
  activePath?: string;
  onClose?: () => void;
  libraries: LibraryData[];
}

export function DocsSidebar({ currentRepo, currentVersion, versions, navigation, activePath, onClose, libraries: repos }: DocsSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (repos.length === 0) {
    return <div>No repositories found</div>;
  }

  const libraries = repos.map((repo) => ({
    id: repo.id,
    name: toTitleCase(repo.name),
    emoji: repo.emoji,
    faIcon: repo.faIcon,
    version: repo.latestTag || 'v0.0.0',
    originalId: repo.id,
    originalBaseSlug: repo.baseSlug,
    originalName: repo.name,
  }));

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

  const currentLibrary = libraries.find(isActiveRepo);

  const handleLibraryChange = (library: typeof libraries[0]) => {
    router.push(`/${library.name.toLowerCase()}`);
    onClose?.();
  };

  const handleVersionChange = (newVersion: string) => {
    const pathParts = pathname.split('/').filter(Boolean);
    const repoIndex = pathParts.findIndex((p) => p === currentRepo);

    if (repoIndex === -1) {
      router.push(`/${currentRepo}/${newVersion}`);
      return;
    }

    const slugParts = pathParts.slice(repoIndex + 2);
    const newPath = slugParts.length > 0
      ? `/${currentRepo}/${newVersion}/${slugParts.join('/')}`
      : `/${currentRepo}/${newVersion}`;

    router.push(newPath);
  };

  const groupVersionsByMinor = (versions: VersionInfo[]): Record<string, VersionInfo[]> => {
    const groups: Record<string, VersionInfo[]> = {};
    for (const version of versions) {
      if (version.tag === 'next') continue;
      const match = version.tag.match(/^v?(\d+\.\d+)/);
      if (match) {
        const minor = `v${match[1]}`;
        if (!groups[minor]) groups[minor] = [];
        groups[minor].push(version);
      }
    }
    return groups;
  };

  const currentVersionInfo = versions?.find((v) => v.tag === currentVersion);
  const displayVersionLabel = currentVersionInfo?.label || currentVersion;
  const groupedVersions = versions ? groupVersionsByMinor(versions) : {};
  const nextVersion = versions?.find((v) => v.tag === 'next');

  return (
    <aside className="w-full lg:w-64 h-full bg-panel border-r border-neutral-200 flex flex-col">
      <div className="p-4 pt-6 space-y-4 shrink-0">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div>
            <div className="font-bold text-neutral-900 text-lg">Kolosys</div>
            <div className="text-xs text-neutral-500 -mt-1.5">Documentation</div>
          </div>
        </Link>

        {/* Library Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-1">
            Library
          </label>
          <Listbox value={currentLibrary} onChange={handleLibraryChange}>
            <ListboxButton>
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {currentLibrary?.emoji && <Icon emoji={currentLibrary.emoji} size="md" />}
                <span className="truncate">{currentLibrary?.name || 'Select Library'}</span>
              </div>
              <Icon name="chevron-down" pack="basic" size="sm" className="shrink-0 text-gray-500" />
            </ListboxButton>
            <ListboxOptions>
              {libraries.map((lib) => (
                <ListboxOption key={lib.id} value={lib}>
                  <div className="flex items-center gap-2">
                    {lib.emoji && <Icon emoji={lib.emoji} size="sm" />}
                    <span className="flex-1">{lib.name}</span>
                    <span className="text-xs text-neutral-500">{lib.version}</span>
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        {/* Version Dropdown */}
        {currentVersion && versions && versions.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-1">
              Version
            </label>
            <Listbox value={currentVersion} onChange={handleVersionChange}>
              <ListboxButton>
                <div className="flex items-center gap-2 flex-1">
                  <span>{displayVersionLabel}</span>
                  {currentVersionInfo?.isLatest && (
                    <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                      latest
                    </span>
                  )}
                  {currentVersion === 'next' && (
                    <span className="px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded">
                      dev
                    </span>
                  )}
                </div>
                <Icon name="chevron-down" pack="basic" size="sm" className="shrink-0 text-neutral-500" />
              </ListboxButton>

              <ListboxOptions className="max-h-80">
                {nextVersion && (
                  <ListboxOption value="next">
                    <span>Next (Unreleased)</span>
                  </ListboxOption>
                )}

                {Object.entries(groupedVersions).map(([minor, minorVersions]) => (
                  <div key={minor}>
                    <div className="px-4 py-1.5 text-xs font-semibold text-neutral-500 uppercase">
                      {minor}
                    </div>
                    {minorVersions.map((version) => (
                      <ListboxOption key={version.tag} value={version.tag}>
                        <div className="flex items-center justify-between">
                          <span>{version.tag}</span>
                          {version.isLatest && (
                            <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                              latest
                            </span>
                          )}
                        </div>
                      </ListboxOption>
                    ))}
                  </div>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        )}
      </div>

      {/* Navigation Tree - Fills available space */}
      {navigation.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 pt-4 border-t border-neutral-200">
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
      <div className="shrink-0 px-4 py-4 border-t text-xs space-y-2 border-neutral-200">
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
          <h4 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            {toTitleCase(item.title)}
          </h4>
        ) : (
          <Link
            href={groupHref}
            onClick={onClose}
            className={`block px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 hover:text-neutral-700 transition-colors ${isActive
              ? 'text-primary-700'
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
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-neutral-700 hover:bg-neutral-100'
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
          ? 'bg-primary-50 text-primary-700 font-medium'
          : 'text-neutral-700 hover:bg-neutral-100'
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

