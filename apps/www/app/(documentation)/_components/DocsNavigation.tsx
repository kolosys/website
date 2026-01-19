'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { NavItem } from '@/lib/nav';
import type { LibraryData, VersionInfo } from '@kolosys-sites/hub-client';
import { Icon, Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@kolosys-sites/theme';

interface DocsNavigationProps {
  libraries: LibraryData[];
  currentRepo?: string;
  currentVersion?: string;
  navigation: NavItem[];
}

function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function DocsNavigation({
  libraries,
  currentRepo,
  currentVersion,
  navigation,
}: DocsNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (libraries.length === 0) {
    return <div className="p-4 text-neutral-500">No libraries found</div>;
  }

  const formattedLibraries = libraries.map((repo) => ({
    id: repo.id,
    name: toTitleCase(repo.name),
    emoji: repo.emoji,
    faIcon: repo.faIcon,
    version: repo.latestTag || 'v0.0.0',
    originalId: repo.id,
    originalBaseSlug: repo.baseSlug,
    originalName: repo.name,
    versions: repo.versions || [],
  }));

  const isActiveRepo = (lib: typeof formattedLibraries[0]) => {
    if (!currentRepo) return false;
    const currentRepoLower = currentRepo.toLowerCase();
    return (
      lib.id === currentRepo ||
      lib.originalId === currentRepo ||
      lib.originalBaseSlug === currentRepo ||
      lib.originalName.toLowerCase() === currentRepoLower
    );
  };

  const currentLibrary = formattedLibraries.find(isActiveRepo);

  const handleLibraryChange = (library: typeof formattedLibraries[0]) => {
    router.push(`/docs/${library.originalBaseSlug || library.originalName.toLowerCase()}/latest`);
  };

  const handleVersionChange = (newVersion: string) => {
    if (!currentRepo) return;
    const pathParts = pathname.split('/').filter(Boolean);
    const slugParts = pathParts.slice(3);
    const newPath = slugParts.length > 0
      ? `/docs/${currentRepo}/${newVersion}/${slugParts.join('/')}`
      : `/docs/${currentRepo}/${newVersion}`;
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

  const currentVersionInfo = currentLibrary?.versions.find((v) => v.tag === currentVersion);
  const displayVersionLabel = currentVersionInfo?.label || currentVersion;
  const groupedVersions = currentLibrary ? groupVersionsByMinor(currentLibrary.versions) : {};
  const nextVersion = currentLibrary?.versions.find((v) => v.tag === 'next');

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-4 shrink-0">
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
              {formattedLibraries.map((lib) => (
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
        {currentVersion && currentLibrary && currentLibrary.versions.length > 0 && (
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

      {/* Navigation Tree */}
      {navigation.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 pt-4 border-t border-neutral-200">
          <nav className="space-y-1 pb-4">
            {navigation.map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
                activePath={pathname}
              />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

const NavItemComponent: React.FC<{
  item: NavItem;
  activePath?: string;
}> = ({ item, activePath }) => {
  const hasChildren = item.children && item.children.length > 0;
  const pathname = usePathname();
  const effectiveActivePath = activePath || pathname;
  const isActive = effectiveActivePath === item.path;

  const groupHref = hasChildren && !item.hasIndex && item.children && item.children.length > 0
    ? item.children[0].path
    : item.path;

  if (hasChildren) {
    return (
      <div className="space-y-1 mb-6">
        {item.hasIndex ? (
          <h4 className="px-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            {toTitleCase(item.title)}
          </h4>
        ) : (
          <Link
            href={groupHref}
            className={`block px-1 text-xs font-semibold text-caption uppercase tracking-wider mb-2 hover:text-body transition-colors ${isActive ? 'text-active-text' : ''
              }`}
          >
            {toTitleCase(item.title)}
          </Link>
        )}
        <div className="space-y-0.5">
          {item.children!.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${activePath === child.path
                ? 'bg-active text-active-text font-medium'
                : 'text-body hover:bg-hover'
                }`}
            >
              {child.icon && <Icon emoji={child.icon} size="md" />}
              <span>{toTitleCase(child.title)}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <Link
        href={item.path}
        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${isActive
          ? 'bg-active text-active-text font-medium'
          : 'text-body hover:bg-hover'
          }`}
      >
        {item.icon && <Icon emoji={item.icon} size="md" />}
        <span>{item.title}</span>
      </Link>
    </div>
  );
};
