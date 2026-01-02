import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

async function resolveVersionTag(
  repositoryId: string,
  versionTag: string
): Promise<string> {
  if (versionTag === "latest") {
    const latestTag = await prisma.versionTag.findFirst({
      where: { repositoryId, isLatest: true, docsSynced: true },
      select: { tagName: true },
    });
    return latestTag?.tagName || "next";
  }
  return versionTag;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = (await params) ?? {};
  const search = request.nextUrl.searchParams.get("q") ?? "";
  const version = request.nextUrl.searchParams.get("version") || "latest";

  if (!search) {
    return NextResponse.json(
      {
        success: false,
        error: "Search query is required",
      },
      { status: 400 }
    );
  }

  const resolvedVersion = await resolveVersionTag(id, version);

  const tokens = search
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const searchQuery =
    tokens.length === 0
      ? search.trim()
      : tokens.map((token) => `+${token}`).join(" ");

  const snippets = await prisma.$queryRaw<
    {
      id: string;
      title: string;
      slug: string[];
      relevance: number;
      snippet: string;
    }[]
  >`
      SELECT  id, title, slug,
              ts_rank(to_tsvector('english', title || ' ' || content), query) AS relevance,
              ts_headline(
                'english',
                content,
                to_tsquery('english', $1),
                'StartSel=<mark>, StopSel=</mark>, MaxWords=15, MinWords=5, ShortWord=1, HighlightAll=true, MaxFragments=1, FragmentDelimiter=… '
              ) AS snippet
       FROM documentation_content, plainto_tsquery('english', ${searchQuery}) query
       WHERE repository_id = ${id}
         AND version_tag = ${resolvedVersion}
         AND to_tsvector('english', title || ' ' || content) @@ query
       ORDER BY relevance DESC
  `;

  const formattedSnippets = snippets.map((snippet) => ({
    ...snippet,
    slug: snippet.slug.join("/"),
  }));

  return NextResponse.json({
    success: true,
    data: formattedSnippets,
    version: resolvedVersion,
  });
}
