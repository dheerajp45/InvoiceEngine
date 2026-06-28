
import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  const { pathname } = request.nextUrl
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/create")

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/create/:path*"],
}