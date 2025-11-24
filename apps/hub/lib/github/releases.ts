import { getGitHubClient } from "./client";
import prisma from "@/prisma";

export async function syncReleases(
  owner: string,
  repo: string,
  repositoryId: string
): Promise<number> {
  const octokit = getGitHubClient();
  let synced = 0;

  try {
    // Fetch all releases
    const releases = await octokit.paginate(octokit.repos.listReleases, {
      owner,
      repo,
      per_page: 100,
    });

    console.log(`Found ${releases.length} releases for ${owner}/${repo}`);

    // Upsert each release
    for (const release of releases) {
      try {
        await prisma.release.upsert({
          where: { githubId: BigInt(release.id) },
          update: {
            repositoryId,
            tagName: release.tag_name,
            name: release.name,
            body: release.body,
            draft: release.draft,
            prerelease: release.prerelease,
            authorLogin: release.author?.login || "unknown",
            authorAvatarUrl: release.author?.avatar_url,
            createdAt: new Date(release.created_at),
            publishedAt: release.published_at
              ? new Date(release.published_at)
              : null,
            syncedAt: new Date(),
          },
          create: {
            githubId: BigInt(release.id),
            repositoryId,
            tagName: release.tag_name,
            name: release.name,
            body: release.body,
            draft: release.draft,
            prerelease: release.prerelease,
            authorLogin: release.author?.login || "unknown",
            authorAvatarUrl: release.author?.avatar_url,
            createdAt: new Date(release.created_at),
            publishedAt: release.published_at
              ? new Date(release.published_at)
              : null,
            syncedAt: new Date(),
          },
        });
        synced++;
      } catch (error) {
        console.error(`Error syncing release ${release.tag_name}:`, error);
      }
    }

    console.log(`Successfully synced ${synced} releases for ${owner}/${repo}`);
    return synced;
  } catch (error) {
    console.error(`Error syncing releases for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function syncAllReleases(
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

    // Sync releases for each repository
    for (const repo of repos) {
      try {
        const synced = await syncReleases(repo.owner, repo.name, repo.id);
        totalSynced += synced;
      } catch (error) {
        console.error(`Failed to sync releases for ${repo.fullName}:`, error);
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all releases:", error);
    throw error;
  }
}
