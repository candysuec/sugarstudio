import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './lib/supabase/server';

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only for logging errors in `middleware.ts`
    // in case Supabase authentication throws an error.
    const supabase = createClient();

    // Refresh session if expired - public pages
    // await supabase.auth.getSession();

    // Protect routes
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { pathname } = request.nextUrl;

    // Redirect logged-in users from login/signup pages to /knisoci
    if (session && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL('/knisoci', request.url));
    }

    // Protect /knisoci and other authenticated routes
    if (!session && pathname.startsWith('/knisoci')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (e) {
    // If you are using a Next.js 13.4.x or older, you might need to use `request.url` instead of `request.nextUrl.origin`.
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
