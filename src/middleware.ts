import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ROUTES, SESSION_OPTIONS } from "./constants";
import { SessionData } from "./type";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Early return for API routes - no session check needed
  if (pathname.startsWith("/auth/api")) {
    return NextResponse.next();
  }

  // Special paths that don't follow the standard auth logic
  const publicAuthPaths: string[] = [ROUTES.auth.logout, ROUTES.auth.check];
  const isPublicAuthPath = publicAuthPaths.includes(pathname);

  // Only check session when necessary
  const session = await getIronSession<SessionData>(await cookies(), SESSION_OPTIONS);
  const isAuthenticated = !!session?.is_authenticated;

  // Case 1: Unauthenticated user trying to access protected routes
  if (!isAuthenticated && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL(ROUTES.auth.login, request.url));
  }

  // Case 2: Authenticated user trying to access regular auth pages (not logout or check)
  if (isAuthenticated && pathname.startsWith("/auth") && !isPublicAuthPath) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/((?!auth/api).)*"],
};
