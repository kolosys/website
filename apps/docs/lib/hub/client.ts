import ky from "ky";
import type { LibraryData, LibraryPage } from "./types";

const HUB_API_URL =
  process.env.HUB_API_URL ||
  process.env.NEXT_PUBLIC_HUB_API_URL ||
  "http://localhost:3002";

export const api = ky.create({
  prefixUrl: HUB_API_URL,
  headers: {
    "x-api-key": process.env.HUB_API_KEY || "",
    "User-Agent": "Kolosys/Docs",
  },
  timeout: 10000, // 10 second timeout
  retry: {
    limit: 2,
    methods: ["get"],
  },
  cache: "default",
});

export const getDocumentationLibraries = async () => {
  const response = await api
    .get<LibraryData[]>("api/content/docs", {
      next: {
        tags: ["documentation-libraries"],
        revalidate: 60 * 60, // 1 hour
      },
    })
    .json();
  return response;
};

export const getDocumentationPage = async (id: string, slug?: string[]) => {
  const path = `api/content/docs/${id}/page`;
  const searchParams: Record<string, string> = {};
  if (slug && slug.length > 0) {
    searchParams.slug = slug.join("/");
  }

  // Add caching for navigation requests (when slug is undefined)
  // Navigation changes less frequently than page content
  const cacheOptions =
    !slug || slug.length === 0
      ? {
          next: {
            tags: [`navigation-${id}`],
            revalidate: 60 * 60, // 1 hour cache for navigation
          },
        }
      : {};

  const response = await api
    .get<LibraryPage>(path, {
      searchParams,
      ...cacheOptions,
    })
    .json();
  return response;
};
