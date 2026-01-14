'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useModalActions } from "@kolosys-sites/theme/modal";
import { RepositoryData } from '@/lib/repositories';
import { StatusBadge, Icon } from '@kolosys-sites/theme';
import { RepositorySettingsModal } from './RepositorySettingsModal';
import { Menu, MenuButton, MenuItems, MenuItemButton, MenuItemLink, MenuSeparator, MenuSection } from '@kolosys-sites/theme';

type RepositoryCardProps = {
  repository: RepositoryData;
};

export function RepositoryCard({ repository: initialRepo }: RepositoryCardProps) {
  const router = useRouter();
  const { openConfirmModal, openModal, closeModal } = useModalActions();
  const [repo, setRepo] = useState(initialRepo);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wasSyncingRef = useRef(initialRepo.syncing);

  // Sync local state with prop changes (e.g., after router.refresh())
  useEffect(() => {
    setRepo(initialRepo);
    wasSyncingRef.current = initialRepo.syncing;
  }, [initialRepo.id, initialRepo.emoji, initialRepo.docsPath, initialRepo.published, initialRepo.featured, initialRepo.syncing, initialRepo.status]);

  // Poll for status updates when syncing
  useEffect(() => {
    // Clear any existing interval
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }

    // Update the ref when syncing state changes
    wasSyncingRef.current = repo.syncing;

    if (!repo.syncing) return;

    pollIntervalRef.current = setInterval(async () => {
      try {
        const { getRepositoryStatus } = await import("@/app/actions/repositories");
        const result = await getRepositoryStatus(repo.id);

        if (result.success && result.data) {
          const { syncing, status, lastSync, pages, latestTag } = result.data;
          const wasSyncing = wasSyncingRef.current;

          // Update local state
          setRepo((prev) => ({
            ...prev,
            syncing,
            status,
            lastSync,
            pages,
            latestTag,
          } as RepositoryData));

          // Update the ref
          wasSyncingRef.current = syncing;

          // If sync completed (was syncing, now not), stop polling and refresh
          if (wasSyncing && !syncing) {
            // Clear the interval
            const intervalId = pollIntervalRef.current;
            if (intervalId) {
              clearInterval(intervalId);
              pollIntervalRef.current = null;
            }
            // Refresh the page to get all updated data
            setTimeout(() => {
              router.refresh();
            }, 500);
          }
        } else {
          // If status check failed, log but don't stop polling
          console.warn('Failed to get repository status:', result.error);
        }
      } catch (error) {
        console.error('Error polling repository status:', error);
        // On error, stop polling to avoid spamming
        const intervalId = pollIntervalRef.current;
        if (intervalId) {
          clearInterval(intervalId);
          pollIntervalRef.current = null;
        }
        // Reset syncing state on persistent error
        setRepo((prev) => ({
          ...prev,
          syncing: false,
          status: 'active',
        }));
      }
    }, 3000); // Poll every 3 seconds (reduced frequency)

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [repo.syncing, repo.id, router]);

  const handleDeleteClick = () => {
    openConfirmModal({
      title: "Delete Repository",
      message: (
        <>
          Are you sure you want to delete <span className="font-semibold">{repo.name}</span>? This will remove all documentation and cannot be undone.
        </>
      ),
      variant: "danger",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          const { deleteRepositoryAction } = await import("@/app/actions/repositories");
          const result = await deleteRepositoryAction(repo.id);

          if (!result.success) {
            console.error('Failed to delete repository:', result.error);
            // You might want to show a toast notification here
            return;
          }

          console.log('Repository deleted successfully:', repo.name);
          // Refresh the page to update the repository list
          window.location.reload();
        } catch (error) {
          console.error('Error deleting repository:', error);
          // You might want to show a toast notification here
        }
      },
    });
  };

  const handleSyncClick = async () => {
    if (repo.syncing) {
      return; // Already syncing, ignore click
    }

    try {
      const { syncRepositoryAction } = await import("@/app/actions/repositories");
      const result = await syncRepositoryAction(repo.id);

      if (!result.success) {
        console.error('Failed to sync repository:', result.error);
        // Update local state to show error
        setRepo((prev) => ({
          ...prev,
          syncing: false,
          status: 'active',
          lastSync: result.message || 'Sync failed',
        }));
        return;
      }

      console.log('Repository sync started:', repo.name);

      // Update local state to show syncing status immediately
      setRepo((prev) => ({
        ...prev,
        syncing: true,
        status: 'syncing',
        lastSync: 'Syncing...',
      }));

      // Immediately check status to get the latest sync log
      // This ensures we pick up the sync log that was just created
      setTimeout(async () => {
        try {
          const { getRepositoryStatus } = await import("@/app/actions/repositories");
          const statusResult = await getRepositoryStatus(repo.id);
          if (statusResult.success && statusResult.data) {
            setRepo((prev) => ({
              ...prev,
              syncing: statusResult.data.syncing,
              status: (statusResult.data.status === "syncing" ? "syncing" : "active") as RepositoryData["status"],
              lastSync: statusResult.data.lastSync,
            }));
          }
        } catch (error) {
          console.error('Error checking sync status:', error);
        }
      }, 500);
    } catch (error) {
      console.error('Error syncing repository:', error);
      // Update local state to show error
      setRepo((prev) => ({
        ...prev,
        syncing: false,
        status: 'active',
        lastSync: 'Sync failed',
      }));
    }
  };

  const handleSettingsClick = async () => {
    const modalId = openModal({
      title: "Repository Settings",
      content: (
        <RepositorySettingsModal
          repository={repo}
          onSave={async () => {
            // Fetch updated repository data and update local state
            try {
              const { getRepositoryDetails } = await import("@/app/actions/repositories");
              const detailsResult = await getRepositoryDetails(repo.id);

              if (detailsResult.success && detailsResult.data) {
                // Update local state with new settings
                setRepo((prev) => ({
                  ...prev,
                  emoji: detailsResult.data?.emoji ?? prev.emoji,
                  docsPath: detailsResult.data?.docsPath ?? prev.docsPath,
                  published: detailsResult.data?.published ?? prev.published,
                  featured: detailsResult.data?.featured ?? prev.featured,
                }));
              }

              // Also refresh the page to ensure server data is updated
              router.refresh();
            } catch (error) {
              console.error('Error updating repository card:', error);
              // Still refresh on error to get latest data
              router.refresh();
            }
          }}
          onClose={() => closeModal(modalId)}
        />
      ),
      size: "md",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm-md transition-shadow-sm">
      <div className="flex items-start justify-between">
        {/* Left Side - Repo Info */}
        <div className="flex items-start space-x-4 flex-1">
          {/* Emoji Icon */}
          <div className="text-4xl">{repo.emoji || '📦'}</div>

          {/* Repo Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3>{repo.name}</h3>
              <StatusBadge status={repo.status} />
              <StatusBadge status={repo.published ? "published" : "hidden"} />
              {repo.featured && <StatusBadge status="featured" />}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                <Icon name="code-alt" pack="basic" size="sm" className="mr-1" />
                {repo.fullName}
              </span>
              <span>•</span>
              <span>{repo.defaultBranch}</span>
              <span>•</span>
              <span>{repo.docsPath}</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Pages: <span className="font-semibold text-gray-700">{repo.pages}</span></span>
              <span>•</span>
              <span>Last sync: <span className="font-semibold text-gray-700">{repo.lastSync}</span></span>
              {repo.latestTag && (
                <>
                  <span>•</span>
                  <span>Latest tag: <span className="font-semibold text-gray-700">{repo.latestTag}</span></span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleSyncClick}
            className={`p-2 rounded-lg transition-colors ${repo.syncing
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
            disabled={repo.syncing}
            title="Sync Docs"
          >
            <Icon
              name="refresh-cw"
              pack="basic"
              size="md"
              className={repo.syncing ? 'animate-spin' : ''}
            />
          </button>

          <Menu as="div" className="relative">
            <MenuButton className="p-2">
              <Icon name="dots-vertical-rounded" pack="basic" size="md" />
            </MenuButton>
            <MenuItems>
              <MenuSection>
                <MenuItemLink
                  href={`https://github.com/${repo.fullName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    name="link-alt"
                    pack="basic"
                    size="md"
                    className="mr-3 text-gray-400 group-data-focus:text-gray-500"
                  />
                  Open Repository
                </MenuItemLink>
                <MenuItemButton
                  onClick={() => router.push(`/content?repo=${repo.id}`)}
                >
                  <Icon
                    name="pencil"
                    pack="basic"
                    size="md"
                    className="mr-3 text-gray-400 group-data-focus:text-gray-500"
                  />
                  View Content
                </MenuItemButton>
              </MenuSection>
              <MenuSeparator />
              <MenuSection>
                <MenuItemButton
                  onClick={handleSettingsClick}
                >
                  <Icon
                    name="cog"
                    pack="basic"
                    size="md"
                    className="mr-3 text-gray-400 group-data-focus:text-gray-500"
                  />
                  Settings
                </MenuItemButton>
                <MenuItemButton
                  onClick={() => router.push(`/repositories/${repo.id}/logs`)}
                >
                  <Icon
                    name="file"
                    pack="basic"
                    size="md"
                    className="mr-3 text-gray-400 group-data-focus:text-gray-500"
                  />
                  View Logs
                </MenuItemButton>
              </MenuSection>
              <MenuSeparator />
              <MenuItemButton
                onClick={handleDeleteClick}
                className="text-red-600 data-focus:bg-red-50 data-focus:text-red-700"
              >
                <Icon
                  name="trash"
                  pack="basic"
                  size="md"
                  className="mr-3 text-red-500 group-data-focus:text-red-600"
                />
                Delete Repository
              </MenuItemButton>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div >
  );
}

