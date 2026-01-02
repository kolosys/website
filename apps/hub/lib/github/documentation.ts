import { getGitHubClient } from "./client";
import prisma from "@/prisma";
import matter from "gray-matter";

export interface SyncDocumentationOptions {
  owner: string;
  repo: string;
  repositoryId: string;
  docsPath?: string;
  branch?: string;
  commitSha?: string;
  versionTag: string;
}

export function isSemverTag(tagName: string): boolean {
  return /^v?\d+\.\d+\.\d+(-[\w.]+)?$/.test(tagName);
}

export async function syncDocumentation(
  options: SyncDocumentationOptions
): Promise<number> {
  const {
    owner,
    repo,
    repositoryId,
    docsPath = "/docs",
    branch,
    commitSha,
    versionTag,
  } = options;

  if (!branch && !commitSha) {
    throw new Error("Either branch or commitSha must be provided");
  }

  const octokit = getGitHubClient();
  let synced = 0;

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

    // Fetch the repository tree using the tree SHA from the commit
    const { data: tree } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: treeSha,
      recursive: "true",
    });

    // Filter for markdown files in docs directory
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

    // Build nested hierarchy structure from files
    type FileInfo = {
      file: (typeof docFiles)[0];
      slug: string[];
      groupSlug: string;
    };

    const files: FileInfo[] = [];
    const indexFilePaths = new Set<string>(); // Track actual index.md files

    for (const file of docFiles) {
      if (!file.sha || !file.path) continue;

      const relative = file.path
        .replace(new RegExp(`^${normalizedDocsPath}/?`), "")
        .replace(/\.md$/, "");
      const slug = relative.split("/").filter(Boolean);
      const groupSlug = slug.length > 0 ? slug[0] : "uncategorized";

      // Track if this is an index.md file
      if (slug[slug.length - 1] === "index") {
        // This is an actual index.md file - track its directory path
        const dirPath = slug.slice(0, -1);
        if (dirPath.length > 0) {
          const dirFilePath = `${normalizedDocsPath}/${dirPath.join(
            "/"
          )}/index.md`;
          indexFilePaths.add(dirFilePath);
        }
      }

      files.push({ file, slug, groupSlug });
    }

    // Get existing content for this version to preserve orderIndex for existing files
    const existingContent = await prisma.documentationContent.findMany({
      where: { repositoryId, versionTag },
      select: {
        filePath: true,
        groupSlug: true,
        orderIndex: true,
        slug: true,
        hidden: true,
      },
    });

    const existingContentMap = new Map(
      existingContent.map((item) => [item.filePath, item])
    );

    // Build a nested tree structure to calculate orderIndex for each level
    type TreeNode = {
      slug: string;
      files: FileInfo[];
      children: Map<string, TreeNode>;
      orderIndex?: number;
    };

    const rootNodes = new Map<string, TreeNode>();

    // Build tree structure
    for (const fileInfo of files) {
      let currentLevel = rootNodes;
      let currentPath: string[] = [];

      for (let i = 0; i < fileInfo.slug.length; i++) {
        const segment = fileInfo.slug[i];
        currentPath.push(segment);

        if (!currentLevel.has(segment)) {
          currentLevel.set(segment, {
            slug: segment,
            files: [],
            children: new Map(),
          });
        }

        const node = currentLevel.get(segment)!;

        // If this is the last segment (file), add file to node
        if (i === fileInfo.slug.length - 1) {
          node.files.push(fileInfo);
        } else {
          // Otherwise, continue to next level
          currentLevel = node.children;
        }
      }
    }

    // Determine group order: use existing orderIndex[0] if available, otherwise alphabetical
    const groupOrderMap = new Map<string, number>();
    const groupsWithOrder = new Set<number>();

    // Collect existing group orders
    for (const item of existingContent) {
      if (item.orderIndex.length > 0) {
        const groupOrder = item.orderIndex[0];
        if (
          !groupOrderMap.has(item.groupSlug) ||
          groupOrderMap.get(item.groupSlug)! > groupOrder
        ) {
          groupOrderMap.set(item.groupSlug, groupOrder);
          groupsWithOrder.add(groupOrder);
        }
      }
    }

    // Assign group orders to groups that don't have one
    let nextGroupOrder = 0;
    const sortedGroupSlugs = Array.from(rootNodes.keys()).sort((a, b) => {
      const aOrder = groupOrderMap.get(a);
      const bOrder = groupOrderMap.get(b);

      if (aOrder !== undefined && bOrder !== undefined) {
        return aOrder - bOrder;
      }
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;
      return a.localeCompare(b);
    });

    for (const groupSlug of sortedGroupSlugs) {
      if (!groupOrderMap.has(groupSlug)) {
        while (groupsWithOrder.has(nextGroupOrder)) {
          nextGroupOrder++;
        }
        groupOrderMap.set(groupSlug, nextGroupOrder);
        groupsWithOrder.add(nextGroupOrder);
        nextGroupOrder++;
      }
    }

    // Helper function to calculate orderIndex for a file based on its position in the tree
    const calculateOrderIndex = (
      fileInfo: FileInfo,
      groupOrder: number
    ): number[] => {
      const orderIndex: number[] = [groupOrder];
      let currentNode = rootNodes.get(fileInfo.groupSlug);

      if (!currentNode) return orderIndex;

      // Traverse tree level by level to build orderIndex
      // For slug ["examples", "circuit", "main"]:
      // - orderIndex[0] = groupOrder (already set)
      // - orderIndex[1] = position of "circuit" among "examples" children
      // - orderIndex[2] = position of "main" among "circuit" files

      for (let i = 1; i < fileInfo.slug.length; i++) {
        const segment = fileInfo.slug[i];
        const isLastSegment = i === fileInfo.slug.length - 1;

        if (isLastSegment) {
          // Last segment is the file itself
          // Find its position among files in the current node
          const filesAtThisLevel = currentNode.files.filter((f) => {
            // Files that share the same parent path up to this point
            return (
              f.slug.length === fileInfo.slug.length &&
              f.slug.slice(0, i).every((seg, idx) => seg === fileInfo.slug[idx])
            );
          });

          // Sort files alphabetically by full slug
          filesAtThisLevel.sort((a, b) => {
            const aSlug = a.slug.join("/");
            const bSlug = b.slug.join("/");
            return aSlug.localeCompare(bSlug);
          });

          const fileIndex = filesAtThisLevel.findIndex(
            (f) => f.file.path === fileInfo.file.path
          );
          orderIndex.push(fileIndex >= 0 ? fileIndex : 0);
        } else {
          // Intermediate segment (directory) - find its position among sibling directories
          const siblingKeys = Array.from(currentNode.children.keys()).sort();
          const segmentIndex = siblingKeys.indexOf(segment);

          if (segmentIndex >= 0) {
            orderIndex.push(segmentIndex);
            // Move to next level
            currentNode = currentNode.children.get(segment);
            if (!currentNode) break;
          } else {
            // Segment not found (shouldn't happen), break
            break;
          }
        }
      }

      return orderIndex;
    };

    // Helper function to check if a directory has an index.md file
    const hasIndexFile = (dirSlug: string[]): boolean => {
      const dirFilePath = `${normalizedDocsPath}/${dirSlug.join("/")}/index.md`;
      return indexFilePaths.has(dirFilePath);
    };

    // Helper function to create empty content row for a directory
    const createDirectoryContent = async (
      dirSlug: string[],
      parentOrderIndex: number[]
    ): Promise<void> => {
      // Construct filePath for the directory index.md (even though it doesn't exist)
      const dirFilePath = `${normalizedDocsPath}/${dirSlug.join("/")}/index.md`;

      // Check if directory content already exists in database
      const existing = existingContentMap.get(dirFilePath);

      // Get group order for this directory
      const groupSlug = dirSlug[0] || "uncategorized";
      const groupOrder = groupOrderMap.get(groupSlug) ?? 0;

      // Calculate orderIndex for this directory
      let orderIndex: number[] = [];
      if (existing && existing.orderIndex.length > 0) {
        // Preserve existing orderIndex
        orderIndex = existing.orderIndex;
      } else {
        // Calculate based on position in tree
        orderIndex = [groupOrder];

        // Add position indices for each level of nesting
        // For dirSlug ["examples", "circuit"]:
        // - orderIndex[0] = groupOrder (already set)
        // - orderIndex[1] = position of "circuit" among "examples" children
        let currentNode = rootNodes.get(dirSlug[0]);

        for (let i = 1; i < dirSlug.length; i++) {
          const currentSegment = dirSlug[i];

          if (currentNode) {
            const siblings = Array.from(currentNode.children.keys()).sort();
            const segmentIndex = siblings.indexOf(currentSegment);
            if (segmentIndex >= 0) {
              orderIndex.push(segmentIndex);
            }
            // Move to next level
            currentNode = currentNode.children.get(currentSegment);
          } else {
            break;
          }
        }
      }

      const dirName =
        dirSlug[dirSlug.length - 1]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Untitled";

      // Check if this is a group-level index (slug.length === 1 means it's at the group root)
      const isGroupLevelIndex = dirSlug.length === 1;

      try {
        // Fetch existing content from database to preserve custom fields
        const existingDb = await prisma.documentationContent.findUnique({
          where: {
            repositoryId_filePath_versionTag: {
              repositoryId,
              filePath: dirFilePath,
              versionTag,
            },
          },
        });

        await prisma.documentationContent.upsert({
          where: {
            repositoryId_filePath_versionTag: {
              repositoryId,
              filePath: dirFilePath,
              versionTag,
            },
          },
          update: {
            slug: dirSlug,
            groupSlug,
            title: existingDb?.title || dirName,
            content: existingDb?.content || "",
            description: existingDb?.description || null,
            orderIndex,
            emoji: existingDb?.emoji || null,
            faIcon: existingDb?.faIcon || null,
            status: existingDb?.status || "Stable",
            version: existingDb?.version || null,
            hidden: isGroupLevelIndex ? true : existingDb?.hidden ?? false,
            updatedAt: new Date(),
          },
          create: {
            repositoryId,
            filePath: dirFilePath,
            versionTag,
            slug: dirSlug,
            groupSlug,
            title: dirName,
            content: "",
            description: null,
            orderIndex,
            emoji: null,
            faIcon: null,
            status: "Stable",
            version: null,
            hidden: isGroupLevelIndex,
          },
        });
        synced++;
      } catch (error) {
        console.error(
          `Error creating directory content for ${dirFilePath}:`,
          error
        );
      }
    };

    // Recursive function to process directories and create empty rows for those without index.md
    const processDirectories = async (
      nodes: Map<string, TreeNode>,
      currentPath: string[],
      parentOrderIndex: number[]
    ): Promise<void> => {
      for (const [nodeSlug, node] of nodes.entries()) {
        const dirSlug = [...currentPath, nodeSlug];

        // Only create directory rows for nodes that:
        // 1. Have subdirectories (node.children.size > 0) - directories with nested content
        //    OR have multiple files (node.files.length > 1) - directories with multiple files
        //    OR have both files and subdirectories
        // 2. Are not root-level groups (currentPath.length > 0 means it's nested)
        // 3. Don't have an index.md file
        const hasSubdirectories = node.children.size > 0;
        const hasMultipleFiles = node.files.length > 1;
        const hasFilesAndSubdirs = node.files.length > 0 && hasSubdirectories;
        const isNestedDirectory = currentPath.length > 0; // Not a root group
        const isRootGroup = currentPath.length === 0; // Root-level group

        // Create directory row if:
        // - It's a nested directory (not root group) AND has subdirectories OR multiple files OR both files and subdirectories AND doesn't have an index.md file
        // - OR it's a root-level group (for tracking settings) AND doesn't have an index.md file
        const shouldCreateDirectoryRow =
          (isNestedDirectory &&
            (hasSubdirectories || hasMultipleFiles || hasFilesAndSubdirs) &&
            !hasIndexFile(dirSlug)) ||
          (isRootGroup && !hasIndexFile(dirSlug));

        if (shouldCreateDirectoryRow) {
          // Directory has children but no index.md - create empty content row
          // For root groups, this creates a hidden row for tracking settings
          await createDirectoryContent(dirSlug, parentOrderIndex);
        }

        // Recurse into children (subdirectories)
        if (hasSubdirectories) {
          const nodeOrderIndex = [...parentOrderIndex];
          // Add this node's position to orderIndex
          const siblings = Array.from(nodes.keys()).sort();
          const nodeIndex = siblings.indexOf(nodeSlug);
          if (nodeIndex >= 0) {
            nodeOrderIndex.push(nodeIndex);
          }
          await processDirectories(node.children, dirSlug, nodeOrderIndex);
        }
      }
    };

    // Process directories after building tree but before processing files
    await processDirectories(rootNodes, [], []);

    // Fetch and process each file
    let totalSize = 0;
    for (const fileInfo of files) {
      // Skip actual index.md files - they will replace directory rows via upsert
      // Directory rows are created separately in processDirectories
      const isIndexFile = fileInfo.slug[fileInfo.slug.length - 1] === "index";
      if (isIndexFile) {
        // This is an actual index.md file - it will replace any directory row via upsert
        // Continue processing it normally
      }

      const groupOrder = groupOrderMap.get(fileInfo.groupSlug)!;

      try {
        // Fetch file content
        const { data: blob } = await octokit.git.getBlob({
          owner,
          repo,
          file_sha: fileInfo.file.sha!,
        });

        const content = Buffer.from(blob.content, "base64").toString("utf-8");
        totalSize += content.length;

        // Parse frontmatter
        const { data: frontmatter, content: markdownContent } = matter(content);

        // Check if file already exists
        const existing = existingContentMap.get(fileInfo.file.path);
        const groupChanged =
          existing && existing.groupSlug !== fileInfo.groupSlug;

        // For actual index.md files, check if there's a directory row that should be replaced
        // Directory rows have the same filePath but slug without "index" at the end
        let isReplacingDirectoryRow = false;
        if (isIndexFile) {
          const dirSlug = fileInfo.slug.slice(0, -1); // Remove "index" from slug
          const dirFilePath = fileInfo.file.path; // Same filePath
          const dirRow = existingContent.find(
            (item) =>
              item.filePath === dirFilePath &&
              item.slug.length === dirSlug.length &&
              item.slug.every((seg, idx) => seg === dirSlug[idx])
          );
          if (dirRow) {
            isReplacingDirectoryRow = true;
          }
        }

        // Determine orderIndex:
        // 1. If frontmatter.order exists, use it (highest priority)
        // 2. If file exists and group hasn't changed, preserve existing orderIndex
        // 3. Otherwise, calculate based on tree position
        let orderIndex: number[] = [];

        if (frontmatter.order !== undefined && frontmatter.order !== null) {
          // Frontmatter order takes precedence
          if (Array.isArray(frontmatter.order)) {
            orderIndex = frontmatter.order;
          } else if (typeof frontmatter.order === "number") {
            orderIndex = [frontmatter.order];
          }
        } else if (
          existing &&
          !groupChanged &&
          existing.orderIndex.length > 0
        ) {
          // Preserve existing orderIndex if group hasn't changed
          // Also check if slug path matches (file hasn't moved)
          const slugMatches =
            existing.slug.length === fileInfo.slug.length &&
            existing.slug.every((seg, idx) => seg === fileInfo.slug[idx]);

          if (slugMatches) {
            orderIndex = existing.orderIndex;
          } else {
            // Slug changed, recalculate
            orderIndex = calculateOrderIndex(fileInfo, groupOrder);
          }
        } else {
          // Calculate orderIndex based on tree position
          orderIndex = calculateOrderIndex(fileInfo, groupOrder);
        }

        // Upsert documentation content
        try {
          // For index.md files that replace directory rows, use the directory slug (without "index")
          const finalSlug =
            isReplacingDirectoryRow && isIndexFile
              ? fileInfo.slug.slice(0, -1)
              : fileInfo.slug;

          const isGroupLevelIndex = finalSlug.length === 1 && isIndexFile;

          await prisma.documentationContent.upsert({
            where: {
              repositoryId_filePath_versionTag: {
                repositoryId,
                filePath: fileInfo.file.path,
                versionTag,
              },
            },
            update: {
              slug: finalSlug,
              groupSlug: fileInfo.groupSlug,
              title:
                frontmatter.title ||
                (isIndexFile && isReplacingDirectoryRow
                  ? finalSlug[finalSlug.length - 1].replace(/-/g, " ")
                  : fileInfo.slug[fileInfo.slug.length - 1].replace(/-/g, " ")),
              content: markdownContent,
              description: frontmatter.description,
              orderIndex,
              version: frontmatter.version,
              status: frontmatter.status || "Stable",
              emoji: frontmatter.emoji,
              faIcon: frontmatter.faIcon,
              hidden: isGroupLevelIndex ? true : existing?.hidden ?? false,
              updatedAt: new Date(),
            },
            create: {
              repositoryId,
              filePath: fileInfo.file.path,
              versionTag,
              slug: finalSlug,
              groupSlug: fileInfo.groupSlug,
              title:
                frontmatter.title ||
                (isIndexFile && isReplacingDirectoryRow
                  ? finalSlug[finalSlug.length - 1].replace(/-/g, " ")
                  : fileInfo.slug[fileInfo.slug.length - 1].replace(/-/g, " ")),
              content: markdownContent,
              description: frontmatter.description,
              orderIndex,
              version: frontmatter.version,
              status: frontmatter.status || "Stable",
              emoji: frontmatter.emoji,
              faIcon: frontmatter.faIcon,
              hidden: isGroupLevelIndex,
            },
          });
          synced++;
        } catch (error) {
          console.error(`Error syncing doc ${fileInfo.file.path}:`, error);
        }
      } catch (err) {
        console.error(`Error processing doc file ${fileInfo.file.path}:`, err);
      }
    }

    // Update documentation metadata for this version
    await prisma.documentationMetadata.upsert({
      where: {
        repositoryId_versionTag: {
          repositoryId,
          versionTag,
        },
      },
      update: {
        lastCommitSha,
        lastSyncedAt: new Date(),
        fileCount: synced,
        totalSize,
      },
      create: {
        repositoryId,
        versionTag,
        lastCommitSha,
        lastSyncedAt: new Date(),
        fileCount: synced,
        totalSize,
      },
    });

    console.log(
      `Successfully synced ${synced} documentation files for ${owner}/${repo}`
    );
    return synced;
  } catch (error) {
    console.error(`Error syncing documentation for ${owner}/${repo}:`, error);
    throw error;
  }
}

export async function syncAllDocumentation(
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
        defaultBranch: true,
        docsPath: true,
      },
    });

    if (!repos || repos.length === 0) return 0;

    for (const repo of repos) {
      try {
        // Sync main branch as "next"
        const synced = await syncDocumentation({
          owner: repo.owner,
          repo: repo.name,
          repositoryId: repo.id,
          docsPath: repo.docsPath,
          branch: repo.defaultBranch,
          versionTag: "next",
        });
        totalSynced += synced;
      } catch (error) {
        console.error(
          `Failed to sync documentation for ${repo.fullName}:`,
          error
        );
      }
    }

    return totalSynced;
  } catch (error) {
    console.error("Error syncing all documentation:", error);
    throw error;
  }
}

export async function syncTagDocumentation(
  repositoryId: string,
  tagName: string,
  commitSha: string
): Promise<number> {
  const repo = await prisma.repository.findUnique({
    where: { id: repositoryId },
    select: {
      owner: true,
      name: true,
      docsPath: true,
    },
  });

  if (!repo) {
    throw new Error(`Repository not found: ${repositoryId}`);
  }

  const synced = await syncDocumentation({
    owner: repo.owner,
    repo: repo.name,
    repositoryId,
    docsPath: repo.docsPath,
    commitSha,
    versionTag: tagName,
  });

  // Mark the tag as synced
  await prisma.versionTag.update({
    where: {
      repositoryId_tagName: {
        repositoryId,
        tagName,
      },
    },
    data: {
      docsSynced: true,
      docsSyncedAt: new Date(),
    },
  });

  return synced;
}

export async function getSyncedVersions(
  repositoryId: string
): Promise<string[]> {
  const metadata = await prisma.documentationMetadata.findMany({
    where: { repositoryId },
    select: { versionTag: true },
    orderBy: { lastSyncedAt: "desc" },
  });

  return metadata.map((m) => m.versionTag);
}
