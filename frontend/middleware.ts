import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role?: 'ADMIN' | 'EMPLOYEE' | 'JOBSEEKER';
  exp?: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  const { pathname } = req.nextUrl;

  const publicPaths = [
    '/',
    '/about',
    '/contact',
    '/jobs',
    '/login',
    '/register',
    '/reset-password',
    '/verify-otp',
  ];

  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/'),
  );

  if (isPublic) {
    // 🔥 If logged in user visits login → redirect to home
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(token);
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ⏰ Expired token
  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const role = decoded.role || 'PUBLIC';

  const roleAccessMap: Record<string, string[]> = {
    ADMIN: ['/admin'],
    EMPLOYEE: ['/employee'],
    JOBSEEKER: ['/jobseeker'],
  };

  const allowedRoutes = roleAccessMap[role] || [];

  const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
