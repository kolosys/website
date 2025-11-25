'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  repo: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  results?: SearchResult[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, results = [] }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const [isMounted, setIsMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle mounting for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update dropdown position
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${Math.max(rect.width, 320)}px`, // Minimum 320px width
        maxWidth: 'calc(100vw - 2rem)', // Prevent overflow on mobile
      });
    }
  }, [isOpen, results]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: 'fixed',
          top: `${rect.bottom + 8}px`,
          left: `${rect.left}px`,
          width: `${Math.max(rect.width, 320)}px`,
          maxWidth: 'calc(100vw - 2rem)',
        });
      }
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0);
    onSearch?.(value);
  };

  const renderDropdown = () => {
    if (!isOpen || !isMounted) return null;

    const dropdown = (
      <>
        {results.length > 0 && (
          <div
            style={dropdownStyle}
            className="z-[9999] bg-white border border-gray-200 rounded-lg shadow-sm-xl max-h-[70vh] overflow-y-auto"
          >
            {results.map((result) => (
              <a
                key={result.id}
                href={result.url}
                className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500 font-medium">{result.repo}</span>
                  <span className="text-sm font-semibold text-gray-900">{result.title}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{result.content}</p>
              </a>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div
            style={dropdownStyle}
            className="z-[9999] bg-white border border-gray-200 rounded-lg shadow-sm-xl p-4"
          >
            <p className="text-sm text-gray-500">No results found for &quot;{query}&quot;</p>
          </div>
        )}
      </>
    );

    return createPortal(dropdown, document.body);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {renderDropdown()}
    </div>
  );
};

