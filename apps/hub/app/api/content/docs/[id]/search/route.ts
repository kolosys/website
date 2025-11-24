import { NextRequest, NextResponse } from "next/server";
import {
  getDocumentationNavigationForApi,
  getDocumentationPageForApi,
} from "@/lib/api/content";
import prisma from "@/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = (await params) ?? {};
  const search = request.nextUrl.searchParams.get("q") ?? "";

  if (!search) {
    return NextResponse.json(
      {
        success: false,
        error: "Search query is required",
      },
      { status: 400 }
    );
  }

  // Split search query into tokens and build PostgreSQL tsquery
  const tokens = search
    .trim()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  // Default to raw search string if no tokens (should not happen because of earlier validation)
  const searchQuery =
    tokens.length === 0
      ? search.trim()
      : tokens.map((token) => `+${token}`).join(" ");

  // Get snippets from PostgreSQL
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
       WHERE repository_id = ${id} AND to_tsvector('english', title || ' ' || content) @@ query
       ORDER BY relevance DESC
  `;

  const formattedSnippets = snippets.map((snippet) => ({
    ...snippet,
    slug: snippet.slug.join("/"),
  }));

  return NextResponse.json({
    success: true,
    data: formattedSnippets,
  });
}
