import { Octokit } from '@octokit/rest';

let octokitInstance: Octokit | null = null;

export function getGitHubClient(): Octokit {
  if (!octokitInstance) {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is not set');
    }
    
    octokitInstance = new Octokit({
      auth: token,
      userAgent: 'kolosys-hub/1.0.0',
    });
  }
  
  return octokitInstance;
}

export const KOLOSYS_ORG = 'kolosys';

