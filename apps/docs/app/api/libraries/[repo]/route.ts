import { NextResponse } from 'next/server';
import { getRepoConfig, getRepoMetadata, generateNavigation } from '@/lib/docs-loader';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: Request,
  { params }: { params: Promise<{ repo: string }> }
) {
  try {
    const { repo } = await params;
    const config = getRepoConfig(repo);
    
    if (!config) {
      return NextResponse.json(
        { error: 'Library not found' },
        { status: 404 }
      );
    }

    const metadata = await getRepoMetadata(repo);
    const navigation = await generateNavigation(repo);

    const library = {
      id: repo,
      name: config.displayName,
      icon: config.icon,
      description: metadata?.description || 'No description available',
      version: metadata?.version || '0.0.0',
      stars: metadata?.stars || 0,
      lastUpdated: metadata?.lastUpdated || new Date().toISOString(),
      tags: metadata?.tags || [],
      topics: metadata?.topics || [],
      testCoverage: metadata?.testCoverage,
      criticalCVEs: metadata?.criticalCVEs ?? 0,
      githubUrl: `https://github.com/${config.org}/${config.repo}`,
      docsUrl: process.env.NODE_ENV === 'development'
        ? `http://localhost:3001/${repo}`
        : `https://docs.kolosys.com/${repo}`,
      navigation: navigation.map((item) => ({
        title: item.title,
        path: item.path,
        children: item.children?.map((child) => ({
          title: child.title,
          path: child.path,
        })),
      })),
    };

    return NextResponse.json({ library }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching library:', error);
    return NextResponse.json(
      { error: 'Failed to fetch library' },
      { status: 500 }
    );
  }
}

