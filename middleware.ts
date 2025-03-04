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
    '/(.*)?_rsc=(.*)' // Ignore RSC requests
  ],
  afterAuth(auth, req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Skip middleware for RSC requests
    if (url.searchParams.has('_rsc')) {
      return NextResponse.next();
    }

    // Handle unauthenticated users
    const isProtectedRoute = 
      path.startsWith('/app') ||
      path.includes('/transformations') ||
      path.includes('/profile') ||
      path.includes('/credits');

    if (!auth.userId && isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    
    // Handle authenticated users trying to access the landing page
    if (auth.userId && path === "/") {
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
