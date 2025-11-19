'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useModalActions } from '@/hooks/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faRotate,
  faEllipsisVertical,
  faUpRightFromSquare,
  faPencil,
  faCog,
  faFileLines,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { RepositoryData } from '@/lib/repositories';
import { StatusBadge } from '@/components/ui/StatusBadge';

type RepositoryCardProps = {
  repository: RepositoryData;
};

export function RepositoryCard({ repository: initialRepo }: RepositoryCardProps) {
  const router = useRouter();
  const { openConfirmModal } = useModalActions();
  const [repo, setRepo] = useState(initialRepo);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const wasSyncingRef = useRef(initialRepo.syncing);

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
        }
      } catch (error) {
        console.error('Error polling repository status:', error);
      }
    }, 2000); // Poll every 2 seconds

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
    if (!repo.syncing) {
      try {
        const { syncRepositoryAction } = await import("@/app/actions/repositories");
        const result = await syncRepositoryAction(repo.id);

        if (!result.success) {
          console.error('Failed to sync repository:', result.error);
          // You might want to show a toast notification here
          return;
        }

        console.log('Repository sync started:', repo.name);

        // Update local state to show syncing status immediately
        setRepo((prev) => ({
          ...prev,
          syncing: true,
          status: 'syncing',
          lastSync: 'Syncing docs...',
        }));
      } catch (error) {
        console.error('Error syncing repository:', error);
        // You might want to show a toast notification here
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        {/* Left Side - Repo Info */}
        <div className="flex items-start space-x-4 flex-1">
          {/* Emoji Icon */}
          <div className="text-4xl">{repo.emoji || '📦'}</div>

          {/* Repo Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{repo.name}</h3>
              <StatusBadge status={repo.status} />
              <StatusBadge status={repo.published ? "published" : "hidden"} />
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faCode} className="w-4 h-4 mr-1" />
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
            <FontAwesomeIcon
              icon={faRotate}
              className={`w-5 h-5 ${repo.syncing ? 'animate-spin' : ''}`}
            />
          </button>

          <Menu as="div" className="relative">
            <MenuButton className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors outline-none">
              <FontAwesomeIcon icon={faEllipsisVertical} className="w-5 h-5" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
              <div className="py-1">
                <MenuItem>
                  <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900">
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="mr-3 h-5 w-5 text-gray-400 group-data-focus:text-gray-500"
                    />
                    Open Repository
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900">
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="mr-3 h-5 w-5 text-gray-400 group-data-focus:text-gray-500"
                    />
                    View Content
                  </button>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900">
                    <FontAwesomeIcon
                      icon={faCog}
                      className="mr-3 h-5 w-5 text-gray-400 group-data-focus:text-gray-500"
                    />
                    Settings
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900">
                    <FontAwesomeIcon
                      icon={faFileLines}
                      className="mr-3 h-5 w-5 text-gray-400 group-data-focus:text-gray-500"
                    />
                    View Logs
                  </button>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <button
                    onClick={handleDeleteClick}
                    className="group flex w-full items-center px-4 py-2 text-sm text-red-600 data-focus:bg-red-50 data-focus:text-red-700"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="mr-3 h-5 w-5 text-red-500 group-data-focus:text-red-600"
                    />
                    Delete Repository
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}

