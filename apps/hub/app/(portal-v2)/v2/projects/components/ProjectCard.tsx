"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@kolosys-sites/theme";
import { Badge } from "@kolosys-sites/theme";
import { Button } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { Menu, MenuButton, MenuItems, MenuItemButton, MenuItemLink } from "@kolosys-sites/theme";
import { deleteProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Project = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  emoji: string | null;
  published: boolean;
  featured: boolean;
  _count?: {
    sources: number;
    versions: number;
  };
};

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${project.name}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteProject(project.id);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete project");
      setIsDeleting(false);
    }
  };

  return (
    <Card variant="outlined" className="hover:border-primary-emphasis transition-colors">
      <CardHeader className="flex items-start justify-between">
        <Link href={`/v2/projects/${project.slug}`} className="flex-1">
          <div className="flex items-center gap-3">
            {project.emoji && (
              <span className="text-4xl">{project.emoji}</span>
            )}
            <div>
              <h3 className="text-lg font-semibold hover:text-primary-emphasis">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-sm text-foreground-muted line-clamp-2 mt-1">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </Link>

        <Menu>
          <MenuButton className="p-2 rounded hover:bg-surface-emphasis transition-colors">
            <Icon name="cog" pack="basic" size="sm" />
          </MenuButton>
          <MenuItems>
            <MenuItemLink href={`/v2/projects/${project.slug}`}>
              <Icon name="edit" pack="basic" size="sm" />
              Edit
            </MenuItemLink>
            <MenuItemLink href={`/v2/projects/${project.slug}/navigation`}>
              <Icon name="sitemap" pack="basic" size="sm" />
              Navigation
            </MenuItemLink>
            <MenuItemButton onClick={handleDelete} disabled={isDeleting}>
              <Icon name="trash" pack="basic" size="sm" />
              {isDeleting ? "Deleting..." : "Delete"}
            </MenuItemButton>
          </MenuItems>
        </Menu>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 flex-wrap">
          {project.published && (
            <Badge variant="success">Published</Badge>
          )}
          {project.featured && (
            <Badge variant="info">Featured</Badge>
          )}
          {!project.published && (
            <Badge variant="default">Draft</Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="text-sm text-foreground-muted">
        <div className="flex gap-4">
          <span>
            <Icon name="database" pack="basic" size="xs" className="inline mr-1" />
            {project._count?.sources || 0} sources
          </span>
          <span>
            <Icon name="tag" pack="basic" size="xs" className="inline mr-1" />
            {project._count?.versions || 0} versions
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
