import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  // Include both versions of routes (with and without parentheses)
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
  afterAuth(auth, req) {
    // If the user is not authenticated and trying to access a protected route,
    // redirect them to the landing page
    if (!auth.userId && (
      req.nextUrl.pathname.startsWith('/app') ||
      req.nextUrl.pathname.startsWith('/transformations') ||
      req.nextUrl.pathname.startsWith('/profile') ||
      req.nextUrl.pathname.startsWith('/credits')
    )) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // If the user is authenticated and trying to access the landing page (root),
    // redirect them to the app page
    if (auth.userId && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/app", req.url));
    }
  }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
