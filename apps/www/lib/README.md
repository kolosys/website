# WWW ↔ Docs API Integration

This directory contains utilities for fetching content from the docs site API.

## Overview

The www site fetches real-time library data from the docs site through API endpoints. This ensures:
- Single source of truth (docs-sync)
- Real-time updates (versions, stars, descriptions, test coverage, CVEs)
- No duplication of sync logic
- Automated security and quality metrics

## API Endpoints

### Docs Site (`/api/libraries`)

**GET `/api/libraries`**
- Returns: List of all libraries with metadata
- Cache: 1 hour revalidation
- Used by: LibrariesSection, StatsBar

**GET `/api/libraries/[repo]`**
- Returns: Detailed information for a specific library
- Cache: 1 hour revalidation
- Used by: Future detailed pages

## Environment Configuration

The API base URL automatically switches based on environment:
- **Development**: `http://localhost:3001`
- **Production**: `https://docs.kolosys.com`

## Components Using API

### LibrariesSection (`/components/LibrariesSection.tsx`)
- Fetches all libraries via `getAllLibraries()`
- Displays real GitHub stars, versions, descriptions
- Shows test coverage and CVE status
- Falls back to hardcoded data if API unavailable

### StatsBar (`/components/StatsBar.tsx`)
- Fetches library statistics via `getLibraryStats()`
- Shows total libraries count, average test coverage, critical CVEs
- Dynamic values update automatically
- **Test Coverage**: Automatically extracted from GitHub Actions workflows or README badges
- **Critical CVEs**: Fetched from GitHub Security Advisories API

## Data Flow

```
GitHub Repos
    ↓
Docs Sync (docs site)
    ↓
Content Cache (docs site)
    ↓
API Endpoints (docs site)
    ↓
WWW Site Components
```

## Caching Strategy

- **Next.js ISR**: 1 hour revalidation (`revalidate: 3600`)
- **CDN Cache**: Public cache with stale-while-revalidate
- **Fallback Data**: Hardcoded data if API fails

## Usage Example

```typescript
import { getAllLibraries, getLibrary } from '@/lib/docs-api';

// Get all libraries
const libraries = await getAllLibraries();

// Get specific library
const ion = await getLibrary('ion');
```

## Data Sources

### Test Coverage
The docs-sync fetches test coverage from multiple sources (in order of priority):
1. **GitHub Actions workflows** - Extracts coverage from job names/logs
2. **README badges** - Parses coverage badges (Codecov, Coveralls, etc.)
3. **Fallback** - Returns undefined if no coverage data is found

### Critical CVEs
Security vulnerability data is fetched from:
1. **GitHub GraphQL API** - Fetches vulnerability alerts (preferred)
2. **GitHub REST API** - Falls back to security advisories endpoint
3. **Default** - Returns 0 if security features are not enabled

## Benefits

✅ Always up-to-date information  
✅ Reduced maintenance (one sync, two sites)  
✅ Better performance (cached data)  
✅ Graceful degradation (fallback data)  
✅ Automated security monitoring (CVEs)  
✅ Quality metrics (test coverage)  

