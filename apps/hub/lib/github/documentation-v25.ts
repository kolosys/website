import { getGitHubClient } from "./client";
import prisma, { type NavNodeType } from "@/prisma";
import matter from "gray-matter";

export interface SyncDocumentationV25Options {
  owner: string;
  repo: string;
  projectId: string;
  docsPath?: string;
  branch?: string;
  commitSha?: string;
  versionTag: string;
}

export async function syncDocumentationV25(
  options: SyncDocumentationV25Options
): Promise<number> {
  const {
    owner,
    repo,
    projectId,
    docsPath = "/docs",
    branch,
    commitSha,
    versionTag,
  } = options;

  if (!branch && !commitSha) {
    throw new Error("Either branch or commitSha must be provided");
  }

  const octokit = getGitHubClient();

  try {
    let lastCommitSha: string;
    let treeSha: string;

    if (commitSha) {
      lastCommitSha = commitSha;
      const { data: commit } = await octokit.git.getCommit({
        owner,
        repo,
        commit_sha: commitSha,
      });
      treeSha = commit.tree.sha;
    } else {
      const { data: branchData } = await octokit.repos.getBranch({
        owner,
        repo,
        branch: branch!,
      });
      lastCommitSha = branchData.commit.sha;
      const { data: commit } = await octokit.git.getCommit({
        owner,
        repo,
        commit_sha: lastCommitSha,
      });
      treeSha = commit.tree.sha;
    }

    const { data: tree } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: treeSha,
      recursive: "true",
    });

    const normalizedDocsPath = docsPath.replace(/^\//, "");
    const docFiles = tree.tree.filter(
      (item) =>
        item.path?.startsWith(normalizedDocsPath) &&
        item.path.endsWith(".md") &&
        item.type === "blob"
    );

    console.log(
      `Found ${docFiles.length} documentation files for ${owner}/${repo}`
    );

    if (docFiles.length === 0) {
      console.log(
        `No documentation files found in ${docsPath} for ${owner}/${repo}`
      );
      return 0;
    }

    // Find or create version
    const version = await prisma.version.upsert({
      where: {
        projectId_tag: {
          projectId,
          tag: versionTag,
        },
      },
      create: {
        projectId,
        tag: versionTag,
        gitRef: lastCommitSha,
        docsSynced: true,
        syncedAt: new Date(),
        fileCount: docFiles.length,
      },
      update: {
        gitRef: lastCommitSha,
        docsSynced: true,
        syncedAt: new Date(),
        fileCount: docFiles.length,
      },
    });

    // Delete old content for this version
    await prisma.content.deleteMany({
      where: { versionId: version.id },
    });

    // Process and create content
    for (const file of docFiles) {
      if (!file.sha || !file.path) continue;

      const { data: blob } = await octokit.git.getBlob({
        owner,
        repo,
        file_sha: file.sha,
      });

      const content = Buffer.from(blob.content, "base64").toString("utf-8");
      const { data: frontmatter, content: markdown } = matter(content);

      const relative = file.path
        .replace(new RegExp(`^${normalizedDocsPath}/?`), "")
        .replace(/\.md$/, "");
      const slugArray = relative.split("/").filter(Boolean);

      await prisma.content.create({
        data: {
          versionId: version.id,
          filePath: file.path,
          slug: slugArray,
          title: frontmatter.title || extractTitle(markdown) || slugArray[slugArray.length - 1],
          content: markdown,
          description: frontmatter.description,
          emoji: frontmatter.emoji,
          faIcon: frontmatter.faIcon || frontmatter.fa_icon,
          status: frontmatter.status,
          wordCount: markdown.split(/\s+/).length,
          byteSize: Buffer.byteLength(markdown),
        },
      });
    }

    // Generate NavStructure ONLY if project has no navigation yet
    const existingNav = await prisma.navStructure.count({
      where: { projectId },
    });

    if (existingNav === 0) {
      await generateNavFromContent(projectId, version.id);
    }

    return docFiles.length;
  } catch (error) {
    console.error(`Error syncing documentation for ${owner}/${repo}:`, error);
    throw error;
  }
}

function extractTitle(markdown: string): string | null {
  const lines = markdown.split("\n");
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.substring(2).trim();
    }
  }
  return null;
}

export async function generateNavFromContent(
  projectId: string,
  versionId: string
): Promise<void> {
  console.log(`Generating NavStructure for project ${projectId} from version ${versionId}...`);

  const content = await prisma.content.findMany({
    where: { versionId },
    orderBy: { filePath: "asc" },
  });

  if (content.length === 0) {
    console.log("No content found, skipping navigation generation");
    return;
  }

  // Build hierarchy from file paths
  const hierarchy = buildHierarchyFromPaths(content);

  // Create NavStructure records
  await createNavRecords(projectId, hierarchy);

  console.log(`Generated NavStructure for ${hierarchy.length} nodes`);
}

interface HierarchyNode {
  slugPattern: string[];
  parentSlug: string[] | null;
  sortOrder: number;
  type: NavNodeType;
  emoji: string | null;
  faIcon: string | null;
}

function buildHierarchyFromPaths(
  content: Array<{
    slug: string[];
    filePath: string;
    content: string;
    emoji: string | null;
    faIcon: string | null;
  }>
): HierarchyNode[] {
  const nodes: HierarchyNode[] = [];
  const processedPaths = new Set<string>();

  // Sort content by slug for consistent ordering
  const sortedContent = content.slice().sort((a, b) =>
    a.slug.join("/").localeCompare(b.slug.join("/"))
  );

  // First pass: create all directory nodes
  for (const item of sortedContent) {
    for (let i = 1; i <= item.slug.length; i++) {
      const slugPattern = item.slug.slice(0, i);
      const key = slugPattern.join("/");

      if (processedPaths.has(key)) continue;
      processedPaths.add(key);

      const parentSlug = i > 1 ? item.slug.slice(0, i - 1) : null;

      // Determine siblings with same parent
      const siblings = Array.from(processedPaths)
        .filter((path) => {
          const pathParts = path.split("/");
          if (pathParts.length !== i) return false;
          if (!parentSlug) return pathParts.length === 1;
          return path.startsWith(parentSlug.join("/") + "/");
        })
        .sort();

      const sortOrder = siblings.indexOf(key);

      // Determine type
      const isLastSegment = i === item.slug.length;
      const type: NavNodeType =
        !isLastSegment ||
        (item.content === "" && item.filePath.endsWith("/index.md"))
          ? "group"
          : "page";

      nodes.push({
        slugPattern,
        parentSlug,
        sortOrder,
        type,
        emoji: isLastSegment ? item.emoji : null,
        faIcon: isLastSegment ? item.faIcon : null,
      });
    }
  }

  return nodes;
}

async function createNavRecords(
  projectId: string,
  hierarchy: HierarchyNode[]
): Promise<void> {
  const createdMap = new Map<string, string>(); // slug key → nav ID

  // Sort by depth (number of segments) to ensure parents are created first
  const sorted = hierarchy.slice().sort((a, b) => a.slugPattern.length - b.slugPattern.length);

  for (const node of sorted) {
    const parentKey = node.parentSlug?.join("/");
    const parentId = parentKey ? createdMap.get(parentKey) : null;

    const nav = await prisma.navStructure.create({
      data: {
        projectId,
        parentId,
        slugPattern: node.slugPattern,
        sortOrder: node.sortOrder,
        type: node.type,
        customEmoji: node.emoji,
        customIcon: node.faIcon,
        hidden: false,
      },
    });

    createdMap.set(node.slugPattern.join("/"), nav.id);
  }
}
