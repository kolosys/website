import { getGitHubClient } from "./client";
import prisma from "@/prisma";

export async function syncIssues(
  owner: string,
  repo: string,
  repositoryId: string
): Promise<number> {
  const octokit = getGitHubClient();
  let synced = 0;

  try {
    // Fetch all issues (both open and closed)
    const allIssues = await octokit.paginate(octokit.issues.listForRepo, {
      owner,
      repo,
      state: "all",
      per_page: 100,
    });

    // Filter out pull requests (GitHub API returns both)
    const issues = allIssues.filter((issue) => !issue.pull_request);

    console.log(`Found ${issues.length} issues for ${owner}/${repo}`);

    // Upsert each issue
    for (const issue of issues) {
      try {
        await prisma.issue.upsert({
          where: { githubId: BigInt(issue.id) },
          update: {
            repositoryId,
            number: issue.number,
            title: issue.title,
            body: issue.body || null,
            state: issue.state as "open" | "closed",
            userLogin: issue.user?.login || "unknown",
            userAvatarUrl: issue.user?.avatar_url,
            labels: issue.labels.map((l) =>
              typeof l === "string" ? l : l.name || ""
            ),
            assignees: issue.assignees?.map((a) => a.login) || [],
            commentsCount: issue.comments,
            createdAt: new Date(issue.created_at),
            updatedAt: new Date(issue.updated_at),
            closedAt: issue.closed_at ? new Date(issue.closed_at) : null,
            syncedAt: new Date(),
          },
          create: {
            githubId: BigInt(issue.id),
            repositoryId,
            number: issue.number,
            title: issue.title,
            body: issue.body || null,
            state: issue.state as "open" | "closed",
            userLogin: issue.user?.login || "unknown",
            userAvatarUrl: issue.user?.avatar_url,
            labels: issue.labels.map((l) =>
              typeof l === "string" ? l : l.name || ""
            ),
            assignees: issue.assignees?.map((a) => a.login) || [],
            commentsCount: issue.comments,
            createdAt: new Date(issue.created_at),
            updatedAt: new Date(issue.updated_at),
            closedAt: issue.closed_at ? new Date(issue.closed_at) : null,
            syncedAt: new Date(),
          },
        });
        synced++;
      } catch (error) {
        console.error(`Error syncing issue ${issue.number}:`, error);
      }
    }

    console.log(`Successfully synced ${synced} issues for ${owner}/${repo}`);
    return synced;
  } catch (error) {
    console.error(`Error syncing issues for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function syncAllIssues(repositoryIds?: string[]): Promise<number> {
  let totalSynced = 0;

  try {
    // Get repositories - either specific ones or all
    const repos = await prisma.repository.findMany({
      where:
        repositoryIds && repositoryIds.length > 0
          ? { id: { in: repositoryIds } }
          : undefined,
      select: {
        id: true,
        fullName: true,
        owner: true,
        name: true,
      },
    });

    if (!repos || repos.length === 0) return 0;

    // Sync issues for each repository
    for (const repo of repos) {
      try {
        const synced = await syncIssues(repo.owner, repo.name, repo.id);
        totalSynced += synced;
      } catch (error) {
        console.error(`Failed to sync issues for ${repo.fullName}:`, error);
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all issues:", error);
    throw error;
  }
}
