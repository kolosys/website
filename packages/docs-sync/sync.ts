import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import { RepoConfig, DocFile, DocMetadata, NavigationItem, RepoMetadata, RepoWithMetadata } from './types';

export class DocsSync {
  private octokit: Octokit;

  constructor(githubToken?: string) {
    this.octokit = new Octokit({
      auth: githubToken || process.env.GITHUB_TOKEN,
    });
  }

  /**
   * Fetch all markdown files from a repository's docs folder
   */
  async fetchDocs(config: RepoConfig): Promise<DocFile[]> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner: config.org,
        repo: config.repo,
        path: config.docsPath.replace(/^\//, ''),
        ref: config.branch,
      });

      if (!Array.isArray(data)) {
        return [];
      }

      const files: DocFile[] = [];
      await this.processDirectory(config, data, files);
      
      return files;
    } catch (error) {
      console.error(`Error fetching docs for ${config.org}/${config.repo}:`, error);
      return [];
    }
  }

  /**
   * Recursively process directory contents
   */
  private async processDirectory(
    config: RepoConfig,
    items: any[],
    files: DocFile[]
  ): Promise<void> {
    for (const item of items) {
      if (item.type === 'file' && item.name.endsWith('.md')) {
        const { data } = await this.octokit.repos.getContent({
          owner: config.org,
          repo: config.repo,
          path: item.path,
          ref: config.branch,
        });

        if ('content' in data && typeof data.content === 'string') {
          const content = Buffer.from(data.content, 'base64').toString('utf-8');
          files.push({
            path: item.path,
            content,
            sha: data.sha,
          });
        }
      } else if (item.type === 'dir') {
        const { data } = await this.octokit.repos.getContent({
          owner: config.org,
          repo: config.repo,
          path: item.path,
          ref: config.branch,
        });

        if (Array.isArray(data)) {
          await this.processDirectory(config, data, files);
        }
      }
    }
  }

  /**
   * Parse frontmatter from markdown content
   */
  parseMetadata(content: string): { metadata: DocMetadata; content: string } {
    const { data, content: markdownContent } = matter(content);
    
    return {
      metadata: data as DocMetadata,
      content: markdownContent,
    };
  }

  /**
   * Generate navigation structure from file paths
   */
  generateNavigation(files: DocFile[], docsPath: string): NavigationItem[] {
    const navMap = new Map<string, NavigationItem>();
    
    files.forEach(file => {
      const relativePath = file.path.replace(docsPath, '').replace(/^\//, '');
      const parts = relativePath.split('/');
      
      // Build nested structure
      let currentPath = '';
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isFile = i === parts.length - 1;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        if (!navMap.has(currentPath)) {
          const title = isFile 
            ? part.replace('.md', '').replace(/-/g, ' ')
            : part.replace(/-/g, ' ');
          
          navMap.set(currentPath, {
            title: title.charAt(0).toUpperCase() + title.slice(1),
            path: isFile ? currentPath.replace('.md', '') : currentPath,
            children: isFile ? undefined : [],
          });
        }
      }
    });

    // Build tree structure
    const root: NavigationItem[] = [];
    const sorted = Array.from(navMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    
    sorted.forEach(([path, item]) => {
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
    });

    return root;
  }

  /**
   * Fetch test coverage from GitHub Actions workflow runs
   * Looks for coverage badges or workflow artifacts
   */
  private async fetchTestCoverage(config: RepoConfig): Promise<number | undefined> {
    try {
      // Try to find coverage information from workflow runs
      const { data: workflows } = await this.octokit.actions.listWorkflowRunsForRepo({
        owner: config.org,
        repo: config.repo,
        status: 'success',
        per_page: 5,
      });

      // Look for coverage in workflow run names or conclusions
      for (const run of workflows.workflow_runs) {
        // Check if there's a coverage artifact or job
        try {
          const { data: jobs } = await this.octokit.actions.listJobsForWorkflowRun({
            owner: config.org,
            repo: config.repo,
            run_id: run.id,
          });

          // Look for test/coverage jobs
          for (const job of jobs.jobs) {
            if (job.name.toLowerCase().includes('coverage') || 
                job.name.toLowerCase().includes('test')) {
              // Try to extract coverage percentage from job logs or name
              // This is a heuristic approach
              const coverageMatch = job.name.match(/(\d+)%/);
              if (coverageMatch) {
                return parseInt(coverageMatch[1], 10);
              }
            }
          }
        } catch {
          // Continue to next run
        }
      }

      // Fallback: Try to read coverage badge from README
      try {
        const { data } = await this.octokit.repos.getContent({
          owner: config.org,
          repo: config.repo,
          path: 'README.md',
          ref: config.branch,
        });

        if ('content' in data && typeof data.content === 'string') {
          const readme = Buffer.from(data.content, 'base64').toString('utf-8');
          // Look for common coverage badge patterns
          const coveragePatterns = [
            /coverage[^\d]*(\d+(?:\.\d+)?)%/i,
            /codecov[^\d]*(\d+(?:\.\d+)?)%/i,
            /coveralls[^\d]*(\d+(?:\.\d+)?)%/i,
          ];

          for (const pattern of coveragePatterns) {
            const match = readme.match(pattern);
            if (match) {
              return Math.round(parseFloat(match[1]));
            }
          }
        }
      } catch {
        // README not found or can't be read
      }

      return undefined;
    } catch (error) {
      console.error(`Error fetching test coverage for ${config.org}/${config.repo}:`, error);
      return undefined;
    }
  }

  /**
   * Fetch critical CVEs from GitHub Security Advisories
   */
  private async fetchCriticalCVEs(config: RepoConfig): Promise<number> {
    try {
      // Fetch security advisories using GraphQL API
      const query = `
        query($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            vulnerabilityAlerts(first: 100, states: OPEN) {
              nodes {
                securityVulnerability {
                  severity
                }
              }
            }
          }
        }
      `;

      const response = await this.octokit.graphql(query, {
        owner: config.org,
        repo: config.repo,
      });

      const alerts = (response as any).repository?.vulnerabilityAlerts?.nodes || [];
      const criticalCount = alerts.filter((alert: any) => 
        alert.securityVulnerability?.severity === 'CRITICAL'
      ).length;

      return criticalCount;
    } catch (error) {
      // GraphQL API might not be accessible or repo might not have security enabled
      // Try REST API fallback (requires security alerts to be public)
      try {
        const { data: advisories } = await this.octokit.rest.securityAdvisories.listRepositoryAdvisories({
          owner: config.org,
          repo: config.repo,
        });

        const criticalCount = advisories.filter((advisory: any) => 
          advisory.severity === 'critical'
        ).length;

        return criticalCount;
      } catch {
        // Security advisories not accessible, assume 0
        console.warn(`Unable to fetch CVE data for ${config.org}/${config.repo} (security features may not be enabled)`);
        return 0;
      }
    }
  }

  /**
   * Fetch repository metadata (version, last updated, stars, description, test coverage, CVEs)
   */
  async fetchRepoMetadata(config: RepoConfig): Promise<RepoMetadata> {
    try {
      // Fetch repository info for stars and description
      const { data: repo } = await this.octokit.repos.get({
        owner: config.org,
        repo: config.repo,
      });

      // Fetch all tags
      let allTags: string[] = [];
      try {
        const { data: tags } = await this.octokit.repos.listTags({
          owner: config.org,
          repo: config.repo,
          per_page: 100,
        });
        allTags = tags.map(tag => tag.name);
      } catch {
        // No tags available
      }

      // Try to get latest release
      let version = 'v0.0.0';
      try {
        const { data: latestRelease } = await this.octokit.repos.getLatestRelease({
          owner: config.org,
          repo: config.repo,
        });
        version = latestRelease.tag_name;
      } catch {
        // If no release exists, use the latest tag
        if (allTags.length > 0) {
          version = allTags[0];
        }
      }

      // Get last commit date
      let lastUpdated = new Date().toISOString();
      try {
        const { data: commits } = await this.octokit.repos.listCommits({
          owner: config.org,
          repo: config.repo,
          per_page: 1,
          sha: config.branch,
        });
        if (commits.length > 0 && commits[0].commit.committer?.date) {
          lastUpdated = commits[0].commit.committer.date;
        }
      } catch {
        // Use current date if commits fetch fails
      }

      // Fetch test coverage and CVE data in parallel
      const [testCoverage, criticalCVEs] = await Promise.all([
        this.fetchTestCoverage(config),
        this.fetchCriticalCVEs(config),
      ]);

      return {
        version,
        lastUpdated,
        stars: repo.stargazers_count,
        description: repo.description || undefined,
        tags: allTags,
        topics: repo.topics || [],
        testCoverage,
        criticalCVEs,
      };
    } catch (error) {
      console.error(`Error fetching metadata for ${config.org}/${config.repo}:`, error);
      return {
        version: 'v0.0.0',
        lastUpdated: new Date().toISOString(),
        tags: [],
        topics: [],
        criticalCVEs: 0,
      };
    }
  }

  /**
   * Fetch docs and metadata together
   */
  async fetchDocsWithMetadata(config: RepoConfig): Promise<RepoWithMetadata> {
    const [files, metadata] = await Promise.all([
      this.fetchDocs(config),
      this.fetchRepoMetadata(config),
    ]);

    return { files, metadata };
  }

  /**
   * Validate GitHub webhook signature
   */
  validateWebhookSignature(payload: string, signature: string, secret: string): boolean {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  }
}

