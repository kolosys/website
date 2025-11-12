#!/usr/bin/env ts-node

import { config } from 'dotenv';
import { resolve } from 'path';
import { syncDocsForRepo } from '../lib/docs-loader';
import { docsConfig } from '@kolosys-sites/docs-sync/config';

// Load environment variables from root .env file
config({ path: resolve(__dirname, '../../../.env') });

async function main() {
  console.log('Syncing documentation from GitHub...\n');
  
  // Check if GITHUB_TOKEN is available
  if (!process.env.GITHUB_TOKEN) {
    console.warn('⚠️  GITHUB_TOKEN not found in environment variables.');
    console.warn('   You may hit rate limits. Set GITHUB_TOKEN in .env file at the root.\n');
  } else {
    console.log('✓ Using authenticated GitHub API (higher rate limits)\n');
  }
  
  for (const repo of docsConfig.repos) {
    console.log(`Syncing ${repo.displayName} (${repo.org}/${repo.repo})...`);
    try {
      await syncDocsForRepo(repo.repo);
      console.log(`✓ ${repo.displayName} synced successfully\n`);
    } catch (error) {
      console.error(`✗ Failed to sync ${repo.displayName}:`, error);
      console.error('Continuing with next repo...\n');
    }
  }
  
  console.log('Documentation sync complete!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

