import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import  {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  role?: 'ADMIN' | 'EMPLOYEE' | 'JOBSEEKER';
  exp?: number;
}

export function middleware(req: NextRequest) {
  // ✅ Read JWT token from cookies (not localStorage)
  const token = req.cookies.get('authToken')?.value;
  const url = req.nextUrl.clone();

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

  // ✅ Allow access to public routes
  if (publicPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 🚫 No token → redirect to login
  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ✅ Decode the token safely
  let decoded: DecodedToken;
  try {
    decoded = jwtDecode(token);
  } catch {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ⏰ Check token expiry
  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const role = decoded.role;

  // 🔒 Role-based route protection
  if (url.pathname.startsWith('/admin') && role !== 'ADMIN') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/employee') && role !== 'EMPLOYEE') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/jobseeker') && role !== 'JOBSEEKER') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  // ✅ Everything OK → continue
  return NextResponse.next();
}

// ✅ Apply middleware to all pages except static assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
