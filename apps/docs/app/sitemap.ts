import { MetadataRoute } from "next";
import { getLibraries, getLibrary } from "@/actions/libraries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }
  const libraries = await getLibraries();

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Add all repo landing pages
  for (const lib of libraries) {
    const repo = lib.baseSlug || lib.id;
    const lastSync = lib.lastSync ? new Date(lib.lastSync) : new Date();
    // Validate date
    const lastModified = isNaN(lastSync.getTime()) ? new Date() : lastSync;

    sitemapEntries.push({
      url: `${baseUrl}/${repo}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Add all doc pages for each repo
    try {
      const libraryData = await getLibrary(lib.id);
      if (libraryData?.navigation) {
        function extractSlugs(nav: any[], prefix: string[] = []): string[][] {
          const slugs: string[][] = [];
          for (const item of nav) {
            if (!item.hidden) {
              const slug = [...prefix, ...item.slug];
              if (slug.length > 0) {
                slugs.push(slug);
              }
              if (item.children && item.children.length > 0) {
                slugs.push(...extractSlugs(item.children, slug));
              }
            }
          }
          return slugs;
        }

        const slugs = extractSlugs(libraryData.navigation);
        for (const slug of slugs) {
          sitemapEntries.push({
            url: `${baseUrl}/${repo}/${slug.join("/")}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        }
      }
    } catch (error) {
      console.error(`Error generating sitemap for ${repo}:`, error);
    }
  }

  return sitemapEntries;
}
