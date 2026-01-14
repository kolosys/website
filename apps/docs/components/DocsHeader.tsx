'use client';

import Link from 'next/link';
import { Icon } from '@kolosys-sites/theme';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DocsHeaderProps {
  onMenuClick?: () => void;
  repoUrl?: string;
  breadcrumbs?: BreadcrumbItem[];
  versionSelector?: React.ReactNode;
}

export const DocsHeader: React.FC<DocsHeaderProps> = ({ onMenuClick, repoUrl, breadcrumbs = [], versionSelector }) => {
  return (
    <header className="sticky top-0 z-[60] w-full border-b border-neutral-200 bg-panel/95 backdrop-blur-sm supports-backdrop-filter:bg-panel/60">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              <Icon name="menu" pack="basic" size="md" />
            </button>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className="flex items-center gap-1 text-sm min-w-0">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <div key={index} className="flex items-center gap-1 min-w-0">
                      {crumb.href ? (
                        <Link
                          href={crumb.href}
                          className="text-neutral-600 hover:text-neutral-900 transition-colors truncate"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={`truncate ${isLast ? 'text-neutral-900 font-medium' : 'text-neutral-600'}`}>
                          {crumb.label}
                        </span>
                      )}
                      {!isLast && <Icon name="chevron-right" pack="basic" size="sm" className="text-neutral-400" />}
                    </div>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {versionSelector}

            <Link
            href={repoUrl || 'https://github.com/kolosys'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:text-foreground transition-colors border border-neutral-300 rounded-lg hover:bg-neutral-50 shrink-0"
          >
            <Icon name="github" pack="brands" size="sm" />
            <span className="hidden sm:inline">View on GitHub</span>
          </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

