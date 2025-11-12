import { DocsSync } from '@kolosys-sites/docs-sync';
import { docsConfig } from '@kolosys-sites/docs-sync/config';
import type { RepoMetadata } from '@kolosys-sites/docs-sync/types';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { config } from 'dotenv';

// Load environment variables from root .env file
config({ path: path.resolve(process.cwd(), '../../.env') });

export interface DocPage {
  slug: string[];
  title: string;
  description?: string;
  content: string;
  metadata: {
    description?: string;
    order?: number;
    version?: string;
    status?: string;
    lastUpdated?: string;
  };
}

export interface CachedRepoData {
  files: any[];
  metadata: RepoMetadata;
}

export interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
  order?: number;
}

const CACHE_DIR = path.join(process.cwd(), 'content');

/**
 * Ensure cache directory exists
 */
async function ensureCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

/**
 * Get cache file path for a repo
 */
function getCachePath(repo: string): string {
  return path.join(CACHE_DIR, `${repo}.json`);
}

/**
 * Fetch and cache docs from GitHub
 */
export async function syncDocsForRepo(repo: string): Promise<void> {
  const repoConfig = docsConfig.repos.find(r => r.repo === repo);
  if (!repoConfig) {
    throw new Error(`Repository ${repo} not found in config`);
  }

  // Explicitly pass GITHUB_TOKEN to ensure it's used
  const docsSync = new DocsSync(process.env.GITHUB_TOKEN);
  const result = await docsSync.fetchDocsWithMetadata(repoConfig);
  
  await ensureCacheDir();
  await fs.writeFile(
    getCachePath(repo),
    JSON.stringify(result, null, 2),
    'utf-8'
  );
}

/**
 * Get cached docs for a repo (with fallback to fetch)
 */
async function getCachedDocs(repo: string): Promise<CachedRepoData> {
  const cachePath = getCachePath(repo);
  
  try {
    const cached = await fs.readFile(cachePath, 'utf-8');
    const data = JSON.parse(cached);
    
    // Handle old cache format (just array of files)
    if (Array.isArray(data)) {
      return {
        files: data,
        metadata: {
          version: 'v0.0.0',
          lastUpdated: new Date().toISOString(),
        },
      };
    }
    
    return data as CachedRepoData;
  } catch (error) {
    // Cache miss - fetch from GitHub
    console.log(`📦 Fetching ${repo} from GitHub...`);
    await syncDocsForRepo(repo);
    const cached = await fs.readFile(cachePath, 'utf-8');
    return JSON.parse(cached);
  }
}

/**
 * Get all available repos
 */
export function getAvailableRepos(): string[] {
  return docsConfig.repos.map(r => r.repo);
}

/**
 * Get repo configuration
 */
export function getRepoConfig(repo: string) {
  return docsConfig.repos.find(r => r.repo === repo);
}

/**
 * Convert file path to slug array
 */
function pathToSlug(filePath: string, docsPath: string): string[] {
  // Normalize paths by removing leading slashes
  const normalizedDocsPath = docsPath.replace(/^\//, '');
  const normalizedFilePath = filePath.replace(/^\//, '');
  
  // Remove the docs path prefix and .md extension
  const relative = normalizedFilePath
    .replace(new RegExp(`^${normalizedDocsPath}/?`), '')
    .replace(/\.md$/, '');
  
  return relative.split('/').filter(Boolean);
}

/**
 * Get a specific doc page
 */
export async function getDocPage(repo: string, slug: string[]): Promise<DocPage | null> {
  const repoConfig = getRepoConfig(repo);
  if (!repoConfig) return null;

  const cachedData = await getCachedDocs(repo);
  const slugPath = slug.join('/');
  
  // Find the matching file
  const file = cachedData.files.find(f => {
    const fileSlug = pathToSlug(f.path, repoConfig.docsPath);
    return fileSlug.join('/') === slugPath;
  });

  if (!file) return null;

  const { data, content } = matter(file.content);
  
  return {
    slug,
    title: data.title || slug[slug.length - 1].replace(/-/g, ' '),
    content,
    metadata: {
      description: data.description,
      order: data.order,
      version: data.version || cachedData.metadata.version,
      status: data.status || 'Stable',
      lastUpdated: data.lastUpdated || new Date(cachedData.metadata.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    },
  };
}

/**
 * Generate navigation tree from files
 */
export async function generateNavigation(repo: string): Promise<NavItem[]> {
  const repoConfig = getRepoConfig(repo);
  if (!repoConfig) return [];

  const cachedData = await getCachedDocs(repo);
  const navMap = new Map<string, NavItem>();

  // Process each file
  for (const file of cachedData.files) {
    const slug = pathToSlug(file.path, repoConfig.docsPath);
    const { data } = matter(file.content);
    
    // Build path hierarchy
    let currentPath = '';
    for (let i = 0; i < slug.length; i++) {
      const segment = slug[i];
      const isFile = i === slug.length - 1;
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;
      
      if (!navMap.has(currentPath)) {
        const title = data.title || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        navMap.set(currentPath, {
          title,
          path: `/${repo}/${currentPath}`,
          order: data.order,
          children: isFile ? undefined : [],
        });
      }
    }
  }

  // Build tree structure
  const root: NavItem[] = [];
  const sorted = Array.from(navMap.entries())
    .sort((a, b) => {
      const orderA = a[1].order ?? 999;
      const orderB = b[1].order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a[0].localeCompare(b[0]);
    });

  for (const [path, item] of sorted) {
    const parts = path.split('/');
    if (parts.length === 1) {
      root.push(item);
    } else {
      const parentPath = parts.slice(0, -1).join('/');
      const parent = navMap.get(parentPath);
      if (parent && parent.children) {
        parent.children.push(item);
      }
    }
  }

  return root;
}

/**
 * Get all slugs for static generation
 */
export async function getAllDocSlugs(repo: string): Promise<string[][]> {
  const repoConfig = getRepoConfig(repo);
  if (!repoConfig) return [];

  try {
    const cachedData = await getCachedDocs(repo);
    return cachedData.files.map(f => pathToSlug(f.path, repoConfig.docsPath));
  } catch (error) {
    console.error(`Error getting slugs for ${repo}:`, error);
    return [['overview']]; // Fallback
  }
}

/**
 * Get metadata for a specific repo
 */
export async function getRepoMetadata(repo: string): Promise<RepoMetadata | null> {
  try {
    const cachedData = await getCachedDocs(repo);
    return cachedData.metadata;
  } catch (error) {
    console.error(`Error getting metadata for ${repo}:`, error);
    return null;
  }
}

/**
 * Get metadata for all repos
 */
export async function getAllReposMetadata(): Promise<Record<string, RepoMetadata>> {
  const repos = getAvailableRepos();
  const metadata: Record<string, RepoMetadata> = {};
  
  await Promise.all(
    repos.map(async (repo) => {
      const meta = await getRepoMetadata(repo);
      if (meta) {
        metadata[repo] = meta;
      }
    })
  );
  
  return metadata;
}

