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
    '/favicon.ico'
  ],
  afterAuth(auth, req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Handle unauthenticated users
    if (!auth.userId && (
      path.startsWith('/app') ||
      path.startsWith('/(root)/transformations') ||
      path.startsWith('/transformations') ||
      path.startsWith('/(root)/profile') ||
      path.startsWith('/profile') ||
      path.startsWith('/(root)/credits') ||
      path.startsWith('/credits')
    )) {
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
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ]
};
