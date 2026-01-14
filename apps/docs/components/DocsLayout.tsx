'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { DocsHeader } from './DocsHeader';
import { DocsSidebar } from './DocsSidebar';
import { TableOfContents } from './TableOfContents';
import type { LibraryData } from '@/lib/hub/types';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DocsLayoutProps {
  children: React.ReactNode;
  currentRepo: string;
  navigation: any[];
  activePath?: string;
  metadata?: {
    version: string;
    status: string;
    lastUpdated: string;
  };
  repoUrl?: string;
  breadcrumbs?: BreadcrumbItem[];
  libraries: LibraryData[];
}

// Client-side cache for navigation per repo (persists across navigations)
const navigationCache = new Map<string, any[]>();

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  children,
  currentRepo,
  navigation,
  activePath,
  metadata = {
    version: 'v0.1.1',
    status: 'Stable',
    lastUpdated: 'Nov 10, 2025',
  },
  repoUrl,
  breadcrumbs = [],
  libraries,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize from cache immediately if available, otherwise use prop
  // This prevents the sidebar from going blank during navigation
  const [cachedNavigation, setCachedNavigation] = useState(() => {
    // Always prioritize cache if available for this repo
    if (navigationCache.has(currentRepo)) {
      const cached = navigationCache.get(currentRepo)!;
      // Only use prop if cache is empty and prop has data
      if (cached.length > 0) {
        return cached;
      }
    }
    // Cache it immediately if prop has data
    if (navigation.length > 0) {
      navigationCache.set(currentRepo, navigation);
      return navigation;
    }
    // Fallback: return empty array or cached if available
    return navigationCache.get(currentRepo) || navigation;
  });
  
  const lastRepoRef = useRef(currentRepo);
  
  // Update cached navigation when repo changes or navigation updates
  useEffect(() => {
    if (currentRepo !== lastRepoRef.current) {
      // Repo changed - always check cache first
      if (navigationCache.has(currentRepo)) {
        const cached = navigationCache.get(currentRepo)!;
        if (cached.length > 0) {
          setCachedNavigation(cached);
        } else if (navigation.length > 0) {
          // Cache was empty, use prop
          navigationCache.set(currentRepo, navigation);
          setCachedNavigation(navigation);
        }
      } else {
        // New repo - use prop and cache it
        if (navigation.length > 0) {
          navigationCache.set(currentRepo, navigation);
          setCachedNavigation(navigation);
        }
      }
      lastRepoRef.current = currentRepo;
    } else {
      // Same repo - only update if we have new navigation data and cache is empty
      // OR if navigation prop has data and cache doesn't exist
      if (navigation.length > 0) {
        if (!navigationCache.has(currentRepo) || navigationCache.get(currentRepo)!.length === 0) {
          navigationCache.set(currentRepo, navigation);
          setCachedNavigation(navigation);
        }
        // If cache exists and has data, don't update state to prevent re-renders
      } else if (navigationCache.has(currentRepo)) {
        // Prop is empty but cache exists - keep using cache
        const cached = navigationCache.get(currentRepo)!;
        if (cached.length > 0) {
          setCachedNavigation(cached);
        }
      }
    }
  }, [currentRepo, navigation]);

  return (
    <div className="min-h-screen bg-panel">
      {/* Sidebar */}
      <div className={`
        fixed lg:fixed top-0 left-0 z-50 h-screen
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <DocsSidebar
          currentRepo={currentRepo}
          navigation={cachedNavigation}
          activePath={activePath}
          onClose={() => setSidebarOpen(false)}
          libraries={libraries}
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
        />
        
        {/* Main Content and TOC Container */}
        <div className="flex-1">
          <div className="flex gap-8 px-4 pt-0 sm:px-6 lg:px-8 py-6 max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
            <main className="flex-1 min-w-0">
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
};

