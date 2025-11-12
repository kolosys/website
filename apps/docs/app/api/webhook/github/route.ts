import { NextRequest, NextResponse } from 'next/server';
import { DocsSync } from '@kolosys-sites/docs-sync';
import { docsConfig } from '@kolosys-sites/docs-sync/config';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('x-hub-signature-256');
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 401 }
      );
    }

    const body = await request.text();
    // Explicitly pass GITHUB_TOKEN to ensure it's used
    const docsSync = new DocsSync(process.env.GITHUB_TOKEN);
    
    const isValid = docsSync.validateWebhookSignature(
      body,
      signature,
      process.env.WEBHOOK_SECRET || ''
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const payload = JSON.parse(body);
    
    // Handle push events
    if (payload.ref && payload.repository) {
      const repoName = payload.repository.name;
      const branch = payload.ref.replace('refs/heads/', '');
      
      // Find matching repo config
      const repoConfig = docsConfig.repos.find(
        r => r.repo === repoName && r.branch === branch
      );

      if (!repoConfig) {
        return NextResponse.json({
          message: 'Repository not configured for sync',
          repo: repoName,
          branch,
        });
      }

      // Check if changes include docs folder
      const hasDocsChanges = payload.commits?.some((commit: any) =>
        [...(commit.added || []), ...(commit.modified || []), ...(commit.removed || [])]
          .some((file: string) => file.startsWith(repoConfig.docsPath.replace(/^\//, '')))
      );

      if (!hasDocsChanges) {
        return NextResponse.json({
          message: 'No docs changes detected',
          repo: repoName,
        });
      }

      // Trigger sync for this repo
      const docs = await docsSync.fetchDocs(repoConfig);
      
      // Revalidate paths
      revalidatePath(`/${repoConfig.route}`, 'layout');

      return NextResponse.json({
        success: true,
        repo: repoName,
        branch,
        docsCount: docs.length,
        message: 'Documentation synced successfully',
      });
    }

    return NextResponse.json({
      message: 'Event received but no action taken',
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

