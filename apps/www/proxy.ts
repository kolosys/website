import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GITHUB_ORG_URL = "https://github.com/kolosys";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const goGet = searchParams.get("go-get");

  // Only handle if go-get=1 query parameter is present
  if (goGet === "1") {
    // Skip if it's already a _go route or a Next.js internal route
    if (
      pathname.startsWith("/_go") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api")
    ) {
      return NextResponse.next();
    }

    // Don't handle root path
    if (pathname === "/") {
      return NextResponse.next();
    }

    // Get the host from the request headers
    const host = request.headers.get("host") || "kolosys.com";
    const domain = host.split(":")[0];

    // Extract package path (remove leading slash)
    const pkgPath = pathname.slice(1);

    // For go-get=1 requests, return HTML with meta tags directly
    const importPath = `${domain}/${pkgPath}`;
    const githubRepoUrl = `${GITHUB_ORG_URL}/${pkgPath}`;

    const html = `<!DOCTYPE html><html><head><meta name="go-import" content="${importPath} git ${githubRepoUrl}" /><meta name="go-source" content="${importPath} ${githubRepoUrl} ${githubRepoUrl}/tree/main{/dir} ${githubRepoUrl}/blob/main{/dir}/{file}#L{line}" /></head><body><div>go get ${importPath}</div></body></html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
