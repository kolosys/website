import { NextRequest, NextResponse } from "next/server";

/**
 * Catch-all handler for API routes that don't exist
 * Returns JSON 404 instead of HTML 404 page
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "API endpoint not found" },
    { status: 404 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "API endpoint not found" },
    { status: 404 }
  );
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { error: "API endpoint not found" },
    { status: 404 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { error: "API endpoint not found" },
    { status: 404 }
  );
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(
    { error: "API endpoint not found" },
    { status: 404 }
  );
}
