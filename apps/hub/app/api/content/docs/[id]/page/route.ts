import { NextRequest, NextResponse } from "next/server";
import {
  getDocumentationNavigationForApi,
  getDocumentationPageForApi,
} from "@/lib/api/content";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const nextUrl = request.nextUrl;

  const { id } = (await params) ?? {};
  const slug = nextUrl.searchParams.get("slug");

  let slugArray: string[] = [];
  if (slug) {
    slugArray = slug.split("/").filter(Boolean);
  }

  const navigation = await getDocumentationNavigationForApi(id);
  if (!navigation.success) {
    return NextResponse.json(navigation, { status: 500 });
  }

  let page: Awaited<ReturnType<typeof getDocumentationPageForApi>> = {
    success: true,
    data: null as any,
  };
  if (slugArray.length > 0) {
    page = await getDocumentationPageForApi(id, slugArray);
    if (!page.success) {
      return NextResponse.json(page, { status: 500 });
    }
  }

  return NextResponse.json({
    page: page?.data,
    navigation: navigation.data,
  });
}
