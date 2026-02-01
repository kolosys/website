"use server";

import prisma from "@/prisma";

async function recompactSortOrder(
  projectId: string,
  parentId: string | null
): Promise<void> {
  const siblings = await prisma.navStructure.findMany({
    where: { projectId, parentId },
    orderBy: { sortOrder: "asc" },
  });

  await prisma.$transaction(
    siblings.map((s, i) =>
      prisma.navStructure.update({
        where: { id: s.id },
        data: { sortOrder: i },
      })
    )
  );
}

export async function reorderNavNode(
  projectId: string,
  nodeId: string,
  newSortOrder: number
) {
  try {
    if (!projectId || !nodeId) {
      return {
        success: false,
        error: "Project ID and Node ID are required",
      };
    }

    const node = await prisma.navStructure.findUnique({
      where: { id: nodeId },
    });

    if (!node || node.projectId !== projectId) {
      return {
        success: false,
        error: "Node not found or does not belong to this project",
      };
    }

    // Get all siblings
    const siblings = await prisma.navStructure.findMany({
      where: { projectId, parentId: node.parentId },
      orderBy: { sortOrder: "asc" },
    });

    // Reorder: remove node, insert at new position, reassign sortOrder
    const filtered = siblings.filter((s) => s.id !== nodeId);
    filtered.splice(newSortOrder, 0, node);

    // Update all siblings
    await prisma.$transaction(
      filtered.map((s, i) =>
        prisma.navStructure.update({
          where: { id: s.id },
          data: { sortOrder: i },
        })
      )
    );

    return {
      success: true,
      message: "Navigation node reordered successfully",
    };
  } catch (error) {
    console.error(`Error reordering navigation node ${nodeId}:`, error);
    return {
      success: false,
      error: "Failed to reorder navigation node",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function moveNavNode(
  projectId: string,
  nodeId: string,
  newParentId: string | null,
  newSortOrder: number
) {
  try {
    if (!projectId || !nodeId) {
      return {
        success: false,
        error: "Project ID and Node ID are required",
      };
    }

    const node = await prisma.navStructure.findUnique({
      where: { id: nodeId },
    });

    if (!node || node.projectId !== projectId) {
      return {
        success: false,
        error: "Node not found or does not belong to this project",
      };
    }

    // Validate new parent exists if provided
    if (newParentId) {
      const newParent = await prisma.navStructure.findUnique({
        where: { id: newParentId },
      });

      if (!newParent || newParent.projectId !== projectId) {
        return {
          success: false,
          error: "New parent node not found or does not belong to this project",
        };
      }

      // Prevent circular references
      let current = newParent;
      while (current.parentId) {
        if (current.parentId === nodeId) {
          return {
            success: false,
            error: "Cannot move node to its own descendant",
          };
        }
        const parent = await prisma.navStructure.findUnique({
          where: { id: current.parentId },
        });
        if (!parent) break;
        current = parent;
      }
    }

    const oldParentId = node.parentId;

    // Move the node
    await prisma.navStructure.update({
      where: { id: nodeId },
      data: {
        parentId: newParentId,
        sortOrder: newSortOrder,
      },
    });

    // Recompact sortOrder for both old and new parent
    await recompactSortOrder(projectId, oldParentId);
    if (newParentId !== oldParentId) {
      await recompactSortOrder(projectId, newParentId);
    }

    return {
      success: true,
      message: "Navigation node moved successfully",
    };
  } catch (error) {
    console.error(`Error moving navigation node ${nodeId}:`, error);
    return {
      success: false,
      error: "Failed to move navigation node",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateNavNode(
  projectId: string,
  nodeId: string,
  data: {
    customTitle?: string | null;
    customEmoji?: string | null;
    customIcon?: string | null;
    externalUrl?: string | null;
    hidden?: boolean;
  }
) {
  try {
    if (!projectId || !nodeId) {
      return {
        success: false,
        error: "Project ID and Node ID are required",
      };
    }

    const node = await prisma.navStructure.findUnique({
      where: { id: nodeId },
    });

    if (!node || node.projectId !== projectId) {
      return {
        success: false,
        error: "Node not found or does not belong to this project",
      };
    }

    await prisma.navStructure.update({
      where: { id: nodeId },
      data: {
        ...(data.customTitle !== undefined && { customTitle: data.customTitle || null }),
        ...(data.customEmoji !== undefined && { customEmoji: data.customEmoji || null }),
        ...(data.customIcon !== undefined && { customIcon: data.customIcon || null }),
        ...(data.externalUrl !== undefined && { externalUrl: data.externalUrl || null }),
        ...(data.hidden !== undefined && { hidden: data.hidden }),
      },
    });

    return {
      success: true,
      message: "Navigation node updated successfully",
    };
  } catch (error) {
    console.error(`Error updating navigation node ${nodeId}:`, error);
    return {
      success: false,
      error: "Failed to update navigation node",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function createNavNode(
  projectId: string,
  data: {
    parentId?: string | null;
    slugPattern: string[];
    type: "page" | "group" | "link";
    customTitle?: string;
    customEmoji?: string;
    customIcon?: string;
    externalUrl?: string;
    hidden?: boolean;
  }
) {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    // Validate parent exists if provided
    if (data.parentId) {
      const parent = await prisma.navStructure.findUnique({
        where: { id: data.parentId },
      });

      if (!parent || parent.projectId !== projectId) {
        return {
          success: false,
          error: "Parent node not found or does not belong to this project",
        };
      }
    }

    // Get next sort order
    const siblings = await prisma.navStructure.findMany({
      where: { projectId, parentId: data.parentId || null },
      orderBy: { sortOrder: "desc" },
      take: 1,
    });

    const sortOrder = siblings.length > 0 ? siblings[0].sortOrder + 1 : 0;

    const node = await prisma.navStructure.create({
      data: {
        projectId,
        parentId: data.parentId || null,
        slugPattern: data.slugPattern,
        sortOrder,
        type: data.type,
        customTitle: data.customTitle || null,
        customEmoji: data.customEmoji || null,
        customIcon: data.customIcon || null,
        externalUrl: data.externalUrl || null,
        hidden: data.hidden || false,
      },
    });

    return {
      success: true,
      message: "Navigation node created successfully",
      data: { id: node.id },
    };
  } catch (error) {
    console.error("Error creating navigation node:", error);
    return {
      success: false,
      error: "Failed to create navigation node",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteNavNode(projectId: string, nodeId: string) {
  try {
    if (!projectId || !nodeId) {
      return {
        success: false,
        error: "Project ID and Node ID are required",
      };
    }

    const node = await prisma.navStructure.findUnique({
      where: { id: nodeId },
      include: {
        children: true,
      },
    });

    if (!node || node.projectId !== projectId) {
      return {
        success: false,
        error: "Node not found or does not belong to this project",
      };
    }

    if (node.children.length > 0) {
      return {
        success: false,
        error: "Cannot delete node with children. Delete children first.",
      };
    }

    await prisma.navStructure.delete({
      where: { id: nodeId },
    });

    // Recompact sortOrder for siblings
    await recompactSortOrder(projectId, node.parentId);

    return {
      success: true,
      message: "Navigation node deleted successfully",
    };
  } catch (error) {
    console.error(`Error deleting navigation node ${nodeId}:`, error);
    return {
      success: false,
      error: "Failed to delete navigation node",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getProjectNavigation(projectId: string) {
  try {
    if (!projectId) {
      return {
        success: false,
        error: "Project ID is required",
      };
    }

    const navNodes = await prisma.navStructure.findMany({
      where: { projectId },
      orderBy: [{ parentId: "asc" }, { sortOrder: "asc" }],
    });

    return {
      success: true,
      data: navNodes,
    };
  } catch (error) {
    console.error(`Error fetching navigation for project ${projectId}:`, error);
    return {
      success: false,
      error: "Failed to fetch navigation",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
