import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { DEFAULT_LOGIN_REDIRECT, apiPrefix, authRoutes, protectedRoutes } from "./routes";

export default auth(async (request: NextRequest & { auth: Session | null }) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isLoggedIn && isAuthRoute && !isProtectedRoute) {
    const redirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  let callbackUrl = nextUrl.pathname;

  if (nextUrl.search) {
    callbackUrl += nextUrl.search;
  }

  const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  if (!isLoggedIn && isProtectedRoute) {
    const redirectUrl = new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
