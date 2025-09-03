import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/auth/login",
    "/api/auth/podio",
    "/api/auth/podio/callback",
    "/api/debug/session", // Add debug endpoint
    "/api/test/logout", // Add test logout endpoint
    "/test-session", // Add test page
  ];

  // Check if the current path is a public route
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // For all other routes, check authentication
  try {
    // Check for session cookie directly to avoid Edge Runtime issues
    const sessionCookie = request.cookies.get("podio_session");

    // Debug logging
    console.log(
      `Middleware: ${pathname} - Session cookie:`,
      sessionCookie ? "exists" : "missing"
    );

    if (!sessionCookie?.value) {
      // No session, redirect to login
      console.log(`Middleware: Redirecting ${pathname} to login (no session)`);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // If user is on login page but has valid session, redirect to home
    if (pathname === "/auth/login") {
      console.log(`Middleware: Redirecting ${pathname} to home (has session)`);
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log(`Middleware: Allowing access to ${pathname} (has session)`);
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
