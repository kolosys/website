import ky from "ky";
import type { LibraryData } from "./types";

const HUB_API_URL =
  process.env.HUB_API_URL ||
  process.env.NEXT_PUBLIC_HUB_API_URL ||
  "http://localhost:3002";

const HUB_API_KEY = process.env.HUB_API_KEY || "";

console.log({ HUB_API_URL, HUB_API_KEY });

const api = ky.create({
  prefixUrl: HUB_API_URL,
  headers: {
    "x-api-key": process.env.HUB_API_KEY || "",
    "User-Agent": "Kolosys/Home",
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

export const getFeaturedLibraries = async () => {
  const response = await api
    .get<LibraryData[]>("api/content/featured", {
      next: {
        tags: ["featured-libraries"],
        revalidate: 60 * 60, // 1 hour
      },
    })
    .json();
  return response;
};

export default {
  getDocumentationLibraries,
  getFeaturedLibraries,
};
