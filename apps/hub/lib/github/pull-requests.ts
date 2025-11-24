import { getGitHubClient } from "./client";
import prisma from "@/prisma";

export async function syncPullRequests(
  owner: string,
  repo: string,
  repositoryId: string
): Promise<number> {
  const octokit = getGitHubClient();
  let synced = 0;

  try {
    // Fetch all pull requests (both open and closed) - list endpoint
    const prList = await octokit.paginate(octokit.pulls.list, {
      owner,
      repo,
      state: "all",
      per_page: 100,
    });

    console.log(`Found ${prList.length} pull requests for ${owner}/${repo}`);

    // Fetch full details for each pull request and upsert
    for (const prBasic of prList) {
      try {
        // Fetch full PR details to get all fields
        const { data: pr } = await octokit.pulls.get({
          owner,
          repo,
          pull_number: prBasic.number,
        });

        // Determine PR state
        let state: "open" | "closed" | "merged" =
          pr.state === "open" ? "open" : "closed";
        if (pr.merged_at) {
          state = "merged";
        }

        await prisma.pullRequest.upsert({
          where: { githubId: BigInt(pr.id) },
          update: {
            repositoryId,
            number: pr.number,
            title: pr.title,
            body: pr.body || null,
            state,
            userLogin: pr.user?.login || "unknown",
            userAvatarUrl: pr.user?.avatar_url,
            labels:
              pr.labels?.map((l) =>
                typeof l === "string" ? l : l.name || ""
              ) || [],
            assignees: pr.assignees?.map((a) => a.login) || [],
            requestedReviewers:
              pr.requested_reviewers?.map((r) => r.login) || [],
            headRef: pr.head.ref,
            baseRef: pr.base.ref,
            mergeable: pr.mergeable ?? null,
            merged: pr.merged || false,
            mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
            mergedBy: pr.merged_by?.login,
            commentsCount: pr.comments || 0,
            reviewCommentsCount: pr.review_comments || 0,
            commitsCount: pr.commits || 0,
            additions: pr.additions || 0,
            deletions: pr.deletions || 0,
            changedFiles: pr.changed_files || 0,
            createdAt: new Date(pr.created_at),
            updatedAt: new Date(pr.updated_at),
            closedAt: pr.closed_at ? new Date(pr.closed_at) : null,
            syncedAt: new Date(),
          },
          create: {
            githubId: BigInt(pr.id),
            repositoryId,
            number: pr.number,
            title: pr.title,
            body: pr.body || null,
            state,
            userLogin: pr.user?.login || "unknown",
            userAvatarUrl: pr.user?.avatar_url,
            labels:
              pr.labels?.map((l) =>
                typeof l === "string" ? l : l.name || ""
              ) || [],
            assignees: pr.assignees?.map((a) => a.login) || [],
            requestedReviewers:
              pr.requested_reviewers?.map((r) => r.login) || [],
            headRef: pr.head.ref,
            baseRef: pr.base.ref,
            mergeable: pr.mergeable ?? null,
            merged: pr.merged || false,
            mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
            mergedBy: pr.merged_by?.login,
            commentsCount: pr.comments || 0,
            reviewCommentsCount: pr.review_comments || 0,
            commitsCount: pr.commits || 0,
            additions: pr.additions || 0,
            deletions: pr.deletions || 0,
            changedFiles: pr.changed_files || 0,
            createdAt: new Date(pr.created_at),
            updatedAt: new Date(pr.updated_at),
            closedAt: pr.closed_at ? new Date(pr.closed_at) : null,
            syncedAt: new Date(),
          },
        });
        synced++;
      } catch (error) {
        console.error(`Error syncing PR ${prBasic.number}:`, error);
      }
    }

    console.log(
      `Successfully synced ${synced} pull requests for ${owner}/${repo}`
    );
    return synced;
  } catch (error) {
    console.error(`Error syncing pull requests for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function syncAllPullRequests(
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

    // Sync pull requests for each repository
    for (const repo of repos) {
      try {
        const synced = await syncPullRequests(repo.owner, repo.name, repo.id);
        totalSynced += synced;
      } catch (error) {
        console.error(
          `Failed to sync pull requests for ${repo.fullName}:`,
          error
        );
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all pull requests:", error);
    throw error;
  }
}
