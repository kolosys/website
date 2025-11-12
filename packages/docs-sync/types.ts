export interface RepoConfig {
  org: string;
  repo: string;
  branch: string;
  docsPath: string;
  route: string;
  icon?: string;
  displayName: string;
}

export interface DocsConfig {
  repos: RepoConfig[];
}

export interface DocFile {
  path: string;
  content: string;
  sha: string;
}

export interface DocMetadata {
  title?: string;
  description?: string;
  order?: number;
  version?: string;
  status?: string;
  lastUpdated?: string;
}

export interface NavigationItem {
  title: string;
  path: string;
  children?: NavigationItem[];
}

export interface RepoNavigation {
  repo: string;
  items: NavigationItem[];
}

export interface RepoMetadata {
  version: string;
  lastUpdated: string;
  stars?: number;
  description?: string;
  tags?: string[];
  topics?: string[];
  testCoverage?: number; // Percentage (0-100)
  criticalCVEs?: number; // Count of critical severity vulnerabilities
}

export interface RepoWithMetadata {
  files: DocFile[];
  metadata: RepoMetadata;
}

