import prisma from "@/prisma";
import { syncRepository } from "../github/repositories";
import { syncDocumentation, syncTagDocumentation, isSemverTag } from "../github/documentation";
import { getGitHubClient } from "../github/client";
import { compareSemver } from "../github/version-tags";

export async function handlePushEvent(payload: any): Promise<void> {
  console.log(`📝 Handling push event for ${payload.repository.full_name}`);

  try {
    // Sync repository metadata
    await syncRepository(
      payload.repository.owner.login,
      payload.repository.name
    );

    // If push is to docs directory, sync documentation
    const modifiedFiles =
      payload.commits?.flatMap((c: any) => [
        ...(c.added || []),
        ...(c.modified || []),
        ...(c.removed || []),
      ]) || [];

    const docsModified = modifiedFiles.some((f: string) =>
      f.startsWith("docs/")
    );

    if (docsModified) {
      console.log(`📚 Documentation modified, triggering sync...`);
      const repo = await prisma.repository.findUnique({
        where: { fullName: payload.repository.full_name },
        select: { id: true, defaultBranch: true, docsPath: true },
      });

      if (repo) {
        await syncDocumentation({
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          repositoryId: repo.id,
          docsPath: repo.docsPath,
          branch: repo.defaultBranch || payload.repository.default_branch,
          versionTag: "next",
        });
      }
    }

    console.log(`✅ Push event handled successfully`);
  } catch (error) {
    console.error("Error handling push event:", error);
    throw error;
  }
}

export async function handleIssuesEvent(payload: any): Promise<void> {
  console.log(
    `🐛 Handling issues event: ${payload.action} for ${payload.repository.full_name}#${payload.issue.number}`
  );

  try {
    // Get repository ID
    const repo = await prisma.repository.findUnique({
      where: { fullName: payload.repository.full_name },
      select: { id: true },
    });

    if (!repo) {
      console.log(
        `Repository ${payload.repository.full_name} not found in database`
      );
      return;
    }

    const issue = payload.issue;

    // Handle different actions
    if (payload.action === "deleted") {
      // Delete issue
      await prisma.issue.deleteMany({
        where: {
          repositoryId: repo.id,
          number: issue.number,
        },
      });
    } else {
      // Upsert issue
      await prisma.issue.upsert({
        where: { githubId: BigInt(issue.id) },
        update: {
          repositoryId: repo.id,
          number: issue.number,
          title: issue.title,
          body: issue.body || null,
          state: issue.state as "open" | "closed",
          userLogin: issue.user?.login || "unknown",
          userAvatarUrl: issue.user?.avatar_url,
          labels: issue.labels.map((l: any) =>
            typeof l === "string" ? l : l.name
          ),
          assignees: issue.assignees?.map((a: any) => a.login) || [],
          commentsCount: issue.comments,
          createdAt: new Date(issue.created_at),
          updatedAt: new Date(issue.updated_at),
          closedAt: issue.closed_at ? new Date(issue.closed_at) : null,
          syncedAt: new Date(),
        },
        create: {
          githubId: BigInt(issue.id),
          repositoryId: repo.id,
          number: issue.number,
          title: issue.title,
          body: issue.body || null,
          state: issue.state as "open" | "closed",
          userLogin: issue.user?.login || "unknown",
          userAvatarUrl: issue.user?.avatar_url,
          labels: issue.labels.map((l: any) =>
            typeof l === "string" ? l : l.name
          ),
          assignees: issue.assignees?.map((a: any) => a.login) || [],
          commentsCount: issue.comments,
          createdAt: new Date(issue.created_at),
          updatedAt: new Date(issue.updated_at),
          closedAt: issue.closed_at ? new Date(issue.closed_at) : null,
          syncedAt: new Date(),
        },
      });
    }

    console.log(`✅ Issue event handled successfully`);
  } catch (error) {
    console.error("Error handling issues event:", error);
    throw error;
  }
}

export async function handlePullRequestEvent(payload: any): Promise<void> {
  console.log(
    `🔀 Handling pull_request event: ${payload.action} for ${payload.repository.full_name}#${payload.pull_request.number}`
  );

  try {
    // Get repository ID
    const repo = await prisma.repository.findUnique({
      where: { fullName: payload.repository.full_name },
      select: { id: true },
    });

    if (!repo) {
      console.log(
        `Repository ${payload.repository.full_name} not found in database`
      );
      return;
    }

    const pr = payload.pull_request;

    // Determine PR state
    let state: "open" | "closed" | "merged" =
      pr.state === "open" ? "open" : "closed";
    if (pr.merged || pr.merged_at) {
      state = "merged";
    }

    // Handle different actions
    if (payload.action === "closed" && !pr.merged) {
      // Just closed without merging
      state = "closed";
    }

    // Upsert pull request
    await prisma.pullRequest.upsert({
      where: { githubId: BigInt(pr.id) },
      update: {
        repositoryId: repo.id,
        number: pr.number,
        title: pr.title,
        body: pr.body || null,
        state,
        userLogin: pr.user?.login || "unknown",
        userAvatarUrl: pr.user?.avatar_url,
        labels:
          pr.labels?.map((l: any) => (typeof l === "string" ? l : l.name)) ||
          [],
        assignees: pr.assignees?.map((a: any) => a.login) || [],
        requestedReviewers:
          pr.requested_reviewers?.map((r: any) => r.login) || [],
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
        repositoryId: repo.id,
        number: pr.number,
        title: pr.title,
        body: pr.body || null,
        state,
        userLogin: pr.user?.login || "unknown",
        userAvatarUrl: pr.user?.avatar_url,
        labels:
          pr.labels?.map((l: any) => (typeof l === "string" ? l : l.name)) ||
          [],
        assignees: pr.assignees?.map((a: any) => a.login) || [],
        requestedReviewers:
          pr.requested_reviewers?.map((r: any) => r.login) || [],
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

    console.log(`✅ Pull request event handled successfully`);
  } catch (error) {
    console.error("Error handling pull_request event:", error);
    throw error;
  }
}

export async function handleReleaseEvent(payload: any): Promise<void> {
  console.log(
    `🏷️  Handling release event: ${payload.action} for ${payload.repository.full_name}@${payload.release.tag_name}`
  );

  try {
    // Get repository ID
    const repo = await prisma.repository.findUnique({
      where: { fullName: payload.repository.full_name },
      select: { id: true },
    });

    if (!repo) {
      console.log(
        `Repository ${payload.repository.full_name} not found in database`
      );
      return;
    }

    const release = payload.release;
    const tagName = release.tag_name;

    // Handle different actions
    if (payload.action === "deleted") {
      // Delete release
      await prisma.release.deleteMany({
        where: {
          repositoryId: repo.id,
          tagName,
        },
      });
    } else {
      // Upsert release
      await prisma.release.upsert({
        where: { githubId: BigInt(release.id) },
        update: {
          repositoryId: repo.id,
          tagName,
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
          repositoryId: repo.id,
          tagName,
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

      // For published releases (not drafts), sync documentation for the tag
      if (
        payload.action === "published" &&
        !release.draft &&
        isSemverTag(tagName)
      ) {
        console.log(
          `📚 Release published, syncing documentation for tag ${tagName}...`
        );

        // Fetch the commit SHA for this tag
        const octokit = getGitHubClient();
        let commitSha = "unknown";

        try {
          const { data: tagRef } = await octokit.git.getRef({
            owner: payload.repository.owner.login,
            repo: payload.repository.name,
            ref: `tags/${tagName}`,
          });

          if (tagRef.object.type === "tag") {
            const { data: tagData } = await octokit.git.getTag({
              owner: payload.repository.owner.login,
              repo: payload.repository.name,
              tag_sha: tagRef.object.sha,
            });
            commitSha = tagData.object.sha;
          } else {
            commitSha = tagRef.object.sha;
          }
        } catch (err) {
          console.error(`Failed to fetch commit SHA for tag ${tagName}:`, err);
        }

        if (commitSha !== "unknown") {
          // Ensure VersionTag exists and is marked as latest
          await prisma.versionTag.updateMany({
            where: { repositoryId: repo.id },
            data: { isLatest: false },
          });

          await prisma.versionTag.upsert({
            where: {
              repositoryId_tagName: {
                repositoryId: repo.id,
                tagName,
              },
            },
            update: {
              commitSha,
              isLatest: true,
              syncedAt: new Date(),
            },
            create: {
              repositoryId: repo.id,
              tagName,
              commitSha,
              isLatest: true,
              createdAt: new Date(),
              syncedAt: new Date(),
            },
          });

          try {
            await syncTagDocumentation(repo.id, tagName, commitSha);
            console.log(`✅ Documentation synced for release tag ${tagName}`);
          } catch (err) {
            console.error(
              `Failed to sync documentation for release tag ${tagName}:`,
              err
            );
          }
        }
      }
    }

    console.log(`✅ Release event handled successfully`);
  } catch (error) {
    console.error("Error handling release event:", error);
    throw error;
  }
}

export async function handleMemberEvent(payload: any): Promise<void> {
  console.log(
    `👥 Handling member event: ${payload.action} for ${payload.member?.login}`
  );

  try {
    // For member events, we could trigger a contributor resync
    // For now, just log it
    console.log(`Member ${payload.member?.login} ${payload.action}`);
    console.log(`✅ Member event handled successfully`);
  } catch (error) {
    console.error("Error handling member event:", error);
    throw error;
  }
}

export async function handleRepositoryEvent(payload: any): Promise<void> {
  console.log(
    `📦 Handling repository event: ${payload.action} for ${payload.repository.full_name}`
  );

  try {
    if (payload.action === "deleted") {
      // Delete repository (cascade will handle related records)
      await prisma.repository.deleteMany({
        where: { fullName: payload.repository.full_name },
      });
    } else {
      // Sync repository
      await syncRepository(
        payload.repository.owner.login,
        payload.repository.name
      );
    }

    console.log(`✅ Repository event handled successfully`);
  } catch (error) {
    console.error("Error handling repository event:", error);
    throw error;
  }
}

export async function handleCreateEvent(payload: any): Promise<void> {
  const refType = payload.ref_type;
  const ref = payload.ref;

  console.log(
    `🏷️  Handling create event: ${refType} "${ref}" for ${payload.repository.full_name}`
  );

  if (refType !== "tag") {
    console.log(`⏭️  Skipping non-tag create event (ref_type: ${refType})`);
    return;
  }

  try {
    const repo = await prisma.repository.findUnique({
      where: { fullName: payload.repository.full_name },
      select: { id: true },
    });

    if (!repo) {
      console.log(
        `Repository ${payload.repository.full_name} not found in database`
      );
      return;
    }

    // Fetch the actual commit SHA for this tag from GitHub
    const octokit = getGitHubClient();
    let commitSha = "unknown";

    try {
      const { data: tagRef } = await octokit.git.getRef({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        ref: `tags/${ref}`,
      });

      // Handle annotated tags (object type is "tag") vs lightweight tags (object type is "commit")
      if (tagRef.object.type === "tag") {
        const { data: tagData } = await octokit.git.getTag({
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          tag_sha: tagRef.object.sha,
        });
        commitSha = tagData.object.sha;
      } else {
        commitSha = tagRef.object.sha;
      }
    } catch (err) {
      console.error(`Failed to fetch commit SHA for tag ${ref}:`, err);
    }

    // Determine if this new tag should be the latest by comparing semver
    const existingLatest = await prisma.versionTag.findFirst({
      where: { repositoryId: repo.id, isLatest: true },
      select: { tagName: true },
    });

    // New tag is latest if there's no existing latest, or if it's higher in semver
    const shouldBeLatest = !existingLatest || compareSemver(ref, existingLatest.tagName) < 0;

    if (shouldBeLatest) {
      // Reset isLatest for all existing tags
      await prisma.versionTag.updateMany({
        where: { repositoryId: repo.id },
        data: { isLatest: false },
      });
    }

    // Create/update the version tag
    await prisma.versionTag.upsert({
      where: {
        repositoryId_tagName: {
          repositoryId: repo.id,
          tagName: ref,
        },
      },
      update: {
        commitSha,
        isLatest: shouldBeLatest,
        syncedAt: new Date(),
      },
      create: {
        repositoryId: repo.id,
        tagName: ref,
        commitSha,
        isLatest: shouldBeLatest,
        createdAt: new Date(),
        syncedAt: new Date(),
      },
    });

    console.log(`✅ Version tag "${ref}" created successfully (isLatest: ${shouldBeLatest})`);

    // Sync documentation for semver tags
    if (isSemverTag(ref) && commitSha !== "unknown") {
      console.log(`📚 Syncing documentation for tag ${ref}...`);
      try {
        await syncTagDocumentation(repo.id, ref, commitSha);
        console.log(`✅ Documentation synced for tag ${ref}`);
      } catch (err) {
        console.error(`Failed to sync documentation for tag ${ref}:`, err);
      }
    }
  } catch (error) {
    console.error("Error handling create event:", error);
    throw error;
  }
}

export async function handleDeleteEvent(payload: any): Promise<void> {
  const refType = payload.ref_type;
  const ref = payload.ref;

  console.log(
    `🗑️  Handling delete event: ${refType} "${ref}" for ${payload.repository.full_name}`
  );

  // Only handle tag deletion
  if (refType !== "tag") {
    console.log(`⏭️  Skipping non-tag delete event (ref_type: ${refType})`);
    return;
  }

  try {
    const repo = await prisma.repository.findUnique({
      where: { fullName: payload.repository.full_name },
      select: { id: true },
    });

    if (!repo) {
      console.log(
        `Repository ${payload.repository.full_name} not found in database`
      );
      return;
    }

    // Delete the version tag
    await prisma.versionTag.deleteMany({
      where: {
        repositoryId: repo.id,
        tagName: ref,
      },
    });

    // If the deleted tag was the latest, set the most recent remaining tag as latest
    const latestTag = await prisma.versionTag.findFirst({
      where: { repositoryId: repo.id },
      orderBy: { createdAt: "desc" },
    });

    if (latestTag) {
      await prisma.versionTag.update({
        where: { id: latestTag.id },
        data: { isLatest: true },
      });
    }

    console.log(`✅ Version tag "${ref}" deleted successfully`);
  } catch (error) {
    console.error("Error handling delete event:", error);
    throw error;
  }
}
