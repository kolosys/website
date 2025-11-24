import { getGitHubClient, KOLOSYS_ORG } from "./client";
import prisma from "@/prisma";

export async function syncRepository(
  owner: string,
  repo: string,
  syncData: boolean = false
): Promise<boolean> {
  const octokit = getGitHubClient();

  try {
    const { data } = await octokit.repos.get({ owner, repo });

    try {
      const repository = await prisma.repository.upsert({
        where: { githubId: BigInt(data.id) },
        update: {
          name: data.name,
          fullName: data.full_name,
          owner: data.owner.login,
          description: data.description,
          private: data.private,
          fork: data.fork,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          pushedAt: data.pushed_at ? new Date(data.pushed_at) : null,
          homepage: data.homepage,
          size: data.size,
          stargazersCount: data.stargazers_count,
          watchersCount: data.watchers_count,
          forksCount: data.forks_count,
          openIssuesCount: data.open_issues_count,
          language: data.language,
          defaultBranch: data.default_branch,
          topics: data.topics || [],
          archived: data.archived,
          disabled: data.disabled,
          syncedAt: new Date(),
        },
        create: {
          githubId: BigInt(data.id),
          name: data.name,
          fullName: data.full_name,
          owner: data.owner.login,
          description: data.description,
          private: data.private,
          fork: data.fork,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          pushedAt: data.pushed_at ? new Date(data.pushed_at) : null,
          homepage: data.homepage,
          size: data.size,
          stargazersCount: data.stargazers_count,
          watchersCount: data.watchers_count,
          forksCount: data.forks_count,
          openIssuesCount: data.open_issues_count,
          language: data.language,
          defaultBranch: data.default_branch,
          topics: data.topics || [],
          archived: data.archived,
          disabled: data.disabled,
          syncedAt: new Date(),
          published: false,
        },
      });

      // Kick off async data sync if requested
      if (syncData) {
        // Import dynamically to avoid circular dependencies
        import("./sync-manager").then(({ syncSingleRepositoryData }) => {
          syncSingleRepositoryData(repository.id).catch((error) => {
            console.error(
              `Error syncing data for repository ${repository.fullName}:`,
              error
            );
          });
        });
      }

      return true;
    } catch (error) {
      console.error(`Error syncing repo ${data.full_name}:`, error);
      return false;
    }
  } catch (error) {
    console.error(`Error syncing repository ${owner}/${repo}:`, error);
    throw error;
  }
}

/**
 * Sync repositories - either specific repos or all from organization
 * @param repoNames Optional array of repo names (e.g., ['repo1', 'repo2'])
 * @param organization Organization to fetch repos from (defaults to KOLOSYS_ORG)
 */
export async function syncRepositories(
  repoNames?: string[],
  organization: string = KOLOSYS_ORG
): Promise<number> {
  const octokit = getGitHubClient();
  let synced = 0;

  try {
    if (repoNames && repoNames.length > 0) {
      // Sync specific repositories
      console.log(`Syncing ${repoNames.length} specified repositories...`);

      for (const repoName of repoNames) {
        try {
          const success = await syncRepository(organization, repoName);
          if (success) synced++;
        } catch (error) {
          console.error(
            `Failed to sync repository ${organization}/${repoName}:`,
            error
          );
        }
      }
    } else {
      // Sync all repositories from organization
      console.log(`Fetching all repositories from ${organization}...`);

      const repos = await octokit.paginate(octokit.repos.listForOrg, {
        org: organization,
        type: "all",
        per_page: 100,
      });

      console.log(`Found ${repos.length} repositories in ${organization}`);

      for (const repo of repos) {
        try {
          const success = await syncRepository(organization, repo.name);
          if (success) synced++;
        } catch (error) {
          console.error(`Failed to sync repository ${repo.full_name}:`, error);
        }
      }
    }

    console.log(`Successfully synced ${synced} repositories`);
    return synced;
  } catch (error) {
    console.error("Error syncing repositories:", error);
    throw error;
  }
}
