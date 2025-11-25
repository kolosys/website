'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DocsHeaderProps {
  onMenuClick?: () => void;
  repoUrl?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export const DocsHeader: React.FC<DocsHeaderProps> = ({ onMenuClick, repoUrl, breadcrumbs = [] }) => {
  return (
    <header className="sticky top-0 z-[60] w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm supports-backdrop-filter:bg-white/60">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
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
                          className="text-gray-600 hover:text-gray-900 transition-colors truncate"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={`truncate ${isLast ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {crumb.label}
                        </span>
                      )}
                      {!isLast && <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400 shrink-0" />}
                    </div>
                  );
                })}
              </nav>
            )}
          </div>

          <Link
            href={repoUrl || 'https://github.com/kolosys'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-black transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 shrink-0"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            <span className="hidden sm:inline">View on GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

