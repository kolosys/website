export interface RepoConfig {
  repo: string;
  fullName: string;
  owner: string;
  description?: string;
  defaultBranch: string;
  displayName?: string;
  icon?: string;
  route?: string;
}

export interface RepoMetadata {
  version: string;
  lastUpdated: string;
  description?: string;
}
