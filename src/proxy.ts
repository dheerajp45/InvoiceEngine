
import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export function proxy(request: NextRequest) { 
    // console.log("Proxy running:", request.nextUrl.pathname)
  const sessionCookie = getSessionCookie(request)
//   console.log("Session:", sessionCookie)
  const { pathname } = request.nextUrl
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/create")||
    pathname.startsWith("/invoice")||
    pathname.startsWith("/settings");

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/create", "/create/:path*","/invoice/:path","/invoice"  , "/settings"  ],
}




