import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/concerts/:path*", "/artists/:path*", "/profile/:path*"],
};

const restrictedRoutes = [
  "/profile",
  "/profile/add_concert",
  "/profile/all_concert",
  "/profile/all_inquiry",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  if (!token) {
    if (url.pathname.startsWith("/concerts/") || url.pathname.startsWith("/artists/")) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (url.pathname.startsWith("/profile") && restrictedRoutes.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (token && token.role !== "artist" && url.pathname.startsWith("/profile")) {
    if (restrictedRoutes.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
