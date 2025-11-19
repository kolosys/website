import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/"]);
const isWebhookRoute = createRouteMatcher(["/api/webhooks(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);

/**
 * Timing-safe string comparison for Edge Runtime
 * Uses constant-time comparison to prevent timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  // Convert strings to Uint8Array for byte-by-byte comparison
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  // Constant-time comparison: always check all bytes
  let result = 0;
  for (let i = 0; i < aBytes.length; i++) {
    result |= aBytes[i] ^ bBytes[i];
  }

  return result === 0;
}

/**
 * Verify API key from request headers
 */
function verifyApiKey(request: NextRequest): NextResponse | null {
  const expectedKey = process.env.HUB_API_KEY;

  let apiKey = request.headers.get("x-api-key");
  // In development, also check query parameter
  if (!apiKey && process.env.NODE_ENV === "development") {
    apiKey = request.nextUrl.searchParams.get("api_key");
    if (apiKey) {
      // Log when using query param for debugging
      console.log("[API Auth] Using api_key from query parameter");
    }
  }

  if (!expectedKey) {
    console.error("HUB_API_KEY environment variable is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API key. Please provide x-api-key header." },
      { status: 401 }
    );
  }

  // Use timing-safe comparison to prevent timing attacks
  if (!timingSafeEqual(apiKey, expectedKey)) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  return null;
}

// Handle API routes before Clerk middleware runs
const clerkAuth = clerkMiddleware(async (auth, req: NextRequest) => {
  // Apply Clerk authentication for non-API routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  // Handle webhook routes first - skip all auth
  if (isWebhookRoute(req)) {
    return NextResponse.next();
  }

  // Handle API key authentication for API routes
  if (isApiRoute(req)) {
    const authError = verifyApiKey(req);
    if (authError) {
      return authError;
    }
    // API routes authenticated via API key, skip Clerk protection completely
    // Return early to prevent Clerk middleware from running
    return NextResponse.next();
  }

  // For all other routes, use Clerk authentication
  return clerkAuth(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
