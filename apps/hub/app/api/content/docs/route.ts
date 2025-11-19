import { NextRequest, NextResponse } from "next/server";
import { getTrackedRepositories } from "@/lib/repositories";

export async function GET(request: NextRequest) {
  const result = await getTrackedRepositories(true);

  return NextResponse.json(result);
}
