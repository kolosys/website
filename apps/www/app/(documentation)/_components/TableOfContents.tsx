'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface TocItem {
  id: string;
  title: string;
  level: number;
  index: number;
}

interface TableOfContentsProps {
  repo?: string;
  version?: string;
  status?: string;
  lastUpdated?: string;
}

export function TableOfContents({
  repo,
  version,
  status,
  lastUpdated
}: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const tocNavRef = useRef<HTMLDivElement | null>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setToc([]);
    setActiveId('');

    let intersectionObserver: IntersectionObserver | null = null;
    const timeouts: NodeJS.Timeout[] = [];

    const extractHeadings = (): boolean => {
      const headings = Array.from(
        document.querySelectorAll('article h2, article h3, main h2, main h3')
      ).map((heading, index) => {
        if (!heading.id) {
          const text = heading.textContent || '';
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `heading-${index}`;
          heading.id = id;
        }
        return {
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1)),
          index,
        };
      });

      const seenIds = new Set<string>();
      const uniqueHeadings = headings.filter((heading) => {
        if (seenIds.has(heading.id)) {
          return false;
        }
        seenIds.add(heading.id);
        return true;
      });

      if (uniqueHeadings.length > 0) {
        setToc(uniqueHeadings);

        if (intersectionObserver) {
          intersectionObserver.disconnect();
        }

        intersectionObserver = new IntersectionObserver(
          (entries) => {
            const visibleEntries = entries.filter(e => e.isIntersecting);
            if (visibleEntries.length > 0) {
              visibleEntries.sort((a, b) => {
                if (b.intersectionRatio !== a.intersectionRatio) {
                  return b.intersectionRatio - a.intersectionRatio;
                }
                const aRect = a.boundingClientRect;
                const bRect = b.boundingClientRect;
                return aRect.top - bRect.top;
              });
              const newActiveId = visibleEntries[0].target.id;
              setActiveId(newActiveId);
            }
          },
          {
            rootMargin: '-100px 0px -80% 0px',
            threshold: [0, 0.1, 0.5, 1.0]
          }
        );

        headings.forEach(({ id }) => {
          const element = document.getElementById(id);
          if (element) {
            intersectionObserver!.observe(element);
          }
        });

        observerRef.current = intersectionObserver;
        return true;
      }
      return false;
    };

    const tryExtractHeadings = () => {
      if (extractHeadings()) {
        return true;
      }
      return false;
    };

    if (!tryExtractHeadings()) {
      timeouts.push(setTimeout(() => {
        tryExtractHeadings();
      }, 100));

      timeouts.push(setTimeout(() => {
        tryExtractHeadings();
      }, 500));

      timeouts.push(setTimeout(() => {
        tryExtractHeadings();
      }, 1000));
    }

    const contentContainer = document.querySelector('article, main');
    if (contentContainer) {
      mutationObserverRef.current = new MutationObserver(() => {
        const timeoutId = setTimeout(() => {
          tryExtractHeadings();
        }, 100);
        timeouts.push(timeoutId);
      });

      mutationObserverRef.current.observe(contentContainer, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
      observerRef.current = null;
      mutationObserverRef.current = null;
    };
  }, [pathname]);

  useEffect(() => {
    if (activeId && activeItemRef.current && tocNavRef.current) {
      const navContainer = tocNavRef.current;
      const activeItem = activeItemRef.current;

      const navRect = navContainer.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      const itemTop = activeItem.offsetTop;
      const itemBottom = itemTop + activeItem.offsetHeight;
      const containerScrollTop = navContainer.scrollTop;
      const containerHeight = navContainer.clientHeight;

      if (itemTop < containerScrollTop) {
        navContainer.scrollTo({
          top: itemTop - 20,
          behavior: 'smooth'
        });
      } else if (itemBottom > containerScrollTop + containerHeight) {
        navContainer.scrollTo({
          top: itemBottom - containerHeight + 20,
          behavior: 'smooth'
        });
      }
    }
  }, [activeId]);

  return toc.length > 0 ? (
    <aside className="hidden xl:flex xl:flex-col w-64 shrink-0">
      <div className="sticky top-20 p-6 max-h-[calc(100vh-5rem)]">
        <h4 className="text-neutral-400 font-medium uppercase tracking-wider mb-3">
          On This Page
        </h4>
        <nav
          ref={tocNavRef}
          className="space-y-2 overflow-y-auto max-h-[calc(100vh-10rem)] pr-2 -mr-2 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
            {toc.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={`${item.id}-${index}`}
                  ref={isActive ? activeItemRef : null}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      window.history.pushState(null, '', `#${item.id}`);
                    }
                  }}
                  className={`block text-sm transition-colors ${isActive
                      ? 'text-primary-600 font-medium'
                      : 'text-neutral-600 hover:text-neutral-900'
                    } cursor-pointer`}
                  style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
                >
                  {item.title}
                </a>
              );
            })}
        </nav>
      </div>
    </aside>
  ) : null;
}
