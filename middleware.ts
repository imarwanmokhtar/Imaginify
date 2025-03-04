import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: [
    '/', 
    '/api/webhooks/clerk', 
    '/api/webhooks/stripe',
    '/sign-in',
    '/sign-up',
    '/sign-in/[[...sign-in]]',
    '/sign-up/[[...sign-up]]',
    '/auth/sign-in/[[...sign-in]]',
    '/auth/sign-up/[[...sign-up]]'
  ],
  ignoredRoutes: [
    '/api/webhooks/(.*)',
    '/_next/static/(.*)',
    '/favicon.ico',
    '/api/(.*)' // Temporarily ignore API routes to test if this fixes the issue
  ],
  afterAuth(auth, req) {
    const url = new URL(req.url);
    
    // Handle unauthenticated users
    if (!auth.userId && (
      url.pathname.startsWith('/app') ||
      url.pathname.startsWith('/transformations') ||
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/credits')
    )) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // Handle authenticated users
    if (auth.userId && url.pathname === "/") {
      return NextResponse.redirect(new URL("/app", req.url));
    }

    return NextResponse.next();
  }
});
 
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    "/"
  ],
};
