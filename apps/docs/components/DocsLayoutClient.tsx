'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { DocsHeader } from './DocsHeader';
import { DocsSidebar } from './DocsSidebar';
import { TableOfContents } from './TableOfContents';
import { VersionSelector } from './VersionSelector';
import type { LibraryData, VersionInfo } from '@/lib/hub/types';
import type { NavItem } from '@/lib/nav';

interface DocsLayoutClientProps {
  children: React.ReactNode;
  currentRepo: string;
  currentVersion?: string;
  versions?: VersionInfo[];
  navigation: NavItem[];
  libraries: LibraryData[];
  repoUrl?: string;
}

// This component receives navigation from the server layout
// The layout persists across route changes, so navigation stays cached server-side
// Navigation is fetched once per repo and cached by Next.js
export function DocsLayoutClient({
  children,
  currentRepo,
  currentVersion,
  versions,
  navigation,
  libraries,
  repoUrl,
}: DocsLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const breadcrumbs = pathname.split('/').filter(Boolean).map((segment, index, segments) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: index < segments.length - 1 ? href : undefined,
    };
  });

  // Get metadata from library
  const library = libraries.find(lib =>
    lib.id === currentRepo ||
    lib.baseSlug === currentRepo ||
    lib.name.toLowerCase() === currentRepo.toLowerCase()
  );

  const metadata = {
    version: currentVersion || library?.latestTag || 'v0.0.0',
    status: currentVersion === 'next' ? 'Unreleased' : 'Stable',
    lastUpdated: library?.lastSync
      ? new Date(library.lastSync).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      : 'N/A',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar - rendered from persistent layout, navigation is cached server-side */}
      <div className={`
        fixed lg:fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)]
        lg:top-0 lg:h-screen
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <DocsSidebar
          currentRepo={currentRepo}
          navigation={navigation}
          activePath={pathname}
          libraries={libraries}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header and Content Container - offset for sidebar on desktop */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header - sticky */}
        <DocsHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          repoUrl={repoUrl}
          breadcrumbs={breadcrumbs}
          versionSelector={
            currentVersion && versions && versions.length > 0 ? (
              <VersionSelector
                currentVersion={currentVersion}
                versions={versions}
                repo={currentRepo}
              />
            ) : undefined
          }
        />

        {/* Main Content and TOC Container */}
        <div className="flex-1">
          <div className="flex gap-8 px-4 pt-0 sm:px-6 lg:px-8 py-6 max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
            <main className="flex-1 min-w-0 pt-4">
              {children}
            </main>

            {/* Table of Contents */}
            <TableOfContents
              repo={currentRepo}
              version={metadata.version}
              status={metadata.status}
              lastUpdated={metadata.lastUpdated}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

