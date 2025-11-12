import { NextResponse } from 'next/server';
import { getAvailableRepos, getAllReposMetadata, getRepoConfig } from '@/lib/docs-loader';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const repos = getAvailableRepos();
    const allMetadata = await getAllReposMetadata();
    
    const libraries = repos.map((repo) => {
      const config = getRepoConfig(repo);
      const metadata = allMetadata[repo];
      
      return {
        id: repo,
        name: config?.displayName || repo,
        icon: config?.icon || '📦',
        description: metadata?.description || 'No description available',
        version: metadata?.version || '0.0.0',
        stars: metadata?.stars || 0,
        lastUpdated: metadata?.lastUpdated || new Date().toISOString(),
        tags: metadata?.tags || [],
        topics: metadata?.topics || [],
        testCoverage: metadata?.testCoverage,
        criticalCVEs: metadata?.criticalCVEs ?? 0,
        githubUrl: `https://github.com/${config?.org}/${config?.repo}`,
        docsUrl: `https://docs.kolosys.com/${repo}`,
      };
    });

    return NextResponse.json({ libraries }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching libraries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch libraries' },
      { status: 500 }
    );
  }
}

