import { MetadataRoute } from 'next';
import { getAvailableRepos, getAllDocSlugs } from '@/lib/docs-loader';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://docs.kolosys.com';
  const repos = getAvailableRepos();
  
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Add all repo landing pages
  for (const repo of repos) {
    sitemapEntries.push({
      url: `${baseUrl}/${repo}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Add all doc pages for each repo
    try {
      const slugs = await getAllDocSlugs(repo);
      for (const slug of slugs) {
        sitemapEntries.push({
          url: `${baseUrl}/${repo}/${slug.join('/')}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    } catch (error) {
      console.error(`Error generating sitemap for ${repo}:`, error);
    }
  }

  return sitemapEntries;
}

