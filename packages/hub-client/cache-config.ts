export const CACHE_REVALIDATION = {
  LIBRARIES: 60 * 5, // 5 minutes
  NAVIGATION: 60 * 5, // 5 minutes
  PAGE: false, // On-demand only
} as const;

export const CACHE_TAGS = {
  libraries: () => ["documentation-libraries"],
  navigation: (repo: string, version: string) => [`navigation-${repo}-${version}`],
  page: (repo: string, version: string, slug: string) => [`page-${repo}-${version}-${slug}`],
} as const;
