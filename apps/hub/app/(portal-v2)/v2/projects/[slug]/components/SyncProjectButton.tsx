"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@kolosys-sites/theme";
import { Icon } from "@kolosys-sites/theme";
import { resyncProjectFromGitHub } from "@/app/actions/github";

export function SyncProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    setError(null);
    setSuccess(null);

    const result = await resyncProjectFromGitHub(projectId);

    if (result.success) {
      setSuccess(result.message || "Project synced successfully");
      router.refresh();

      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } else {
      setError(result.error || "Failed to sync project");
    }

    setIsSyncing(false);
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleSync}
        disabled={isSyncing}
        variant="outline"
        size="sm"
      >
        <Icon
          name="database"
          pack="basic"
          size="sm"
        />
        {isSyncing ? "Syncing..." : "Sync from GitHub"}
      </Button>

      {error && (
        <div className="text-xs text-error-600 bg-error-50 px-3 py-2 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="text-xs text-success-600 bg-success-50 px-3 py-2 rounded">
          {success}
        </div>
      )}
    </div>
  );
}
