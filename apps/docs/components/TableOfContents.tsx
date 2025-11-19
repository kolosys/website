'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  repo: string;
  version: string;
  status: string;
  lastUpdated: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  repo,
  version,
  status,
  lastUpdated
}) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timeouts: NodeJS.Timeout[] = [];

    // Wait for content to be rendered - use a small delay and retry mechanism
    const extractHeadings = () => {
      // Try both article and main content areas
      const headings = Array.from(
        document.querySelectorAll('article h2, article h3, main h2, main h3')
      ).map((heading, index) => {
        // Ensure heading has an ID
        if (!heading.id) {
          const text = heading.textContent || '';
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `heading-${index}`;
          heading.id = id;
        }
        return {
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1)),
        };
      });

      if (headings.length > 0) {
        setToc(headings);

        // Set up intersection observer for active heading
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            });
          },
          { rootMargin: '-100px 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
          const element = document.getElementById(id);
          if (element) observer!.observe(element);
        });

        return true;
      }
      return false;
    };

    // Try immediately
    if (!extractHeadings()) {
      // If no headings found, wait a bit and try again (content might still be loading)
      timeouts.push(setTimeout(() => {
        extractHeadings();
      }, 100));

      // Also try after a longer delay
      timeouts.push(setTimeout(() => {
        extractHeadings();
      }, 500));
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]); // Re-run when pathname changes

  return toc.length > 0 ? (
    <aside className="hidden xl:block w-64 sticky top-14 max-h-[calc(100vh-3.5rem)]">
      <div className="overflow-y-auto p-6">
        {/* On This Page */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            On This Page
          </h3>
          <nav className="space-y-2">
            {toc.map((item) => {
              const hasRealId = !item.id.startsWith('heading-');
              return (
                <a
                  key={item.id}
                  href={hasRealId ? `#${item.id}` : undefined}
                  className={`block text-sm transition-colors ${activeId === item.id
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                    } ${!hasRealId ? 'cursor-default' : 'cursor-pointer'}`}
                  style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
                >
                  {item.title}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

    </aside>
  ) : null;
};

