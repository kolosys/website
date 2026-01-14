import type { LibraryStatus } from '@kolosys-sites/theme';

/**
 * Determine status based on semantic version
 * - v0.0.x = Experimental
 * - v0.x.x = Beta
 * - v1.x.x+ = Stable
 * - Pre-release tags (alpha, beta, rc) override the version-based status
 */
export function getStatusFromVersion(version: string): LibraryStatus {
    if (!version) return 'Unknown';
    
    // Remove 'v' prefix if present
    const cleanVersion = version.replace(/^v/, '');
    
    // Check for pre-release tags
    if (cleanVersion.includes('-alpha')) return 'Alpha';
    if (cleanVersion.includes('-beta')) return 'Beta';
    if (cleanVersion.includes('-rc')) return 'Release Candidate';
    
    // Parse semantic version
    const parts = cleanVersion.split('.');
    const major = parseInt(parts[0] || '0', 10);
    const minor = parseInt(parts[1] || '0', 10);
    
    // Version-based status
    if (major === 0 && minor === 0) return 'Experimental';
    if (major === 0) return 'Beta';
    return 'Stable';
  }
  