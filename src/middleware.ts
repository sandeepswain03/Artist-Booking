import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    "/concerts/:path*",
    "/artists/:path*",
    "/profile/:path*",
    "/reset-password/:path*",
    "/forget-password",
    "/verify/:path*",
  ],
};

const restrictedRoutes = [
  "/profile/add_concert",
  "/profile/all_concerts",
  "/profile/all_inquiry",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === 'production' });
  const url = req.nextUrl;

  if (!token) {
    if (
      url.pathname.startsWith("/concerts/") ||
      url.pathname.startsWith("/artists/") ||
      url.pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (token) {
    if (token.role !== "artist" && url.pathname.startsWith("/profile")) {
      if (restrictedRoutes.includes(url.pathname)) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }

    if (
      url.pathname.startsWith("/reset-password") ||
      url.pathname.startsWith("/forget-password") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/verify")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
