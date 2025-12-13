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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const tocContainerRef = useRef<HTMLDivElement | null>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // Reset state when pathname changes
    setToc([]);
    setActiveId('');

    let intersectionObserver: IntersectionObserver | null = null;
    const timeouts: NodeJS.Timeout[] = [];

    // Extract headings from the DOM
    const extractHeadings = (): boolean => {
      // Try both article and main content areas - only include H2 and H3
      const headings = Array.from(
        document.querySelectorAll('article h2, article h3, main h2, main h3')
      ).map((heading, index) => {
        // Ensure heading has an ID (should be set by markdown component, but fallback)
        if (!heading.id) {
          const text = heading.textContent || '';
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `heading-${index}`;
          heading.id = id;
        }
        return {
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1)),
          index, // Add index for unique key generation
        };
      });

      // Deduplicate headings by ID (keep first occurrence)
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

        // Clean up previous observer
        if (intersectionObserver) {
          intersectionObserver.disconnect();
        }

        // Set up intersection observer for active heading
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            // Find the entry with the highest intersection ratio that's intersecting
            const visibleEntries = entries.filter(e => e.isIntersecting);
            if (visibleEntries.length > 0) {
              // Sort by intersection ratio and position
              visibleEntries.sort((a, b) => {
                if (b.intersectionRatio !== a.intersectionRatio) {
                  return b.intersectionRatio - a.intersectionRatio;
                }
                // If ratios are equal, prefer the one that appears first in the document
                const aRect = a.boundingClientRect;
                const bRect = b.boundingClientRect;
                return aRect.top - bRect.top;
              });
              const newActiveId = visibleEntries[0].target.id;
              setActiveId(newActiveId);

              // Auto-scroll active item into view in TOC
              setTimeout(() => {
                const activeElement = document.querySelector(`a[href="#${newActiveId}"]`);
                if (activeElement && tocContainerRef.current) {
                  const container = tocContainerRef.current;
                  const element = activeElement as HTMLElement;
                  const containerRect = container.getBoundingClientRect();
                  const elementRect = element.getBoundingClientRect();

                  // Check if element is outside visible area
                  if (elementRect.top < containerRect.top) {
                    // Scroll up to show element
                    container.scrollTo({
                      top: container.scrollTop + (elementRect.top - containerRect.top) - 20,
                      behavior: 'smooth'
                    });
                  } else if (elementRect.bottom > containerRect.bottom) {
                    // Scroll down to show element
                    container.scrollTo({
                      top: container.scrollTop + (elementRect.bottom - containerRect.bottom) + 20,
                      behavior: 'smooth'
                    });
                  }
                }
              }, 100);
            }
          },
          {
            rootMargin: '-100px 0px -80% 0px',
            threshold: [0, 0.1, 0.5, 1.0]
          }
        );

        // Observe all headings
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

    // Try to extract headings immediately
    const tryExtractHeadings = () => {
      if (extractHeadings()) {
        return true;
      }
      return false;
    };

    // Try immediately
    if (!tryExtractHeadings()) {
      // If no headings found, wait a bit and try again (content might still be loading)
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

    // Set up MutationObserver to watch for content changes
    const contentContainer = document.querySelector('article, main');
    if (contentContainer) {
      mutationObserverRef.current = new MutationObserver(() => {
        // Debounce the extraction
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
  }, [pathname]); // Re-run when pathname changes

  return toc.length > 0 ? (
    <aside className="hidden xl:flex w-64 sticky top-14 h-[calc(100vh-3.5rem)] xl:flex-col">
      <div
        ref={tocContainerRef}
        className="overflow-y-auto overflow-x-hidden p-6 toc-scrollbar flex-1"
        style={{ maxHeight: '100%' }}
      >
        {/* On This Page */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            On This Page
          </h3>
          <nav className="space-y-2">
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
                      // Update URL without scrolling
                      window.history.pushState(null, '', `#${item.id}`);
                    }
                  }}
                  className={`block text-sm transition-colors ${isActive
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                    } cursor-pointer`}
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

