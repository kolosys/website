const DOCS_API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'https://docs.kolosys.com';

export interface Library {
  id: string;
  name: string;
  icon: string;
  description: string;
  version: string;
  stars: number;
  lastUpdated: string;
  tags: string[];
  topics: string[];
  testCoverage?: number;
  criticalCVEs?: number;
  githubUrl: string;
  docsUrl: string;
  navigation?: Array<{
    title: string;
    path: string;
    children?: Array<{
      title: string;
      path: string;
    }>;
  }>;
}

export async function getAllLibraries(): Promise<Library[]> {
  try {
    const response = await fetch(`${DOCS_API_BASE_URL}/api/libraries`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch libraries');
    }

    const data = await response.json();
    return data.libraries || [];
  } catch (error) {
    console.error('Error fetching libraries from docs API:', error);
    return [];
  }
}

export async function getLibrary(repo: string): Promise<Library | null> {
  try {
    const response = await fetch(`${DOCS_API_BASE_URL}/api/libraries/${repo}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch library');
    }

    const data = await response.json();
    return data.library || null;
  } catch (error) {
    console.error(`Error fetching library ${repo} from docs API:`, error);
    return null;
  }
}

export async function getLibraryStats(): Promise<{
  totalLibraries: number;
  totalStars: number;
  averageTestCoverage: number;
  totalCriticalCVEs: number;
}> {
  const libraries = await getAllLibraries();
  
  const totalStars = libraries.reduce((sum, lib) => sum + lib.stars, 0);
  const totalLibraries = libraries.length;
  
  // Calculate average test coverage (only from libraries that have coverage data)
  const librariesWithCoverage = libraries.filter(lib => lib.testCoverage !== undefined);
  const averageTestCoverage = librariesWithCoverage.length > 0
    ? Math.round(
        librariesWithCoverage.reduce((sum, lib) => sum + (lib.testCoverage || 0), 0) / 
        librariesWithCoverage.length
      )
    : 0;
  
  // Sum up all critical CVEs
  const totalCriticalCVEs = libraries.reduce((sum, lib) => sum + (lib.criticalCVEs || 0), 0);

  return {
    totalLibraries,
    totalStars,
    averageTestCoverage,
    totalCriticalCVEs,
  };
}

