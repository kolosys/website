# @kolosys-sites/docs-sync

Comprehensive documentation synchronization utility for fetching content and metadata from GitHub repositories.

## Features

- 📄 **Documentation Sync** - Fetch markdown files from GitHub repositories
- 📊 **Repository Metadata** - Versions, stars, descriptions, topics, tags
- 🧪 **Test Coverage** - Automatically extract test coverage from workflows and README badges
- 🔒 **Security Monitoring** - Fetch critical CVE counts from GitHub Security Advisories
- 🌳 **Navigation Generation** - Automatic navigation tree from directory structure
- ⚡ **Parallel Fetching** - Concurrent API calls for better performance

## Installation

```bash
pnpm add @kolosys-sites/docs-sync
```

## Usage

### Basic Setup

```typescript
import { DocsSync } from '@kolosys-sites/docs-sync/sync';
import { RepoConfig } from '@kolosys-sites/docs-sync/types';

const docsSync = new DocsSync(process.env.GITHUB_TOKEN);

const config: RepoConfig = {
  org: 'kolosys',
  repo: 'ion',
  branch: 'main',
  docsPath: '/docs',
  route: 'ion',
  displayName: 'Ion',
  icon: '⚡',
};
```

### Fetch Documentation Files

```typescript
const files = await docsSync.fetchDocs(config);
// Returns: DocFile[]
```

### Fetch Repository Metadata

```typescript
const metadata = await docsSync.fetchRepoMetadata(config);
// Returns: {
//   version: string;
//   lastUpdated: string;
//   stars: number;
//   description: string;
//   tags: string[];
//   topics: string[];
//   testCoverage?: number;
//   criticalCVEs: number;
// }
```

### Fetch Everything Together

```typescript
const { files, metadata } = await docsSync.fetchDocsWithMetadata(config);
```

## Metadata Features

### Test Coverage Extraction

The sync utility automatically extracts test coverage from multiple sources:

1. **GitHub Actions Workflows**
   - Scans recent successful workflow runs
   - Looks for jobs with "test" or "coverage" in the name
   - Extracts coverage percentage from job names

2. **README Badges**
   - Parses coverage badges from README.md
   - Supports Codecov, Coveralls, and generic coverage badges
   - Uses regex patterns to extract percentage

**Example:**
```typescript
const metadata = await docsSync.fetchRepoMetadata(config);
console.log(metadata.testCoverage); // 95 (percentage)
```

### Critical CVE Detection

Security vulnerability monitoring via GitHub Security Advisories:

1. **GraphQL API (Preferred)**
   - Fetches vulnerability alerts with severity levels
   - Filters for CRITICAL severity
   - Counts open vulnerabilities

2. **REST API (Fallback)**
   - Uses Security Advisories endpoint
   - Filters for critical severity advisories

**Example:**
```typescript
const metadata = await docsSync.fetchRepoMetadata(config);
console.log(metadata.criticalCVEs); // 0 (count of critical CVEs)
```

**Note:** Requires repository to have security features enabled and appropriate API permissions.

## API Reference

### `DocsSync`

#### Constructor
```typescript
new DocsSync(githubToken?: string)
```

#### Methods

##### `fetchDocs(config: RepoConfig): Promise<DocFile[]>`
Fetches all markdown files from the specified repository's docs folder.

##### `fetchRepoMetadata(config: RepoConfig): Promise<RepoMetadata>`
Fetches comprehensive repository metadata including:
- Latest version (from releases/tags)
- Last update timestamp
- Star count
- Description
- All tags
- Topics
- Test coverage (auto-detected)
- Critical CVE count

##### `fetchDocsWithMetadata(config: RepoConfig): Promise<RepoWithMetadata>`
Fetches both docs and metadata in parallel for better performance.

##### `parseMetadata(content: string): { metadata: DocMetadata; content: string }`
Parses frontmatter from markdown content.

##### `generateNavigation(files: DocFile[], docsPath: string): NavigationItem[]`
Generates a nested navigation tree from file paths.

## Types

### `RepoConfig`
```typescript
interface RepoConfig {
  org: string;          // GitHub organization
  repo: string;         // Repository name
  branch: string;       // Branch to fetch from
  docsPath: string;     // Path to docs folder
  route: string;        // URL route slug
  icon?: string;        // Display icon
  displayName: string;  // Human-readable name
}
```

### `RepoMetadata`
```typescript
interface RepoMetadata {
  version: string;
  lastUpdated: string;
  stars?: number;
  description?: string;
  tags?: string[];
  topics?: string[];
  testCoverage?: number;    // Percentage (0-100)
  criticalCVEs?: number;    // Count of critical CVEs
}
```

### `DocFile`
```typescript
interface DocFile {
  path: string;    // File path in repository
  content: string; // File content
  sha: string;     // Git SHA
}
```

## Environment Variables

```bash
GITHUB_TOKEN=ghp_your_token_here
```

**Required Scopes:**
- `repo` - Access repository content
- `security_events` - Read security advisories (for CVE detection)
- `actions:read` - Read workflow runs (for test coverage)

## Error Handling

The sync utility gracefully handles errors:

- **Missing Coverage Data**: Returns `undefined` for `testCoverage`
- **Security API Unavailable**: Returns `0` for `criticalCVEs` with warning
- **Network Errors**: Logs errors and returns sensible defaults

## Performance

- **Parallel Fetching**: Metadata components fetched concurrently
- **Caching**: Designed to work with caching layers (not included)
- **Rate Limiting**: Respects GitHub API rate limits with authentication

## Examples

### Complete Sync Script

```typescript
import { DocsSync } from '@kolosys-sites/docs-sync/sync';
import { docsConfig } from './docs.config';

async function syncAllDocs() {
  const docsSync = new DocsSync(process.env.GITHUB_TOKEN);
  
  for (const repoConfig of docsConfig.repos) {
    console.log(`Syncing ${repoConfig.displayName}...`);
    
    const { files, metadata } = await docsSync.fetchDocsWithMetadata(repoConfig);
    
    console.log(`✓ ${files.length} files`);
    console.log(`✓ Version: ${metadata.version}`);
    console.log(`✓ Stars: ${metadata.stars}`);
    console.log(`✓ Coverage: ${metadata.testCoverage || 'N/A'}%`);
    console.log(`✓ Critical CVEs: ${metadata.criticalCVEs}`);
    
    // Save to cache, database, or file system
    await saveToCache(repoConfig.route, { files, metadata });
  }
}

syncAllDocs();
```

## Best Practices

1. **Use GitHub Token**: Always provide a personal access token to avoid rate limits
2. **Cache Results**: Store synced data and revalidate periodically (e.g., hourly)
3. **Error Handling**: Implement retry logic for transient failures
4. **Monitoring**: Track sync failures and API rate limit usage
5. **Security**: Store GitHub token securely (env vars, secrets management)

## Troubleshooting

### "Unable to fetch CVE data"
- Ensure repository has security features enabled
- Verify GitHub token has `security_events` scope
- Check if repository is private (requires additional permissions)

### "Test coverage not found"
- Add coverage badges to README.md
- Include coverage percentage in workflow job names
- Consider using explicit coverage reporting tools

### Rate Limiting
- Use authenticated requests with GitHub token
- Implement caching to reduce API calls
- Consider GitHub Apps for higher rate limits

## License

MIT

