'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItemButton,
  MenuSection,
} from '@kolosys-sites/theme';
import type { VersionInfo } from '@/lib/hub/types';

interface VersionSelectorProps {
  currentVersion: string;
  versions: VersionInfo[];
  repo: string;
}

function groupByMinor(versions: VersionInfo[]): Record<string, VersionInfo[]> {
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
}

export function VersionSelector({
  currentVersion,
  versions,
  repo,
}: VersionSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const groupedVersions = groupByMinor(versions);

  const handleVersionChange = (newVersion: string) => {
    const pathParts = pathname.split('/').filter(Boolean);
    const repoIndex = pathParts.findIndex((p) => p === repo);

    if (repoIndex === -1) {
      router.push(`/${repo}/${newVersion}`);
      return;
    }

    const slugParts = pathParts.slice(repoIndex + 2);
    const newPath =
      slugParts.length > 0
        ? `/${repo}/${newVersion}/${slugParts.join('/')}`
        : `/${repo}/${newVersion}`;

    router.push(newPath);
  };

  const currentVersionInfo = versions.find((v) => v.tag === currentVersion);
  const displayLabel = currentVersionInfo?.label || currentVersion;
  const nextVersion = versions.find((v) => v.tag === 'next');

  return (
    <Menu>
      <MenuButton className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
        <span>{displayLabel}</span>
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
        <svg
          className="w-4 h-4 transition-transform ui-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </MenuButton>

      <MenuItems className="w-56 max-h-80 overflow-auto">
        {nextVersion && (
          <MenuSection>
            <MenuItemButton
              onClick={() => handleVersionChange('next')}
              className={currentVersion === 'next' ? 'bg-blue-50 text-blue-700' : ''}
            >
              Next (Unreleased)
            </MenuItemButton>
          </MenuSection>
        )}

        {Object.entries(groupedVersions).map(([minor, minorVersions]) => (
          <MenuSection key={minor}>
            <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase">
              {minor}
            </div>
            {minorVersions.map((version) => (
              <MenuItemButton
                key={version.tag}
                onClick={() => handleVersionChange(version.tag)}
                className={`flex items-center justify-between ${
                  currentVersion === version.tag ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                <span>{version.tag}</span>
                {version.isLatest && (
                  <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                    latest
                  </span>
                )}
              </MenuItemButton>
            ))}
          </MenuSection>
        ))}

        {Object.keys(groupedVersions).length === 0 && !nextVersion && (
          <div className="px-4 py-3 text-sm text-gray-500">
            No versions available
          </div>
        )}
      </MenuItems>
    </Menu>
  );
}
