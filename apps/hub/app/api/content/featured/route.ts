import { NextResponse } from "next/server";
import { getFeaturedRepositoriesForApi } from "@/lib/api/repositories";

export async function GET() {
  const result = await getFeaturedRepositoriesForApi();

  if (!result.success) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result.data);
}
