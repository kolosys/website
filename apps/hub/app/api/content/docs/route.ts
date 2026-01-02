import { NextRequest, NextResponse } from "next/server";
import { getTrackedRepositories } from "@/lib/repositories";
import { getRepositoryVersions } from "@/lib/api/content";

export async function GET(request: NextRequest) {
  const repos = await getTrackedRepositories({
    quick: true,
    published_only: true,
  });

  const result = await Promise.all(
    repos.map(async (repo) => {
      const versions = await getRepositoryVersions(repo.id);
      return { ...repo, versions };
    })
  );

  return NextResponse.json(result);
}
