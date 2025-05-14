// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('→ Middleware fired for:', request.nextUrl.pathname);
  const token = request.cookies.get('token')?.value;
  if (request.nextUrl.pathname.startsWith('/admin') && !token) {
    const url = new URL('/signin', request.url);
    url.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
