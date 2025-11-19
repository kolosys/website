"use client";

import DropdownButton from "@/components/ui/DropdownButton";

type RepositorySelectorProps = {
  repositories: Array<{ id: string; name: string }>;
  selectedRepositoryId: string | null;
  onRepositoryChange: (repositoryId: string) => void;
};

export default function RepositorySelector({
  repositories,
  selectedRepositoryId,
  onRepositoryChange,
}: RepositorySelectorProps) {
  const options = repositories.map((repo) => repo.name);
  const selectedName =
    repositories.find((repo) => repo.id === selectedRepositoryId)?.name ||
    repositories[0]?.name ||
    "";

  const handleChange = (name: string) => {
    const repo = repositories.find((r) => r.name === name);
    if (repo) {
      onRepositoryChange(repo.id);
    }
  };

  return (
    <DropdownButton
      value={selectedName}
      onChange={handleChange}
      options={options}
      className="w-56"
    />
  );
}

