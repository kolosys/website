"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@kolosys-sites/theme";
import { Button } from "@kolosys-sites/theme";
import { Badge } from "@kolosys-sites/theme";

export function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const currentFilter = searchParams.get("filter") || "all";

  const updateFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant={currentFilter === "all" ? "primary" : "secondary"}
          size="sm"
          onClick={() => updateFilter("all")}
        >
          All
        </Button>
        <Button
          variant={currentFilter === "published" ? "primary" : "secondary"}
          size="sm"
          onClick={() => updateFilter("published")}
        >
          Published
        </Button>
        <Button
          variant={currentFilter === "featured" ? "primary" : "secondary"}
          size="sm"
          onClick={() => updateFilter("featured")}
        >
          Featured
        </Button>
      </div>
    </div>
  );
}
