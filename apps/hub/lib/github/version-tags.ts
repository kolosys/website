import { getGitHubClient } from "./client";
import { syncTagDocumentation, isSemverTag } from "./documentation";
import prisma from "@/prisma";

export async function syncVersionTags(
  owner: string,
  repo: string,
  repositoryId: string,
  syncDocs: boolean = false
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

    // Track tags that need documentation sync
    const tagsNeedingDocSync: { tagName: string; commitSha: string }[] = [];

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

          // Track if docs need syncing (semver tags without docs synced)
          if (
            syncDocs &&
            !existing.docsSynced &&
            isSemverTag(tagData.tagName)
          ) {
            tagsNeedingDocSync.push(tagData);
          }
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

          // New tags always need docs synced if syncDocs is true
          if (syncDocs && isSemverTag(tagData.tagName)) {
            tagsNeedingDocSync.push(tagData);
          }
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

    // Sync documentation for tags that need it
    if (tagsNeedingDocSync.length > 0) {
      console.log(
        `📚 Syncing documentation for ${tagsNeedingDocSync.length} version tags...`
      );

      for (const tagData of tagsNeedingDocSync) {
        try {
          await syncTagDocumentation(
            repositoryId,
            tagData.tagName,
            tagData.commitSha
          );
          console.log(
            `  ✅ Documentation synced for tag ${tagData.tagName}`
          );
        } catch (err) {
          console.error(
            `  ❌ Failed to sync documentation for tag ${tagData.tagName}:`,
            err
          );
        }
      }
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
  repositoryIds?: string[],
  syncDocs: boolean = false
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
        const synced = await syncVersionTags(
          repo.owner,
          repo.name,
          repo.id,
          syncDocs
        );
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

/**
 * Sync documentation for all version tags that haven't been synced yet
 */
export async function syncAllTagDocumentation(
  repositoryIds?: string[]
): Promise<number> {
  let totalSynced = 0;

  try {
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

    for (const repo of repos) {
      // Get all version tags that need docs synced
      const tagsNeedingSync = await prisma.versionTag.findMany({
        where: {
          repositoryId: repo.id,
          docsSynced: false,
        },
        select: {
          tagName: true,
          commitSha: true,
        },
      });

      // Filter to only semver tags
      const semverTags = tagsNeedingSync.filter((t) => isSemverTag(t.tagName));

      if (semverTags.length === 0) continue;

      console.log(
        `📚 Syncing documentation for ${semverTags.length} tags in ${repo.fullName}...`
      );

      for (const tag of semverTags) {
        try {
          await syncTagDocumentation(repo.id, tag.tagName, tag.commitSha);
          totalSynced++;
          console.log(`  ✅ ${tag.tagName}`);
        } catch (err) {
          console.error(`  ❌ ${tag.tagName}:`, err);
        }
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all tag documentation:", error);
    throw error;
  }
}
