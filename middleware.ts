// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  const publicPaths = ['/login', '/register', '/'];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Jika tidak ada token dan path bukan publik, redirect ke login.
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    const response = NextResponse.redirect(url);
    response.cookies.set('authToken', '', { expires: new Date(0) });
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path kecuali yang untuk aset statis atau API.
     * Kita akan proteksi API secara individual di dalam route handler-nya.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};