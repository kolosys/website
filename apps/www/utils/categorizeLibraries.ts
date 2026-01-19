import type { LibraryData } from "@kolosys-sites/hub-client";

export type LibraryCategory =
  | "All"
  | "Concurrency"
  | "Events"
  | "Time"
  | "Discord"
  | "Utils";

export const LIBRARY_CATEGORIES: LibraryCategory[] = [
  "All",
  "Concurrency",
  "Events",
  "Time",
  "Discord",
  "Utils",
];

/**
 * Categorizes a library based on its name, topics, and description
 */
export function categorizeLibrary(library: LibraryData): LibraryCategory[] {
  const categories: LibraryCategory[] = [];
  const name = library.name.toLowerCase();
  const description = library.description?.toLowerCase() || "";
  const topics = library.topics?.map((t) => t.toLowerCase()) || [];

  // Concurrency libraries
  if (
    name === "ion" ||
    name === "synapse" ||
    topics.includes("concurrency") ||
    topics.includes("pool") ||
    topics.includes("resource-pool") ||
    description.includes("pool") ||
    description.includes("concurrency")
  ) {
    categories.push("Concurrency");
  }

  // Events libraries
  if (
    name === "photon" ||
    name === "neuron" ||
    topics.includes("events") ||
    topics.includes("event-bus") ||
    topics.includes("pubsub") ||
    description.includes("event") ||
    description.includes("pubsub")
  ) {
    categories.push("Events");
  }

  // Time libraries
  if (
    name === "nova" ||
    topics.includes("time") ||
    topics.includes("timer") ||
    topics.includes("scheduling") ||
    description.includes("timer") ||
    description.includes("scheduling")
  ) {
    categories.push("Time");
  }

  // Discord libraries
  if (
    name === "axon" ||
    topics.includes("discord") ||
    topics.includes("bot") ||
    description.includes("discord")
  ) {
    categories.push("Discord");
  }

  // Utils (catch-all for utilities)
  if (
    topics.includes("utils") ||
    topics.includes("utilities") ||
    topics.includes("helpers") ||
    description.includes("utility") ||
    categories.length === 0 // If no other category matches
  ) {
    categories.push("Utils");
  }

  return categories;
}

/**
 * Filters libraries by category
 */
export function filterLibrariesByCategory(
  libraries: LibraryData[],
  category: LibraryCategory
): LibraryData[] {
  if (category === "All") {
    return libraries;
  }

  return libraries.filter((lib) => {
    const categories = categorizeLibrary(lib);
    return categories.includes(category);
  });
}

/**
 * Gets a library's tagline (one-liner value prop)
 */
export function getLibraryTagline(library: LibraryData): string {
  const taglines: Record<string, string> = {
    ion: "Connection pooling without the pain",
    photon: "Type-safe event handling made simple",
    neuron: "Lightweight message passing for Go",
    nova: "Precision timers with zero overhead",
    axon: "Discord bots that just work",
    synapse: "Goroutine coordination simplified",
    lumen: "Logging done right",
    proton: "High-performance primitives",
    helix: "DNA sequence analysis toolkit",
    cortex: "Neural network building blocks",
  };

  return taglines[library.name.toLowerCase()] || library.description;
}

/**
 * Gets use case tags for a library
 */
export function getLibraryUseCases(library: LibraryData): string[] {
  const useCases: Record<string, string[]> = {
    ion: ["Database", "HTTP Clients", "Caching"],
    photon: ["Real-time Apps", "Microservices", "Event Sourcing"],
    neuron: ["Actor Systems", "Message Queues", "Distributed Apps"],
    nova: ["Rate Limiting", "Scheduling", "Timeouts"],
    axon: ["Discord Bots", "Chat Apps", "Automation"],
    synapse: ["Concurrency", "Worker Pools", "Task Management"],
  };

  return useCases[library.name.toLowerCase()] || [];
}

/**
 * Checks if a library was published recently (within 30 days)
 */
export function isLibraryNew(library: LibraryData): boolean {
  if (!library.lastSync) return false;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const lastSyncDate = new Date(library.lastSync);
  return lastSyncDate > thirtyDaysAgo;
}

/**
 * Gets installation command for a library
 */
export function getInstallCommand(library: LibraryData): string {
  return `go get ${library.fullName}`;
}
