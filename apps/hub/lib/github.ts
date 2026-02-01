type GitHubRepo = {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  description: string | null;
  homepage: string | null;
  topics: string[];
  default_branch: string;
};

type GitHubRepoMetadata = {
  name: string;
  owner: string;
  repo: string;
  fullName: string;
  description: string | null;
  homepage: string | null;
  topics: string[];
  defaultBranch: string;
};

export async function fetchGitHubRepo(
  ownerAndRepo: string
): Promise<GitHubRepoMetadata | null> {
  try {
    const [owner, repo] = ownerAndRepo.includes("/")
      ? ownerAndRepo.split("/")
      : [null, null];

    if (!owner || !repo) {
      throw new Error(
        "Invalid repository format. Use 'owner/repo' format (e.g., 'facebook/react')"
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Repository not found");
      }
      if (response.status === 403) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data: GitHubRepo = await response.json();

    return {
      name: data.name,
      owner: data.owner.login,
      repo: data.name,
      fullName: data.full_name,
      description: data.description,
      homepage: data.homepage,
      topics: data.topics || [],
      defaultBranch: data.default_branch,
    };
  } catch (error) {
    console.error("Error fetching GitHub repository:", error);
    return null;
  }
}

export function slugifyRepoName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type GitHubOrgRepo = {
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  topics: string[];
  default_branch: string;
  private: boolean;
};

export type OrgRepository = {
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
};

export async function fetchOrgRepositories(
  org: string
): Promise<OrgRepository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/orgs/${org}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Organization not found");
      }
      if (response.status === 403) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data: GitHubOrgRepo[] = await response.json();

    return data.map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      isPrivate: repo.private,
    }));
  } catch (error) {
    console.error("Error fetching organization repositories:", error);
    return [];
  }
}
