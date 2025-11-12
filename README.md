# Kolosys Monorepo

A Turborepo monorepo containing the Kolosys websites: main landing page (www.kolosys.com) and documentation site (docs.kolosys.com).

## Structure

```
.
├── apps/
│   ├── www/              # Main landing page (www.kolosys.com)
│   └── docs/             # Documentation site (docs.kolosys.com)
├── packages/
│   ├── ui/               # Shared UI components
│   ├── config/           # Shared configuration (Tailwind, TypeScript)
│   └── docs-sync/        # GitHub docs synchronization utility
├── turbo.json            # Turborepo configuration
└── pnpm-workspace.yaml   # PNPM workspace configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Development

Run both apps in development mode:

```bash
pnpm dev
```

Run a specific app:

```bash
# Run www site (http://localhost:3000)
pnpm --filter www dev

# Run docs site (http://localhost:3001)
pnpm --filter docs dev
```

### Build

Build all apps:

```bash
pnpm build
```

Build a specific app:

```bash
pnpm --filter www build

# For docs site, this will automatically sync from GitHub first
pnpm --filter docs build
```

**Important for Docs Site:**  
The docs site fetches content from GitHub during build. Make sure:
1. `GITHUB_TOKEN` is set (for production)
2. Run `pnpm --filter docs sync-docs` to pre-fetch content if needed

## Apps

### www (Main Landing Page)

The main Kolosys landing page featuring:
- Hero section with CTAs
- Stats bar
- Library showcase grid
- Community section
- Footer with links

**Tech Stack:**
- Next.js 15 (App Router)
- Tailwind CSS
- TypeScript
- Lucide React icons

### docs (Documentation Site)

The documentation site with dynamic content from GitHub repositories:
- Three-column layout (sidebar, content, table of contents)
- Dynamic navigation from repo structure
- MDX support for rich markdown content
- Search functionality (FlexSearch)
- Syntax highlighting (Shiki)
- GitHub webhook integration
- Version management

**Tech Stack:**
- Next.js 15 (App Router)
- Tailwind CSS
- TypeScript
- next-mdx-remote
- FlexSearch
- Shiki
- Octokit

## Shared Packages

### @kolosys-sites/ui

Reusable React components:
- Button
- Card
- Badge

### @kolosys-sites/config

Shared configuration files:
- Tailwind config
- TypeScript config

### @kolosys-sites/docs-sync

Documentation synchronization utility:
- GitHub API integration
- Markdown parsing
- Navigation generation
- Webhook validation

## Documentation Sync

The docs site automatically syncs documentation from configured GitHub repositories.

### Configuration

Edit `packages/docs-sync/config.ts` to add/modify repositories:

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

### Manual Sync

Trigger a manual sync via API:

```bash
curl -X POST https://docs.kolosys.com/api/sync-docs \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"repo": "ion"}'
```

### GitHub Webhooks

Set up webhooks in each repository to trigger automatic syncs:

1. Go to repository Settings > Webhooks
2. Add webhook:
   - Payload URL: `https://docs.kolosys.com/api/webhook/github`
   - Content type: `application/json`
   - Secret: (same as WEBHOOK_SECRET env var)
   - Events: Just the push event
3. Save webhook

## Deployment

### Netlify Setup

Both sites are configured for Netlify deployment with separate sites:

**www.kolosys.com:**
- Base directory: `apps/www`
- Build command: `cd ../.. && pnpm install && pnpm turbo run build --filter=www`
- Publish directory: `apps/www/.next`

**docs.kolosys.com:**
- Base directory: `apps/docs`
- Build command: `cd ../.. && pnpm install && pnpm turbo run build --filter=docs`
- Publish directory: `apps/docs/.next`

### Environment Variables

For the docs site, set these in Netlify:

- `GITHUB_TOKEN`: GitHub API token for accessing repository docs
- `WEBHOOK_SECRET`: Secret for validating GitHub webhook signatures
- `SYNC_API_KEY`: API key for manual sync endpoint authentication

## Scripts

- `pnpm dev`: Run all apps in development mode
- `pnpm build`: Build all apps
- `pnpm lint`: Lint all apps
- `pnpm clean`: Clean build artifacts

## Tech Stack

- **Build System**: Turborepo
- **Package Manager**: pnpm
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Netlify

## License

MIT

