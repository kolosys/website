import ky from "ky";
import type { LibraryData, LibraryPage } from "./types";

export type HubClientConfig = {
  apiUrl: string;
  apiKey: string;
  userAgent: string;
};

export function createHubClient(config: HubClientConfig) {
  const api = ky.create({
    prefixUrl: config.apiUrl,
    headers: {
      "x-api-key": config.apiKey,
      "User-Agent": config.userAgent,
    },
    timeout: 10000,
    retry: {
      limit: 2,
      methods: ["get"],
    },
    cache: "default",
  });

  return {
    async getDocumentationLibraries() {
      const response = await api
        .get<LibraryData[]>("api/content/docs")
        .json();
      return response;
    },

    async getFeaturedLibraries() {
      const response = await api
        .get<LibraryData[]>("api/content/featured")
        .json();
      return response;
    },

    async getDocumentationPage(
      id: string,
      slug?: string[],
      version: string = "latest"
    ) {
      const path = `api/content/docs/${id}/page`;
      const searchParams: Record<string, string> = { version };
      if (slug && slug.length > 0) {
        searchParams.slug = slug.join("/");
      }

      const response = await api
        .get<LibraryPage>(path, {
          searchParams,
        })
        .json();
      return response;
    },
  };
}
