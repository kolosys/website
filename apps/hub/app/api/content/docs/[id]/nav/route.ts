import { NextRequest, NextResponse } from "next/server";
import { getDocumentationNavigationForApi } from "@/lib/api/content";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const result = await getDocumentationNavigationForApi(id);

  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result.data);
}
