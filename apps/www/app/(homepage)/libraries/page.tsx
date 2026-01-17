'use client';

import { AppSection, AppContent, Icon, Button, Input } from "@kolosys-sites/theme";
import { getAllLibraries } from "@/actions/libraries";
import type { LibraryData } from "@kolosys-sites/hub-client";
import { useState, useEffect } from "react";

export default function LibrariesPage() {
    const [libraries, setLibraries] = useState<LibraryData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllLibraries().then((data) => {
            setLibraries(data);
            setIsLoading(false);
        });
    }, []);

    const filteredLibraries = libraries.filter((library) => {
        const query = searchQuery.toLowerCase();
        return (
            library.name.toLowerCase().includes(query) ||
            library.description?.toLowerCase().includes(query) ||
            library.topics?.some((topic) => topic.toLowerCase().includes(query))
        );
    });

    return (
        <AppContent>
            <AppSection className="py-16">
                <div className="container mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            Our Libraries
                        </h1>
                        <p className="text-lg text-caption max-w-3xl mx-auto mb-8">
                            Enterprise-grade Go libraries designed for high-performance applications.
                            Zero-allocation hot paths, minimal dependencies, and excellent developer experience.
                        </p>

                        {/* Search Box */}
                        <div className="max-w-xl mx-auto">
                            <div className="relative">
                                <Icon
                                    name="search"
                                    pack="basic"
                                    size="sm"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-caption pointer-events-none z-10"
                                />
                                <Input
                                    type="text"
                                    placeholder="Search libraries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-12 rounded-full"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-4 top-[5px] text-caption hover:text-foreground transition-colors z-10"
                                        aria-label="Clear search"
                                    >
                                        <Icon name="x" pack="basic" size="sm" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Libraries Grid */}
                    {isLoading ? (
                        <div className="text-center py-16">
                            <div className="animate-pulse">
                                <Icon name="box" pack="basic" size="lg" className="mx-auto mb-4 text-caption opacity-50" />
                                <p className="text-caption text-lg">Loading libraries...</p>
                            </div>
                        </div>
                    ) : filteredLibraries.length > 0 ? (
                        <>
                            {searchQuery && (
                                <p className="text-sm text-caption mb-4">
                                    Found {filteredLibraries.length} {filteredLibraries.length === 1 ? 'library' : 'libraries'}
                                </p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredLibraries.map((library) => (
                                    <LibraryCard key={library.id} library={library} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <Icon name="search" pack="basic" size="lg" className="mx-auto mb-4 text-caption opacity-50" />
                            <p className="text-caption text-lg mb-2">
                                {searchQuery ? `No libraries found matching "${searchQuery}"` : 'No libraries found'}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="text-primary-emphasis hover:text-primary-700 transition-colors text-sm font-medium"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </AppSection>
        </AppContent>
    );
}

const LibraryCard = ({ library }: { library: LibraryData }) => {
    const name = library.name;
    const version = library.latestTag || 'v0.0.0';
    const description = library.description || 'No description available';
    const tags = library.topics?.slice(0, 4) || [];
    const stars = library.stargazersCount;
    const githubUrl = `https://github.com/${library.fullName}`;
    const docsUrl = `/docs/${library.baseSlug || library.name.toLowerCase()}/latest`;

    return (
        <div className="group bg-surface rounded-lg border border-border p-6 hover:border-primary-emphasis hover:shadow-lg transition-all h-full flex flex-col">
            {/* Header with icon/emoji */}
            <div className="flex items-start gap-4 mb-4">
                {library.emoji ? (
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-linear-to-br from-primary-base to-primary-subtle rounded-lg">
                        <Icon emoji={library.emoji} size="lg" />
                    </div>
                ) : (
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-elevated rounded-lg border border-outline">
                        <Icon name="box" pack="basic" size="lg" className="text-caption" />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground mb-1 truncate group-hover:text-primary-emphasis transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            {version}
                        </span>
                        {stars !== undefined && stars > 0 && (
                            <div className="flex items-center gap-1 text-xs text-caption">
                                <Icon name="star" pack="basic" size="xs" className="text-yellow-400" />
                                <span>{stars.toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-caption mb-4 flex-1 line-clamp-3">
                {description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-elevated text-body text-xs rounded border border-outline"
                        >
                            {tag}
                        </span>
                    ))}
                    {library.topics && library.topics.length > 4 && (
                        <span className="px-2 py-1 text-caption text-xs">
                            +{library.topics.length - 4} more
                        </span>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                    variant="outline"
                    size="sm"
                    href={docsUrl}
                    className="flex-1 justify-center"
                >
                    <Icon name="book" pack="basic" size="sm" />
                    Docs
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 justify-center"
                >
                    <Icon name="code-alt" pack="basic" size="sm" />
                    GitHub
                </Button>
            </div>
        </div>
    );
};