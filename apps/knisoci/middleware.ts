import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './lib/supabase/edge';

export async function middleware(request: NextRequest) {
  try {
    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { pathname } = request.nextUrl;

    // Redirect to login if not authenticated and trying to access protected routes
    if (!session && (pathname.startsWith('/dashboard') || pathname.startsWith('/scan') || pathname.startsWith('/history'))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/scan/:path*',
    '/history/:path*',
  ],
};
