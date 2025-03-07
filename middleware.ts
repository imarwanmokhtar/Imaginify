import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
    '/_next/image(.*)',
    '/favicon.ico',
    '/(.*)?_rsc=(.*)', // Ignore RSC requests
    '/_next/data/(.*)'  // Ignore Next.js data requests
  ],
  afterAuth(auth, req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Skip middleware for RSC and data requests
    if (url.searchParams.has('_rsc') || path.includes('/_next/data/')) {
      return NextResponse.next();
    }

    // Handle unauthenticated users
    const isPublicRoute = 
      path === "/" || 
      path.startsWith("/sign-in") || 
      path.startsWith("/sign-up");

    const isProtectedRoute = 
      path.startsWith('/app') ||
      path.startsWith('/transformations') ||
      path.startsWith('/profile') ||
      path.startsWith('/credits');

    // If user is not signed in and trying to access protected route
    if (!auth.userId && isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // If user is signed in and trying to access public route
    if (auth.userId && isPublicRoute) {
      return NextResponse.redirect(new URL("/app", req.url));
    }

    return NextResponse.next();
  }
});
 
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/"
  ]
};
