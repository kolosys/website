'use client';

import { useState } from 'react';
import { DocsHeader } from './DocsHeader';
import { DocsSidebar } from './DocsSidebar';
import { TableOfContents } from './TableOfContents';

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
  allReposMetadata?: Record<string, { version: string; lastUpdated: string }>;
  breadcrumbs?: BreadcrumbItem[];
}

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
  allReposMetadata = {},
  breadcrumbs = [],
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <div className={`
        fixed lg:fixed top-0 left-0 z-50 h-screen
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <DocsSidebar
          currentRepo={currentRepo}
          navigation={navigation}
          activePath={activePath}
          onClose={() => setSidebarOpen(false)}
          allReposMetadata={allReposMetadata}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header - offset for sidebar on desktop */}
      <div className="lg:ml-64">
        <DocsHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          repoUrl={repoUrl}
          breadcrumbs={breadcrumbs}
        />
      </div>
      
      {/* Main Content and TOC Container */}
      <div className="lg:ml-64">
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
  );
};

