#!/usr/bin/env tsx

import prisma, { type NavNodeType, type DocumentationContent } from '../prisma/index.js';

interface ContentGroup {
  [tag: string]: DocumentationContent[];
}

function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

async function convertOrderIndexToNavStructure(
  projectId: string,
  content: DocumentationContent[]
): Promise<void> {
  console.log(`  Converting orderIndex to NavStructure for project ${projectId}...`);

  // Step 1: Sort content by orderIndex (lexicographic comparison)
  const sorted = content.slice().sort((a, b) => {
    for (let i = 0; i < Math.max(a.orderIndex.length, b.orderIndex.length); i++) {
      const ai = a.orderIndex[i] ?? -1;
      const bi = b.orderIndex[i] ?? -1;
      if (ai !== bi) return ai - bi;
    }
    return 0;
  });

  // Step 2: Build hierarchy map (slug → parent slug)
  const hierarchyMap = new Map<string, string | null>();
  for (const item of sorted) {
    const key = item.slug.join('/');
    const parent = item.slug.length > 1
      ? item.slug.slice(0, -1).join('/')
      : null;
    hierarchyMap.set(key, parent);
  }

  // Step 3: Create NavStructure records
  const created = new Map<string, string>(); // slug key → nav ID

  for (const item of sorted) {
    const slugKey = item.slug.join('/');
    const parentKey = hierarchyMap.get(slugKey);
    const parentId = parentKey ? created.get(parentKey) : null;

    // Calculate sortOrder: position among siblings with same parent
    const siblings = sorted.filter(s => {
      const sKey = s.slug.join('/');
      return hierarchyMap.get(sKey) === parentKey;
    });
    const sortOrder = siblings.findIndex(s => s.slug.join('/') === slugKey);

    // Determine type: group if content is empty and file ends with index.md
    const type: NavNodeType =
      item.content === '' && item.filePath.endsWith('/index.md')
        ? 'group'
        : 'page';

    const nav = await prisma.navStructure.create({
      data: {
        projectId,
        parentId,
        slugPattern: item.slug,
        sortOrder,
        type,
        customEmoji: item.emoji,
        customIcon: item.faIcon,
        hidden: item.hidden,
      }
    });

    created.set(slugKey, nav.id);
  }

  console.log(`    Created ${created.size} NavStructure records`);
}

async function migrateToV25() {
  console.log('Starting v2.5 migration...\n');

  const repos = await prisma.repository.findMany({
    include: {
      documentationContent: true,
      versionTags: true,
    }
  });

  console.log(`Found ${repos.length} repositories to migrate\n`);

  for (const repo of repos) {
    console.log(`Migrating repository: ${repo.fullName}`);

    // 1. Create Project
    const project = await prisma.project.create({
      data: {
        slug: repo.name.toLowerCase(),
        name: repo.name,
        description: repo.description,
        published: repo.published,
        featured: repo.featured,
        emoji: repo.emoji,
        faIcon: repo.faIcon,
        topics: repo.topics,
      }
    });

    console.log(`  Created project: ${project.slug} (${project.id})`);

    // 2. Create ProjectSource
    await prisma.projectSource.create({
      data: {
        projectId: project.id,
        provider: 'github',
        owner: repo.owner,
        repo: repo.name,
        fullName: repo.fullName,
        defaultBranch: repo.defaultBranch,
        docsPath: repo.docsPath,
        lastSyncedAt: repo.syncedAt,
        isPrimary: true,
        metadata: {
          githubId: repo.githubId.toString(),
          stars: repo.stargazersCount,
          forks: repo.forksCount,
          watchers: repo.watchersCount,
          language: repo.language,
          archived: repo.archived,
          disabled: repo.disabled,
        },
      }
    });

    console.log(`  Created project source`);

    // 3. Migrate Versions
    const versionGroups = groupBy(
      repo.documentationContent,
      doc => doc.versionTag
    );

    console.log(`  Found ${Object.keys(versionGroups).length} versions`);

    for (const [tag, docs] of Object.entries(versionGroups)) {
      const versionTag = repo.versionTags.find(v => v.tagName === tag);

      const version = await prisma.version.create({
        data: {
          projectId: project.id,
          tag,
          isLatest: versionTag?.isLatest ?? false,
          gitRef: versionTag?.commitSha,
          docsSynced: true,
          syncedAt: versionTag?.docsSyncedAt,
          fileCount: docs.length,
        }
      });

      console.log(`    Created version: ${tag} with ${docs.length} content items`);

      // 4. Migrate Content
      for (const doc of docs) {
        await prisma.content.create({
          data: {
            versionId: version.id,
            filePath: doc.filePath,
            slug: doc.slug,
            title: doc.title,
            content: doc.content,
            description: doc.description,
            emoji: doc.emoji,
            faIcon: doc.faIcon,
            status: doc.status,
            wordCount: doc.content.split(/\s+/).length,
            byteSize: Buffer.byteLength(doc.content),
          }
        });
      }
    }

    // 5. Generate NavStructure from first version's content
    const firstVersionContent = Object.values(versionGroups)[0];
    if (firstVersionContent && firstVersionContent.length > 0) {
      await convertOrderIndexToNavStructure(project.id, firstVersionContent);
    }

    console.log(`Completed migration for ${repo.fullName}\n`);
  }

  console.log('Migration completed successfully!');
}

migrateToV25()
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
