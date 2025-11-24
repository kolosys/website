import { NextResponse } from "next/server";
import { getTrackedRepositories } from "@/lib/repositories";

export async function GET() {
  const result = await getTrackedRepositories({
    quick: true,
    published_only: true,
    featured: true,
  });

  return NextResponse.json(result);
}
