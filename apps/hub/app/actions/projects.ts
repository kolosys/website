"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma";
import type { SourceProvider } from "@/prisma/client/enums";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// ========== PROJECT CRUD ==========

export async function getProjects(filters?: {
  published?: boolean;
  featured?: boolean;
  search?: string;
}): Promise<ActionResult> {
  try {
    const where: Record<string, unknown> = {};

    if (filters?.published !== undefined) {
      where.published = filters.published;
    }

    if (filters?.featured !== undefined) {
      where.featured = filters.featured;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        _count: {
          select: {
            sources: true,
            versions: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { published: "desc" }, { name: "asc" }],
    });

    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      error: "Failed to fetch projects",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<ActionResult> {
  try {
    if (!slug) {
      return {
        success: false,
        error: "Project slug is required",
      };
    }

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        sources: true,
        versions: {
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            sources: true,
            versions: true,
            navStructure: true,
          },
        },
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return {
      success: false,
      error: "Failed to fetch project",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function createProject(data: {
  name: string;
  slug: string;
  description?: string;
  emoji?: string;
  faIcon?: string;
  topics?: string[];
  published?: boolean;
  featured?: boolean;
}): Promise<ActionResult> {
  try {
    if (!data.name || !data.slug) {
      return {
        success: false,
        error: "Project name and slug are required",
      };
    }

    // Check if slug already exists
    const existing = await prisma.project.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return {
        success: false,
        error: "A project with this slug already exists",
      };
    }

    const project = await prisma.project.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        emoji: data.emoji || null,
        faIcon: data.faIcon || null,
        topics: data.topics || [],
        published: data.published ?? false,
        featured: data.featured ?? false,
      },
    });

    revalidatePath("/v2/projects");

    return {
      success: true,
      message: "Project created successfully",
      data: project,
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: "Failed to create project",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateProject(
  projectId: string,
  data: Partial<{
    name: string;
    slug: string;
    description: string | null;
    emoji: string | null;
    faIcon: string | null;
    topics: string[];
    published: boolean;
    featured: boolean;
  }>
): Promise<ActionResult> {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    // If slug is being updated, check for conflicts
    if (data.slug && data.slug !== project.slug) {
      const existing = await prisma.project.findUnique({
        where: { slug: data.slug },
      });

      if (existing) {
        return {
          success: false,
          error: "A project with this slug already exists",
        };
      }
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.emoji !== undefined && { emoji: data.emoji }),
        ...(data.faIcon !== undefined && { faIcon: data.faIcon }),
        ...(data.topics !== undefined && { topics: data.topics }),
        ...(data.published !== undefined && { published: data.published }),
        ...(data.featured !== undefined && { featured: data.featured }),
      },
    });

    revalidatePath("/v2/projects");
    revalidatePath(`/v2/projects/${updated.slug}`);

    return {
      success: true,
      message: "Project updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    return {
      success: false,
      error: "Failed to update project",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteProject(
  projectId: string
): Promise<ActionResult> {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        _count: {
          select: {
            sources: true,
            versions: true,
            navStructure: true,
          },
        },
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    // Delete related data in correct order to avoid foreign key constraints
    await prisma.$transaction([
      // Delete navigation structures
      prisma.navStructure.deleteMany({
        where: { projectId },
      }),
      // Delete content (via versions)
      prisma.content.deleteMany({
        where: { version: { projectId } },
      }),
      // Delete versions
      prisma.version.deleteMany({
        where: { projectId },
      }),
      // Delete sources
      prisma.projectSource.deleteMany({
        where: { projectId },
      }),
      // Finally delete the project
      prisma.project.delete({
        where: { id: projectId },
      }),
    ]);

    revalidatePath("/v2/projects");

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    return {
      success: false,
      error: "Failed to delete project",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ========== PROJECT SOURCE CRUD ==========

export async function getProjectSources(
  projectId: string
): Promise<ActionResult> {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    const sources = await prisma.projectSource.findMany({
      where: { projectId },
      orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
    });

    return {
      success: true,
      data: sources,
    };
  } catch (error) {
    console.error(`Error fetching sources for project ${projectId}:`, error);
    return {
      success: false,
      error: "Failed to fetch project sources",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function addProjectSource(
  projectId: string,
  data: {
    provider: SourceProvider;
    owner: string;
    repo: string;
    defaultBranch?: string;
    docsPath?: string;
    isPrimary?: boolean;
  }
): Promise<ActionResult> {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    if (!data.provider || !data.owner || !data.repo) {
      return {
        success: false,
        error: "Provider, owner, and repo are required",
      };
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    // If this is set as primary, unset other primary sources
    if (data.isPrimary) {
      await prisma.projectSource.updateMany({
        where: { projectId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    const fullName = `${data.owner}/${data.repo}`;

    const source = await prisma.projectSource.create({
      data: {
        projectId,
        provider: data.provider,
        owner: data.owner,
        repo: data.repo,
        fullName,
        defaultBranch: data.defaultBranch || "main",
        docsPath: data.docsPath || "docs",
        isPrimary: data.isPrimary ?? false,
        metadata: {},
      },
    });

    revalidatePath(`/v2/projects/${project.slug}`);

    return {
      success: true,
      message: "Source added successfully",
      data: source,
    };
  } catch (error) {
    console.error("Error adding project source:", error);
    return {
      success: false,
      error: "Failed to add project source",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateProjectSource(
  sourceId: string,
  data: Partial<{
    defaultBranch: string;
    docsPath: string;
    isPrimary: boolean;
  }>
): Promise<ActionResult> {
  try {
    if (!sourceId) {
      return {
        success: false,
        error: "Source ID is required",
      };
    }

    const source = await prisma.projectSource.findUnique({
      where: { id: sourceId },
      include: { project: true },
    });

    if (!source) {
      return {
        success: false,
        error: "Source not found",
      };
    }

    // If this is set as primary, unset other primary sources
    if (data.isPrimary) {
      await prisma.projectSource.updateMany({
        where: { projectId: source.projectId, isPrimary: true, id: { not: sourceId } },
        data: { isPrimary: false },
      });
    }

    const updated = await prisma.projectSource.update({
      where: { id: sourceId },
      data: {
        ...(data.defaultBranch !== undefined && { defaultBranch: data.defaultBranch }),
        ...(data.docsPath !== undefined && { docsPath: data.docsPath }),
        ...(data.isPrimary !== undefined && { isPrimary: data.isPrimary }),
      },
    });

    revalidatePath(`/v2/projects/${source.project.slug}`);

    return {
      success: true,
      message: "Source updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error(`Error updating source ${sourceId}:`, error);
    return {
      success: false,
      error: "Failed to update source",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteProjectSource(
  sourceId: string
): Promise<ActionResult> {
  try {
    if (!sourceId) {
      return {
        success: false,
        error: "Source ID is required",
      };
    }

    const source = await prisma.projectSource.findUnique({
      where: { id: sourceId },
      include: { project: true },
    });

    if (!source) {
      return {
        success: false,
        error: "Source not found",
      };
    }

    await prisma.projectSource.delete({
      where: { id: sourceId },
    });

    revalidatePath(`/v2/projects/${source.project.slug}`);

    return {
      success: true,
      message: "Source deleted successfully",
    };
  } catch (error) {
    console.error(`Error deleting source ${sourceId}:`, error);
    return {
      success: false,
      error: "Failed to delete source",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ========== PROJECT VERSION OPERATIONS ==========

export async function getProjectVersions(
  projectId: string
): Promise<ActionResult> {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    const versions = await prisma.version.findMany({
      where: { projectId },
      orderBy: [{ isLatest: "desc" }, { createdAt: "desc" }],
      include: {
        _count: {
          select: {
            content: true,
          },
        },
      },
    });

    return {
      success: true,
      data: versions,
    };
  } catch (error) {
    console.error(`Error fetching versions for project ${projectId}:`, error);
    return {
      success: false,
      error: "Failed to fetch project versions",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function syncProjectVersion(
  projectId: string,
  versionId: string
): Promise<ActionResult> {
  try {
    if (!projectId || !versionId) {
      return {
        success: false,
        error: "Project ID and Version ID are required",
      };
    }

    const version = await prisma.version.findUnique({
      where: { id: versionId },
      include: { project: true },
    });

    if (!version || version.projectId !== projectId) {
      return {
        success: false,
        error: "Version not found or does not belong to this project",
      };
    }

    // TODO: Implement actual sync logic
    // For now, just update the syncedAt timestamp
    const updated = await prisma.version.update({
      where: { id: versionId },
      data: {
        syncedAt: new Date(),
        docsSynced: true,
      },
    });

    revalidatePath(`/v2/projects/${version.project.slug}`);

    return {
      success: true,
      message: "Version sync initiated successfully",
      data: updated,
    };
  } catch (error) {
    console.error(`Error syncing version ${versionId}:`, error);
    return {
      success: false,
      error: "Failed to sync version",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function syncAllProjectVersions(
  projectId: string
): Promise<ActionResult> {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { versions: true },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    // TODO: Implement actual sync logic for all versions
    // For now, just update all versions' syncedAt timestamps
    await prisma.version.updateMany({
      where: { projectId },
      data: {
        syncedAt: new Date(),
        docsSynced: true,
      },
    });

    revalidatePath(`/v2/projects/${project.slug}`);

    return {
      success: true,
      message: `Sync initiated for all ${project.versions.length} versions`,
    };
  } catch (error) {
    console.error(`Error syncing all versions for project ${projectId}:`, error);
    return {
      success: false,
      error: "Failed to sync all versions",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
