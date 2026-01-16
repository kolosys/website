'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@kolosys-sites/theme';

interface NavItem {
  id: string;
  label: string;
}

interface ComponentNavProps {
  items: NavItem[];
}

export function ComponentNav({ items }: ComponentNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null;

    // Set up intersection observer for active section tracking
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

          // Auto-scroll active item into view in sidebar
          setTimeout(() => {
            const activeElement = document.querySelector(`a[href="#${newActiveId}"]`);
            if (activeElement && navContainerRef.current) {
              const container = navContainerRef.current;
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

    // Observe all sections
    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        intersectionObserver!.observe(element);
      }
    });

    observerRef.current = intersectionObserver;

    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      observerRef.current = null;
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav ref={navContainerRef} className="sticky space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick(item.id);
          }}
          className={cn(
            "block px-3 py-2 text-sm rounded-md transition-colors",
            activeId === item.id
              ? "bg-primary-50 text-primary-700 font-medium"
              : "text-body hover:bg-neutral-50 hover:text-foreground"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
