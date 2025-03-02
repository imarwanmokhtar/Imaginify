import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'],
  afterAuth(auth, req) {
    // If the user is not authenticated and trying to access a protected route,
    // redirect them to the landing page which is now the root
    if (!auth.userId && req.nextUrl.pathname.startsWith('/app')) {
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
  runtime: 'nodejs'
};