'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    // Extract headings from the page
    const headings = Array.from(
      document.querySelectorAll('article h2, article h3')
    ).map((heading, index) => ({
      id: heading.id || `heading-${index}`,
      title: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
    }));
    setToc(headings);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
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
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return toc.length > 0 ? (
    <aside className="hidden xl:block w-64 sticky top-14 h-[calc(100vh-3.5rem)] relative">
      <div className="h-full overflow-y-auto pb-64 p-6">
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
                  className={`block text-sm transition-colors ${
                    activeId === item.id
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

