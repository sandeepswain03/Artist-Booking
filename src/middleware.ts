import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/concerts/:path*',
    '/artists/:path*',
    '/profile/:path*',
    '/reset-password/:path*',
    '/forget-password',
    '/verify/:path*',
    '/sign-up',
    '/sign-in',
  ],
};

const restrictedArtistRoutes = [
  '/profile/add_concert',
  '/profile/all_concerts',
  '/profile/all_inquiry',
];

const authRoutes = [
  '/reset-password',
  '/forget-password',
  '/sign-up',
  '/sign-in',
  '/verify',
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  console.log('Token:', JSON.stringify(token, null, 2));

  // If there is no token
  if (!token) {
    // Redirect to /sign-up for any protected route
    if (
      url.pathname.startsWith('/concerts/') ||
      url.pathname.startsWith('/artists/') ||
      url.pathname.startsWith('/profile/')
    ) {
      return NextResponse.redirect(new URL('/sign-up', req.url));
    }
  }
  // If token exists
  else {
    // Don't allow access to auth routes if token exists
    if (authRoutes.some((route) => url.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // If token role is "user"
    if (token.role === 'user') {
      // Redirect to /profile if trying to access restricted artist routes
      if (restrictedArtistRoutes.includes(url.pathname)) {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
    }
    // If role is artist, allow all routes (no additional checks needed)
  }

  // For all other cases, proceed to the requested page
  return NextResponse.next();
}