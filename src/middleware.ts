import { Session } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { apiPrefix, protectedRoutes, publicRoutes } from "./routes";

export default auth(async (request: NextRequest & { auth: Session | null }) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (isLoggedIn) {
      return NextResponse.next();
    }

    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.rewrite(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
