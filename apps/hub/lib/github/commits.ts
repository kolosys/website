import { getGitHubClient } from "./client";
import prisma from "@/prisma";

export async function syncCommits(
  owner: string,
  repo: string,
  repositoryId: string,
  limit: number = 100
): Promise<number> {
  const octokit = getGitHubClient();
  let synced = 0;

  try {
    // Fetch recent commits (limit to avoid rate limits)
    // We'll fetch commits page by page until we reach the limit
    const perPage = Math.min(limit, 100);
    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: perPage,
    });

    console.log(`Found ${commits.length} commits for ${owner}/${repo}`);

    // Upsert each commit
    for (const commit of commits) {
      if (!commit.sha || !commit.commit) continue;

      try {
        await prisma.commit.upsert({
          where: { sha: commit.sha },
          update: {
            repositoryId,
            message: commit.commit.message,
            authorName: commit.commit.author?.name || "unknown",
            authorEmail: commit.commit.author?.email || "unknown",
            authorDate: commit.commit.author?.date
              ? new Date(commit.commit.author.date)
              : new Date(),
            committerName: commit.commit.committer?.name || "unknown",
            committerEmail: commit.commit.committer?.email || "unknown",
            committerDate: commit.commit.committer?.date
              ? new Date(commit.commit.committer.date)
              : new Date(),
            additions: 0, // Stats not available in list endpoint
            deletions: 0,
            totalChanges: 0,
            syncedAt: new Date(),
          },
          create: {
            sha: commit.sha,
            repositoryId,
            message: commit.commit.message,
            authorName: commit.commit.author?.name || "unknown",
            authorEmail: commit.commit.author?.email || "unknown",
            authorDate: commit.commit.author?.date
              ? new Date(commit.commit.author.date)
              : new Date(),
            committerName: commit.commit.committer?.name || "unknown",
            committerEmail: commit.commit.committer?.email || "unknown",
            committerDate: commit.commit.committer?.date
              ? new Date(commit.commit.committer.date)
              : new Date(),
            additions: 0,
            deletions: 0,
            totalChanges: 0,
            syncedAt: new Date(),
          },
        });
        synced++;
      } catch (error) {
        console.error(`Error syncing commit ${commit.sha}:`, error);
      }
    }

    console.log(`Successfully synced ${synced} commits for ${owner}/${repo}`);
    return synced;
  } catch (error) {
    console.error(`Error syncing commits for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function syncAllCommits(
  limit: number = 100,
  repositoryIds?: string[]
): Promise<number> {
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

    // Sync commits for each repository
    for (const repo of repos) {
      try {
        const synced = await syncCommits(repo.owner, repo.name, repo.id, limit);
        totalSynced += synced;
      } catch (error) {
        console.error(`Failed to sync commits for ${repo.fullName}:`, error);
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all commits:", error);
    throw error;
  }
}
