import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/"]);
const isWebhookRoute = createRouteMatcher(["/api/webhooks(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);

/**
 * Morgan-like logger for Next.js middleware (Edge Runtime compatible)
 * Supports common morgan formats: 'combined', 'common', 'dev', 'short', 'tiny'
 */

type MorganFormat = "combined" | "common" | "dev" | "short" | "tiny" | string;

interface LogTokens {
  method?: string;
  url?: string;
  status?: string;
  "response-time"?: string;
  "remote-addr"?: string;
  "remote-user"?: string;
  "http-version"?: string;
  referrer?: string;
  "user-agent"?: string;
  date?: string;
}

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (cfConnectingIp) return cfConnectingIp;
  if (realIp) return realIp;
  if (forwarded) return forwarded.split(",")[0].trim();

  return "-";
}

/**
 * Get tokens for morgan-style logging
 */
function getTokens(
  request: NextRequest,
  response: NextResponse,
  duration: number
): LogTokens {
  return {
    method: request.method,
    url: request.nextUrl.pathname + request.nextUrl.search,
    status: response.status.toString(),
    "response-time": `${duration.toFixed(0)}`,
    "remote-addr": getClientIp(request),
    "remote-user": "-",
    "http-version": request.headers.get("x-forwarded-proto") || "HTTP/1.1",
    referrer: request.headers.get("referer") || "-",
    "user-agent": request.headers.get("user-agent") || "-",
    date: new Date().toISOString(),
  };
}

/**
 * Format log entry using morgan-style format string
 */
function formatLog(format: string, tokens: LogTokens): string {
  return format
    .replace(/:method/g, tokens.method || "-")
    .replace(/:url/g, tokens.url || "-")
    .replace(/:status/g, tokens.status || "-")
    .replace(/:response-time/g, tokens["response-time"] || "-")
    .replace(/:remote-addr/g, tokens["remote-addr"] || "-")
    .replace(/:remote-user/g, tokens["remote-user"] || "-")
    .replace(/:http-version/g, tokens["http-version"] || "-")
    .replace(/:referrer/g, tokens.referrer || "-")
    .replace(/:user-agent/g, tokens["user-agent"] || "-")
    .replace(/:date/g, tokens.date || "-");
}

/**
 * Get predefined morgan format
 */
function getMorganFormat(format: MorganFormat): string {
  const formats: Record<string, string> = {
    combined:
      ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :response-time ":referrer" ":user-agent"',
    common:
      ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :response-time',
    dev: ":method :url :status :response-time ms",
    short:
      ":remote-addr :remote-user :method :url HTTP/:http-version :status :response-time",
    tiny: ":method :url :status :response-time",
  };

  return formats[format] || format;
}

/**
 * Morgan-like logger for Next.js middleware
 */
function morgan(format: MorganFormat = "combined") {
  const formatString = getMorganFormat(format);

  return (
    request: NextRequest,
    response: NextResponse,
    startTime: number,
    event: NextFetchEvent
  ): void => {
    const duration = performance.now() - startTime;
    const tokens = getTokens(request, response, duration);
    const logEntry = formatLog(formatString, tokens);

    // Use waitUntil to log asynchronously without blocking the response
    event.waitUntil(
      Promise.resolve().then(() => {
        console.log(logEntry);
      })
    );
  };
}

// Use morgan with 'combined' format (most detailed)
// Change to 'dev', 'common', 'short', or 'tiny' for different formats
// Or use custom format: morgan(':method :url :status :response-time ms')
const logAccess = morgan("combined");

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
  const startTime = performance.now();
  let response: NextResponse;

  // Handle webhook routes first - skip all auth
  if (isWebhookRoute(req)) {
    response = NextResponse.next();
    logAccess(req, response, startTime, event);
    return response;
  }

  // Handle API key authentication for API routes
  if (isApiRoute(req)) {
    const authError = verifyApiKey(req);
    if (authError) {
      logAccess(req, authError, startTime, event);
      return authError;
    }
    // API routes authenticated via API key, skip Clerk protection completely
    // Return early to prevent Clerk middleware from running
    response = NextResponse.next();
    logAccess(req, response, startTime, event);
    return response;
  }

  // For all other routes, use Clerk authentication
  const clerkResult = await clerkAuth(req, event);
  // Clerk middleware can return void, NextResponse, or a redirect
  // If it's void or undefined, create a default response
  if (!clerkResult) {
    response = NextResponse.next();
  } else if (clerkResult instanceof NextResponse) {
    response = clerkResult;
  } else {
    // Handle other response types
    response = NextResponse.next();
  }
  logAccess(req, response, startTime, event);
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
