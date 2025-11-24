import { getGitHubClient } from "./client";
import prisma from "@/prisma";

export async function syncVersionTags(
  owner: string,
  repo: string,
  repositoryId: string
): Promise<number> {
  const octokit = getGitHubClient();
  let synced = 0;

  try {
    // Fetch all tags
    const tags = await octokit.paginate(octokit.repos.listTags, {
      owner,
      repo,
      per_page: 100,
    });

    console.log(`Found ${tags.length} tags for ${owner}/${repo}`);

    if (tags.length === 0) {
      return 0;
    }

    // Fetch commit dates for all tags to determine the latest
    const tagsWithDates = await Promise.all(
      tags.map(async (tag) => {
        try {
          // Fetch commit details to get the commit date
          const { data: commit } = await octokit.repos.getCommit({
            owner,
            repo,
            ref: tag.commit.sha,
          });

          return {
            tagName: tag.name,
            commitSha: tag.commit.sha,
            createdAt: new Date(
              commit.commit.committer?.date ||
                commit.commit.author?.date ||
                new Date()
            ),
          };
        } catch (error) {
          console.error(
            `Error fetching commit ${tag.commit.sha} for tag ${tag.name}:`,
            error
          );
          // Fallback to current date if commit fetch fails
          return {
            tagName: tag.name,
            commitSha: tag.commit.sha,
            createdAt: new Date(),
          };
        }
      })
    );

    // Sort by createdAt descending to find the latest tag
    tagsWithDates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const latestTagName =
      tagsWithDates.length > 0 ? tagsWithDates[0].tagName : null;

    // Upsert each tag
    for (const tagData of tagsWithDates) {
      try {
        const isLatest = tagData.tagName === latestTagName;

        // Use findFirst with compound unique constraint, then update or create
        const existing = await prisma.versionTag.findFirst({
          where: {
            repositoryId,
            tagName: tagData.tagName,
          },
        });

        if (existing) {
          await prisma.versionTag.update({
            where: { id: existing.id },
            data: {
              commitSha: tagData.commitSha,
              isLatest,
              createdAt: tagData.createdAt,
              syncedAt: new Date(),
            },
          });
        } else {
          await prisma.versionTag.create({
            data: {
              repositoryId,
              tagName: tagData.tagName,
              commitSha: tagData.commitSha,
              isLatest,
              createdAt: tagData.createdAt,
              syncedAt: new Date(),
            },
          });
        }
        synced++;
      } catch (error) {
        console.error(`Error syncing tag ${tagData.tagName}:`, error);
      }
    }

    // Ensure only one tag is marked as latest (in case of race conditions or manual updates)
    if (latestTagName) {
      await prisma.versionTag.updateMany({
        where: {
          repositoryId,
          tagName: { not: latestTagName },
        },
        data: {
          isLatest: false,
        },
      });
    }

    console.log(
      `Successfully synced ${synced} version tags for ${owner}/${repo} (latest: ${latestTagName})`
    );
    return synced;
  } catch (error) {
    console.error(`Error syncing version tags for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function syncAllVersionTags(
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

    // Sync version tags for each repository
    for (const repo of repos) {
      try {
        const synced = await syncVersionTags(repo.owner, repo.name, repo.id);
        totalSynced += synced;
      } catch (error) {
        console.error(
          `Failed to sync version tags for ${repo.fullName}:`,
          error
        );
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all version tags:", error);
    throw error;
  }
}
