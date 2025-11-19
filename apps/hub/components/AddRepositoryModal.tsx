"use client";

import { useState, useEffect } from "react";
import DropdownButton from "./ui/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faStar,
  faCodeBranch,
  faCircleExclamation,
  faArchive,
  faLock,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

type GitHubRepo = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  defaultBranch: string;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  watchersCount: number;
  size: number;
  topics: string[];
  homepage: string | null;
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
};

type AddRepositoryModalContentProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export function AddRepositoryModalContent({
  onClose,
  onSuccess,
}: AddRepositoryModalContentProps) {
  const [availableRepos, setAvailableRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailableRepos();
  }, []);

  const fetchAvailableRepos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/repositories/available");
      const data = await response.json();

      if (data.success) {
        setAvailableRepos(data.repositories);
        if (data.repositories.length > 0) {
          setSelectedRepo(data.repositories[0]);
        }
      } else {
        setError(data.error || "Failed to fetch repositories");
      }
    } catch (err) {
      setError("Failed to fetch available repositories");
      console.error("Error fetching repos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepoSelect = (repoName: string) => {
    const repo = availableRepos.find((r) => r.name === repoName);
    if (repo) {
      setSelectedRepo(repo);
    }
  };

  const handleAddRepository = async () => {
    if (!selectedRepo) return;

    setIsAdding(true);
    setError(null);

    try {
      const response = await fetch("/api/repositories/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoName: selectedRepo.name }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.error || "Failed to add repository");
      }
    } catch (err) {
      setError("Failed to add repository");
      console.error("Error adding repo:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} KB`;
    return `${(bytes / 1024).toFixed(1)} MB`;
  };

  return (
    <>
      <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600">Loading repositories...</span>
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="shrink-0">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="h-5 w-5 text-red-400"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                  <button
                    onClick={fetchAvailableRepos}
                    className="mt-3 text-sm font-medium text-red-800 hover:text-red-900"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          ) : availableRepos.length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon
                icon={faCode}
                className="mx-auto h-12 w-12 text-gray-400"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No repositories available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                All repositories from the Kolosys organization have been added.
              </p>
            </div>
          ) : (
            <>
              {/* Repository Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Repository
                </label>
                <DropdownButton
                  value={selectedRepo?.name || ""}
                  options={availableRepos.map((repo) => repo.name)}
                  onChange={handleRepoSelect}
                  className="w-full"
                />
              </div>

              {/* Repository Details */}
              {selectedRepo && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {selectedRepo.fullName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedRepo.description ||
                              "No description available"}
                          </p>
                        </div>
                        <div className="ml-4 flex items-center gap-2">
                          {selectedRepo.private ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <FontAwesomeIcon
                                icon={faLock}
                                className="mr-1 h-3 w-3"
                              />
                              Private
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FontAwesomeIcon
                                icon={faGlobe}
                                className="mr-1 h-3 w-3"
                              />
                              Public
                            </span>
                          )}
                          {selectedRepo.archived && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <FontAwesomeIcon
                                icon={faArchive}
                                className="mr-1 h-3 w-3"
                              />
                              Archived
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center py-2 bg-white rounded-md border border-gray-200">
                        <div className="flex items-center justify-center text-yellow-500 mb-1">
                          <FontAwesomeIcon icon={faStar} className="h-4 w-4" />
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedRepo.stargazersCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Stars</div>
                      </div>
                      <div className="text-center py-2 bg-white rounded-md border border-gray-200">
                        <div className="flex items-center justify-center text-blue-500 mb-1">
                          <FontAwesomeIcon
                            icon={faCodeBranch}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedRepo.forksCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Forks</div>
                      </div>
                      <div className="text-center py-2 bg-white rounded-md border border-gray-200">
                        <div className="flex items-center justify-center text-gray-500 mb-1">
                          <FontAwesomeIcon
                            icon={faCircleExclamation}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {selectedRepo.openIssuesCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Issues</div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium text-gray-900">
                          {selectedRepo.language || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Default Branch:</span>
                        <span className="font-medium text-gray-900">
                          {selectedRepo.defaultBranch}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium text-gray-900">
                          {formatBytes(selectedRepo.size)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Watchers:</span>
                        <span className="font-medium text-gray-900">
                          {selectedRepo.watchersCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(selectedRepo.createdAt)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Updated:</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(selectedRepo.updatedAt)}
                        </span>
                      </div>
                    </div>

                    {/* Topics */}
                    {selectedRepo.topics && selectedRepo.topics.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Topics:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedRepo.topics.map((topic) => (
                            <span
                              key={topic}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Homepage */}
                    {selectedRepo.homepage && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">
                          Homepage:
                        </span>
                        <a
                          href={selectedRepo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          {selectedRepo.homepage}
                        </a>
                      </div>
                    )}

                    {/* Warnings */}
                    {(selectedRepo.fork ||
                      selectedRepo.archived ||
                      selectedRepo.disabled) && (
                      <div className="rounded-md bg-yellow-50 p-3">
                        <div className="flex">
                          <div className="shrink-0">
                            <FontAwesomeIcon
                              icon={faCircleExclamation}
                              className="h-5 w-5 text-yellow-400"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Notice
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <ul className="list-disc pl-5 space-y-1">
                                {selectedRepo.fork && (
                                  <li>This is a forked repository</li>
                                )}
                                {selectedRepo.archived && (
                                  <li>This repository is archived</li>
                                )}
                                {selectedRepo.disabled && (
                                  <li>This repository is disabled</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
      </div>

      {/* Footer */}
      {!isLoading && !error && availableRepos.length > 0 && (
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isAdding}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleAddRepository}
            disabled={!selectedRepo || isAdding}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? "Adding..." : "Add Repository"}
          </button>
        </div>
      )}
    </>
  );
}

