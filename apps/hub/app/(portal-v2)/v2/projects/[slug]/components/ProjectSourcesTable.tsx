"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@kolosys-sites/theme";
import { Button } from "@kolosys-sites/theme";
import { Badge } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { Menu, MenuButton, MenuItems, MenuItemButton } from "@kolosys-sites/theme";
import { updateProjectSource, deleteProjectSource } from "@/app/actions/projects";
import type { SourceProvider } from "@/prisma/client/enums";

type ProjectSource = {
  id: string;
  provider: SourceProvider;
  owner: string;
  repo: string;
  fullName: string;
  defaultBranch: string;
  docsPath: string;
  isPrimary: boolean;
  lastSyncedAt: Date | null;
};

export function ProjectSourcesTable({
  sources,
  projectId
}: {
  sources: ProjectSource[];
  projectId: string;
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleDelete = async (sourceId: string, sourceName: string) => {
    if (!confirm(`Are you sure you want to delete source "${sourceName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(sourceId);
    const result = await deleteProjectSource(sourceId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete source");
    }
    setDeletingId(null);
  };

  const handleTogglePrimary = async (sourceId: string, currentIsPrimary: boolean) => {
    setTogglingId(sourceId);
    const result = await updateProjectSource(sourceId, {
      isPrimary: !currentIsPrimary,
    });

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to update source");
    }
    setTogglingId(null);
  };

  if (sources.length === 0) {
    return (
      <Card variant="outlined">
        <CardContent className="py-12">
          <div className="text-center text-foreground-muted">
            <Icon name="database" pack="basic" size="lg" className="mx-auto mb-4 opacity-50" />
            <p className="text-sm">No sources configured yet</p>
            <p className="text-xs mt-2">Add a source to sync documentation from a repository</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardHeader>
        <h3 className="text-lg font-semibold">Project Sources</h3>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-surface-emphasis">
              <tr className="text-left text-xs font-medium text-foreground-muted uppercase tracking-wider">
                <th className="px-6 py-3">Provider</th>
                <th className="px-6 py-3">Repository</th>
                <th className="px-6 py-3">Branch</th>
                <th className="px-6 py-3">Docs Path</th>
                <th className="px-6 py-3">Primary</th>
                <th className="px-6 py-3">Last Synced</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-emphasis">
              {sources.map((source) => (
                <tr key={source.id} className="hover:bg-surface-muted transition-colors">
                  <td className="px-6 py-4">
                    <Badge variant="default" className="capitalize">
                      {source.provider}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon name="database" pack="basic" size="sm" />
                      <code className="text-sm">{source.fullName}</code>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-foreground-muted">{source.defaultBranch}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-foreground-muted">{source.docsPath}</code>
                  </td>
                  <td className="px-6 py-4">
                    {source.isPrimary ? (
                      <Badge variant="info">Primary</Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleTogglePrimary(source.id, source.isPrimary)}
                        disabled={togglingId === source.id}
                      >
                        {togglingId === source.id ? "Setting..." : "Set as primary"}
                      </Button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground-muted">
                    {source.lastSyncedAt
                      ? new Date(source.lastSyncedAt).toLocaleDateString()
                      : "Never"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <Menu>
                        <MenuButton className="text-body hover:bg-neutral-100 rounded-lg transition-colors outline-hidden p-2">
                          <Icon name="dots-vertical" pack="basic" size="sm" />
                        </MenuButton>
                        <MenuItems>
                          <MenuItemButton
                            onClick={() => handleDelete(source.id, source.fullName)}
                            disabled={deletingId === source.id}
                          >
                            <Icon name="trash" pack="basic" size="sm" className="mr-2" />
                            {deletingId === source.id ? "Deleting..." : "Delete"}
                          </MenuItemButton>
                        </MenuItems>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
