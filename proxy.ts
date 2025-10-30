import { getSessionCookie } from "better-auth/cookies"

import { type NextRequest, NextResponse } from "next/server"

import { DEFAULT_LOGIN_REDIRECT } from "./lib/constants"
import { isPublicPath } from "./lib/public-paths"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get authentication status for all routes

  // This is the recommended approach to optimistically redirect users
  // Handle auth checks in each page/route
  const sessionCookie = getSessionCookie(request)

  // If user is already logged in and trying to access auth pages, redirect to dashboard
  if (sessionCookie && pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
  }

  // If user is already logged in and trying to access / page, redirect to dashboard
  // if (sessionCookie && pathname === '/') {
  //   return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
  // }

  // Allow access to public paths without authentication
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  // For protected paths, check authentication
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

// Match all routes except for static files and Next.js internal routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
