"use server";

import { fetchGitHubRepo, fetchOrgRepositories } from "@/lib/github";
import { getGitHubClient } from "@/lib/github/client";
import { syncDocumentationV25 } from "@/lib/github/documentation-v25";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export async function importGitHubRepo(
  repoIdentifier: string
): Promise<ActionResult> {
  try {
    if (!repoIdentifier || !repoIdentifier.includes("/")) {
      return {
        success: false,
        error: "Please enter a valid GitHub repository (e.g., owner/repo)",
      };
    }

    const metadata = await fetchGitHubRepo(repoIdentifier);

    if (!metadata) {
      return {
        success: false,
        error: "Failed to fetch repository from GitHub. Please check the repository name and try again.",
      };
    }

    return {
      success: true,
      data: metadata,
      message: "Repository fetched successfully",
    };
  } catch (error) {
    console.error("Error importing GitHub repo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to import repository",
    };
  }
}

export async function getOrgRepositories(
  org: string
): Promise<ActionResult> {
  try {
    if (!org) {
      return {
        success: false,
        error: "Organization name is required",
      };
    }

    const repositories = await fetchOrgRepositories(org);

    return {
      success: true,
      data: repositories,
    };
  } catch (error) {
    console.error("Error fetching organization repositories:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch repositories",
    };
  }
}

export async function importAndSyncGitHubProject(data: {
  name: string;
  slug: string;
  description?: string;
  topics?: string[];
  published?: boolean;
  featured?: boolean;
  owner: string;
  repo: string;
  defaultBranch?: string;
  docsPath?: string;
}): Promise<ActionResult> {
  try {
    // Check if project with this slug already exists
    const existing = await prisma.project.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return {
        success: false,
        error: `A project with slug "${data.slug}" already exists`,
      };
    }

    // 1. Create the project and source in a transaction
    const { project, source } = await prisma.$transaction(async (tx) => {
      const newProject = await tx.project.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description || null,
          topics: data.topics || [],
          published: data.published ?? false,
          featured: data.featured ?? false,
        },
      });

      console.log(`Created project: ${newProject.slug} (${newProject.id})`);

      const fullName = `${data.owner}/${data.repo}`;
      const newSource = await tx.projectSource.create({
        data: {
          projectId: newProject.id,
          provider: "github",
          owner: data.owner,
          repo: data.repo,
          fullName,
          defaultBranch: data.defaultBranch || "main",
          docsPath: data.docsPath || "docs",
          isPrimary: true,
          metadata: {},
        },
      });

      console.log(`Created source: ${newSource.fullName}`);

      return { project: newProject, source: newSource };
    });

    // 2. Fetch and create versions from GitHub tags
    let versionCount = 0;
    let syncedDocsCount = 0;

    try {
      const octokit = getGitHubClient();
      const { data: tags } = await octokit.repos.listTags({
        owner: data.owner,
        repo: data.repo,
        per_page: 100,
      });

      console.log(`Found ${tags.length} tags for ${source.fullName}`);

      let latestVersionId: string | null = null;

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const version = await prisma.version.create({
          data: {
            projectId: project.id,
            tag: tag.name,
            gitRef: tag.commit.sha,
            isLatest: i === 0,
            docsSynced: false,
            fileCount: 0,
          },
        });

        versionCount++;

        if (i === 0) {
          latestVersionId = version.id;
        }

        console.log(`Created version: ${version.tag}`);
      }

      // 3. Sync documentation for the latest version (if exists)
      if (latestVersionId && tags.length > 0) {
        const latestTag = tags[0];
        console.log(`Syncing documentation for latest version: ${latestTag.name}`);

        try {
          const fileCount = await syncDocumentationV25({
            owner: data.owner,
            repo: data.repo,
            projectId: project.id,
            docsPath: data.docsPath || "docs",
            commitSha: latestTag.commit.sha,
            versionTag: latestTag.name,
          });

          await prisma.version.update({
            where: { id: latestVersionId },
            data: {
              fileCount,
              docsSynced: true,
              syncedAt: new Date(),
            },
          });

          syncedDocsCount = fileCount;
          console.log(`Synced ${fileCount} files for version ${latestTag.name}`);
        } catch (syncError) {
          console.error(`Error syncing documentation: ${syncError}`);
          // Continue even if sync fails - the project and versions are still created
        }
      }
    } catch (versionError) {
      console.error(`Error fetching/creating versions: ${versionError}`);
      // Project is still created successfully, just without versions
      // User can manually sync later
    }

    revalidatePath("/v2/projects");
    revalidatePath(`/v2/projects/${project.slug}`);

    const message = versionCount > 0
      ? `Project imported with ${versionCount} version${versionCount !== 1 ? 's' : ''}${syncedDocsCount > 0 ? ` and ${syncedDocsCount} documentation files` : ''}`
      : "Project created successfully. Use 'Sync from GitHub' to import versions and documentation.";

    return {
      success: true,
      data: project,
      message,
    };
  } catch (error) {
    console.error("Error importing and syncing GitHub project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to import project",
    };
  }
}

export async function resyncProjectFromGitHub(
  projectId: string
): Promise<ActionResult> {
  try {
    // 1. Get project and its primary source
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        sources: {
          where: { isPrimary: true },
        },
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    const source = project.sources[0];
    if (!source) {
      return {
        success: false,
        error: "No GitHub source found for this project",
      };
    }

    console.log(`Resyncing project: ${project.slug} from ${source.fullName}`);

    // 2. Fetch current tags from GitHub
    const octokit = getGitHubClient();
    const { data: tags } = await octokit.repos.listTags({
      owner: source.owner,
      repo: source.repo,
      per_page: 100,
    });

    console.log(`Found ${tags.length} tags for ${source.fullName}`);

    // 3. Get existing versions
    const existingVersions = await prisma.version.findMany({
      where: { projectId },
      select: { tag: true, id: true },
    });

    const existingTags = new Set(existingVersions.map((v) => v.tag));

    // 4. Create new versions and update existing ones
    let newVersionCount = 0;
    let latestVersionId: string | null = null;

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const isLatest = i === 0;

      if (existingTags.has(tag.name)) {
        // Update existing version
        const existingVersion = existingVersions.find((v) => v.tag === tag.name);
        if (existingVersion) {
          await prisma.version.update({
            where: { id: existingVersion.id },
            data: {
              gitRef: tag.commit.sha,
              isLatest,
            },
          });

          if (isLatest) {
            latestVersionId = existingVersion.id;
          }
        }
      } else {
        // Create new version
        const version = await prisma.version.create({
          data: {
            projectId,
            tag: tag.name,
            gitRef: tag.commit.sha,
            isLatest,
            docsSynced: false,
            fileCount: 0,
          },
        });

        newVersionCount++;
        console.log(`Created new version: ${version.tag}`);

        if (isLatest) {
          latestVersionId = version.id;
        }
      }
    }

    // Unset isLatest for versions that are no longer latest
    await prisma.version.updateMany({
      where: {
        projectId,
        isLatest: true,
        id: latestVersionId ? { not: latestVersionId } : undefined,
      },
      data: { isLatest: false },
    });

    // 5. Sync documentation for the latest version (if it exists)
    if (latestVersionId && tags.length > 0) {
      const latestTag = tags[0];
      console.log(`Syncing documentation for latest version: ${latestTag.name}`);

      try {
        const fileCount = await syncDocumentationV25({
          owner: source.owner,
          repo: source.repo,
          projectId,
          docsPath: source.docsPath,
          commitSha: latestTag.commit.sha,
          versionTag: latestTag.name,
        });

        await prisma.version.update({
          where: { id: latestVersionId },
          data: {
            fileCount,
            docsSynced: true,
            syncedAt: new Date(),
          },
        });

        console.log(`Synced ${fileCount} files for version ${latestTag.name}`);
      } catch (syncError) {
        console.error(`Error syncing documentation: ${syncError}`);
        // Continue even if sync fails
      }
    }

    // 6. Update source lastSyncedAt
    await prisma.projectSource.update({
      where: { id: source.id },
      data: { lastSyncedAt: new Date() },
    });

    revalidatePath(`/v2/projects/${project.slug}`);

    return {
      success: true,
      message: `Synced ${tags.length} versions (${newVersionCount} new)`,
      data: {
        totalVersions: tags.length,
        newVersions: newVersionCount,
      },
    };
  } catch (error) {
    console.error("Error resyncing project from GitHub:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to resync project",
    };
  }
}
