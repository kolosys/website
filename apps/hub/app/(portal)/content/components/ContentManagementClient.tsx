"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import RepositorySelector from "./RepositorySelector";
import ContentTable from "./ContentTable";
import type { ContentGroup } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";

type ContentManagementClientProps = {
  repositories: Array<{ id: string; name: string }>;
  initialContent: ContentGroup[];
  initialRepositoryId: string | null;
};

export default function ContentManagementClient({
  repositories,
  initialContent,
  initialRepositoryId,
}: ContentManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<string | null>(
    initialRepositoryId
  );
  const [content, setContent] = useState<ContentGroup[]>(initialContent);
  const [loading, setLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const saveHandlerRef = useRef<(() => Promise<void>) | null>(null);

  const loadContent = useCallback(async (repositoryId: string) => {
    setLoading(true);
    try {
      const { getRepositoryContent } = await import("@/app/actions/content");
      const result = await getRepositoryContent(repositoryId);
      
      if (result.success) {
        setContent(result.content || []);
      } else {
        console.error("Failed to load content:", result.error);
        setContent([]);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const repoId = searchParams.get("repo");
    if (repoId && repoId !== selectedRepositoryId) {
      setSelectedRepositoryId(repoId);
      loadContent(repoId);
    }
  }, [searchParams, selectedRepositoryId, loadContent]);

  const handleRepositoryChange = (repositoryId: string) => {
    setSelectedRepositoryId(repositoryId);
    setHasUnsavedChanges(false); // Reset unsaved changes when switching repositories
    router.push(`/content?repo=${repositoryId}`);
    loadContent(repositoryId);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Management"
        description="Organize your documentation structure, assign emojis, create groups, and arrange content order."
      />

      {/* Repository Selector and Unsaved Changes Banner */}
      <div className="flex items-center justify-between gap-4">
        {repositories.length > 0 && (
          <RepositorySelector
            repositories={repositories}
            selectedRepositoryId={selectedRepositoryId}
            onRepositoryChange={handleRepositoryChange}
          />
        )}

        {/* Unsaved Changes Banner - aligned with repo selector */}
        {hasUnsavedChanges && (
          <Alert
            variant="warning"
            icon="⚠️"
            title="Unsaved changes"
            className="flex-1 max-w-md"
            action={
              <button
                onClick={async () => {
                  if (saveHandlerRef.current) {
                    setSaving(true);
                    try {
                      await saveHandlerRef.current();
                      setHasUnsavedChanges(false);
                      if (selectedRepositoryId) {
                        loadContent(selectedRepositoryId);
                      }
                    } catch (error) {
                      console.error("Error saving:", error);
                    } finally {
                      setSaving(false);
                    }
                  }
                }}
                disabled={saving || !saveHandlerRef.current}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <FontAwesomeIcon icon={faSave} className="w-3.5 h-3.5 mr-1.5" />
                {saving ? "Saving..." : "Save"}
              </button>
            }
          />
        )}
      </div>

      {/* Content Table */}
      {loading ? (
        <LoadingState message="Loading content..." />
      ) : content.length > 0 && selectedRepositoryId ? (
        <ContentTable
          content={content}
          repositoryId={selectedRepositoryId}
          onSave={() => {
            // Reload content after save
            if (selectedRepositoryId) {
              loadContent(selectedRepositoryId);
            }
          }}
          onChangesChange={(hasChanges) => {
            setHasUnsavedChanges(hasChanges);
          }}
          onSaveHandlerReady={(handler) => {
            saveHandlerRef.current = handler;
          }}
        />
      ) : (
        <EmptyState
          description={
            selectedRepositoryId
              ? "No documentation content found for this repository."
              : "Select a repository to view its documentation content."
          }
        />
      )}

      {/* Drag and Drop Info */}
      <Alert variant="info" icon="💡" title="Drag and Drop to Reorder">
        Click and drag the grip icon to reorder items. Changes are saved automatically.
      </Alert>
    </div>
  );
}

