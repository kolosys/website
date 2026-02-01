"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@kolosys-sites/theme";
import { Button } from "@kolosys-sites/theme";
import { Badge } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { syncProjectVersion } from "@/app/actions/projects";

type Version = {
  id: string;
  tag: string;
  isLatest: boolean;
  docsSynced: boolean;
  syncedAt: Date | null;
  _count?: {
    content: number;
  };
};

export function ProjectVersionsTable({
  versions,
  projectId
}: {
  versions: Version[];
  projectId: string;
}) {
  const router = useRouter();
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = async (versionId: string) => {
    setSyncingId(versionId);
    const result = await syncProjectVersion(projectId, versionId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to sync version");
    }
    setSyncingId(null);
  };

  if (versions.length === 0) {
    return (
      <Card variant="outlined">
        <CardContent className="py-12">
          <div className="text-center text-foreground-muted">
            <Icon name="tag" pack="basic" size="lg" className="mx-auto mb-4 opacity-50" />
            <p className="text-sm">No versions found</p>
            <p className="text-xs mt-2">Versions will appear here after repository sync</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardHeader>
        <h3 className="text-lg font-semibold">Project Versions</h3>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-surface-emphasis">
              <tr className="text-left text-xs font-medium text-foreground-muted uppercase tracking-wider">
                <th className="px-6 py-3">Tag</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Synced</th>
                <th className="px-6 py-3">File Count</th>
                <th className="px-6 py-3">Synced At</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-emphasis">
              {versions.map((version) => (
                <tr key={version.id} className="hover:bg-surface-muted transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon name="tag" pack="basic" size="sm" />
                      <code className="text-sm font-medium">{version.tag}</code>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {version.isLatest && (
                      <Badge variant="info">Latest</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {version.docsSynced ? (
                      <Badge variant="success">
                        <Icon name="check" pack="basic" size="xs" className="mr-1" />
                        Synced
                      </Badge>
                    ) : (
                      <Badge variant="default">
                        <Icon name="x" pack="basic" size="xs" className="mr-1" />
                        Not Synced
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground-muted">
                      {version._count?.content || 0} files
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground-muted">
                      {version.syncedAt
                        ? new Date(version.syncedAt).toLocaleString()
                        : "Never"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleSync(version.id)}
                        disabled={syncingId === version.id}
                      >
                        {syncingId === version.id ? (
                          <>
                            <Icon name="refresh-cw" pack="basic" size="sm" className="mr-2 animate-spin" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <Icon name="refresh-cw" pack="basic" size="sm" className="mr-2" />
                            Sync
                          </>
                        )}
                      </Button>
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
