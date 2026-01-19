"use client";

import { useState, useMemo } from "react";
import type { LibraryData } from "@kolosys-sites/hub-client";
import { LibraryCard } from "./LibraryCard";
import {
  LIBRARY_CATEGORIES,
  filterLibrariesByCategory,
  type LibraryCategory,
} from "@/utils/categorizeLibraries";
import { Icon } from "@kolosys-sites/theme";

type Props = {
  libraries: LibraryData[];
};

export function LibrariesGridClient({ libraries }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLibraries = useMemo(() => {
    let filtered = filterLibrariesByCategory(libraries, selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lib) =>
          lib.name.toLowerCase().includes(query) ||
          lib.description?.toLowerCase().includes(query) ||
          lib.topics?.some((topic) => topic.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [libraries, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {LIBRARY_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? "bg-primary-emphasis text-primary-text-on shadow-md"
                : "bg-surface text-caption hover:bg-hover hover:text-foreground border border-border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Icon
            name="search"
            pack="basic"
            size="sm"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-caption"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search libraries..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-foreground placeholder:text-caption focus:outline-none focus:ring-2 focus:ring-primary-emphasis"
          />
        </div>
      </div>

      {/* Libraries Grid */}
      {filteredLibraries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLibraries.map((library) => (
            <LibraryCard key={library.id} library={library} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon emoji="🔍" size="lg" className="mb-4 opacity-50" />
          <p className="text-caption text-lg">
            No libraries found matching your criteria
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 text-primary-emphasis hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
