# Kolosys Documentation Site

Dynamic documentation site that syncs content from GitHub repositories.

## How It Works

### 1. Configuration

Edit `packages/docs-sync/config.ts` to configure which repositories to sync:

```typescript
{
  org: 'kolosys',
  repo: 'ion',
  branch: 'main',
  docsPath: '/docs',
  route: '/ion',
  icon: '⚡',
  displayName: 'Ion',
}
```

### 2. Documentation Structure in Repos

Each repository should have a `/docs` folder with markdown files:

```
/docs/
  overview.md           # Main overview page
  getting-started/
    installation.md
    quick-start.md
  core-concepts/
    worker-pools.md
    semaphores.md
```

### 3. Markdown Frontmatter

Add metadata to markdown files:

```markdown
---
title: "Worker Pools"
description: "Learn about worker pools in Ion"
order: 1
version: "v0.1.1"
status: "Stable"
---

# Your content here
```

### 4. Build Process

**Development:**
```bash
pnpm dev
```

**Production Build:**
```bash
# Syncs docs from GitHub and builds
pnpm build

# Or manually sync first
pnpm sync-docs
pnpm build
```

### 5. Manual Sync During Development

If you need to refresh docs during development:

```bash
pnpm sync-docs
```

Then restart the dev server.

### 6. How Navigation Works

- Folder structure becomes collapsible sections
- Markdown files become navigation links
- `order` in frontmatter controls sort order
- Navigation is auto-generated per repository

### 7. Environment Variables

For production (Netlify):

```env
GITHUB_TOKEN=your_github_token_here
WEBHOOK_SECRET=your_webhook_secret_here
SYNC_API_KEY=your_api_key_here
```

### 8. Webhook Integration

Set up GitHub webhooks in each repo:
- Payload URL: `https://docs.kolosys.com/api/webhook/github`
- Events: Push events to main branch
- Secret: Same as `WEBHOOK_SECRET` env var

When docs are pushed to GitHub, the webhook triggers a rebuild.

## Features

- ✅ **Dynamic MDX Content**: Fetched from GitHub repos
- ✅ **Auto-generated Navigation**: Based on repo structure
- ✅ **Search**: FlexSearch integration
- ✅ **Three-Column Layout**: Sidebar, content, table of contents
- ✅ **Syntax Highlighting**: Shiki for code blocks
- ✅ **Responsive Design**: Mobile-friendly with collapsible sidebars

## Content Cache

Docs are cached in the `/content` directory during build:
- `content/ion.json`
- `content/nova.json`
- etc.

This ensures fast builds and allows offline development.

## Troubleshooting

**Docs not showing:**
1. Run `pnpm sync-docs` to fetch from GitHub
2. Check that `GITHUB_TOKEN` has proper permissions
3. Verify repo configuration in `packages/docs-sync/config.ts`

**Navigation not appearing:**
1. Ensure `/docs` folder exists in the repo
2. Check markdown files have `.md` extension
3. Verify folder structure matches expected format

**Build fails:**
1. Check GitHub API rate limits
2. Verify all configured repos are accessible
3. Ensure `GITHUB_TOKEN` is valid

