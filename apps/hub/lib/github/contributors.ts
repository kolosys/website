import { getGitHubClient } from "./client";
import { PrismaClient } from "@/prisma/client";

const prisma = new PrismaClient();

export async function syncContributors(
  owner: string,
  repo: string,
  repositoryId: string
): Promise<number> {
  const octokit = getGitHubClient();
  let synced = 0;

  try {
    // Fetch all contributors for the repository
    const contributors = await octokit.paginate(
      octokit.repos.listContributors,
      {
        owner,
        repo,
        per_page: 100,
      }
    );

    console.log(
      `Found ${contributors.length} contributors for ${owner}/${repo}`
    );

    // Upsert each contributor
    for (const contributor of contributors) {
      try {
        // Fetch detailed user information
        let userDetails: any = null;
        if (contributor.login) {
          try {
            const { data } = await octokit.users.getByUsername({
              username: contributor.login,
            });
            userDetails = data;
          } catch (err) {
            console.warn(
              `Could not fetch details for ${contributor.login}:`,
              err
            );
          }
        }

        // Upsert contributor
        const contributorRecord = await prisma.contributor.upsert({
          where: { githubId: BigInt(contributor.id ?? 0) },
          update: {
            login: contributor.login || "unknown",
            avatarUrl: contributor.avatar_url,
            htmlUrl: contributor.html_url,
            type: contributor.type || "User",
            siteAdmin: contributor.site_admin || false,
            name: userDetails?.name,
            company: userDetails?.company,
            blog: userDetails?.blog,
            location: userDetails?.location,
            email: userDetails?.email,
            bio: userDetails?.bio,
            publicRepos: userDetails?.public_repos,
            publicGists: userDetails?.public_gists,
            followers: userDetails?.followers,
            following: userDetails?.following,
            createdAt: userDetails?.created_at
              ? new Date(userDetails.created_at)
              : null,
            updatedAt: userDetails?.updated_at
              ? new Date(userDetails.updated_at)
              : null,
            syncedAt: new Date(),
          },
          create: {
            githubId: BigInt(contributor.id ?? 0),
            login: contributor.login || "unknown",
            avatarUrl: contributor.avatar_url,
            htmlUrl: contributor.html_url,
            type: contributor.type || "User",
            siteAdmin: contributor.site_admin || false,
            name: userDetails?.name,
            company: userDetails?.company,
            blog: userDetails?.blog,
            location: userDetails?.location,
            email: userDetails?.email,
            bio: userDetails?.bio,
            publicRepos: userDetails?.public_repos,
            publicGists: userDetails?.public_gists,
            followers: userDetails?.followers,
            following: userDetails?.following,
            createdAt: userDetails?.created_at
              ? new Date(userDetails.created_at)
              : null,
            updatedAt: userDetails?.updated_at
              ? new Date(userDetails.updated_at)
              : null,
            syncedAt: new Date(),
          },
        });

        // Upsert contribution count
        await prisma.contributorContribution.upsert({
          where: {
            contributorId_repositoryId: {
              contributorId: contributorRecord.id,
              repositoryId: repositoryId,
            },
          },
          update: {
            contributionsCount: contributor.contributions,
            syncedAt: new Date(),
          },
          create: {
            contributorId: contributorRecord.id,
            repositoryId: repositoryId,
            contributionsCount: contributor.contributions,
            syncedAt: new Date(),
          },
        });

        synced++;
      } catch (err) {
        console.error(
          `Error processing contributor ${contributor.login}:`,
          err
        );
      }
    }

    console.log(
      `Successfully synced ${synced} contributors for ${owner}/${repo}`
    );
    return synced;
  } catch (error) {
    console.error(`Error syncing contributors for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function syncAllContributors(
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

    // Sync contributors for each repository
    for (const repo of repos) {
      try {
        const synced = await syncContributors(repo.owner, repo.name, repo.id);
        totalSynced += synced;
      } catch (error) {
        console.error(
          `Failed to sync contributors for ${repo.fullName}:`,
          error
        );
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all contributors:", error);
    throw error;
  }
}
