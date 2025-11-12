import { NextRequest, NextResponse } from 'next/server';
import { DocsSync } from '@kolosys-sites/docs-sync';
import { docsConfig } from '@kolosys-sites/docs-sync/config';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify API key
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.SYNC_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { repo } = body;

    // Explicitly pass GITHUB_TOKEN to ensure it's used
    const docsSync = new DocsSync(process.env.GITHUB_TOKEN);
    
    // If specific repo is provided, sync only that repo
    if (repo) {
      const repoConfig = docsConfig.repos.find(r => r.repo === repo);
      if (!repoConfig) {
        return NextResponse.json(
          { error: 'Repository not found in config' },
          { status: 404 }
        );
      }

      const docs = await docsSync.fetchDocs(repoConfig);
      
      // Revalidate all paths for this repo
      revalidatePath(`/${repoConfig.route}`, 'layout');
      
      return NextResponse.json({
        success: true,
        repo: repoConfig.repo,
        docsCount: docs.length,
      });
    }

    // Sync all repos
    const results = await Promise.all(
      docsConfig.repos.map(async (repoConfig) => {
        const docs = await docsSync.fetchDocs(repoConfig);
        revalidatePath(`/${repoConfig.route}`, 'layout');
        return {
          repo: repoConfig.repo,
          docsCount: docs.length,
        };
      })
    );

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Sync failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

