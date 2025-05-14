// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface jwtPayload {
  exp: number;
  iat: number;
  id: number;
  username: string;
  email: string;
  role: string;
}

export function middleware(req: NextRequest) {
  // Ambil token dari cookie
  const token = req.cookies.get('token')?.value;
  
  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    // Dekode token untuk mengambil 'exp' (expiration time)
    const decoded: jwtPayload = jwtDecode(token);

    // Ambil waktu kadaluarsa token (exp)
    const currentTime = Date.now() / 1000; // current time in seconds

    // Jika token sudah expired, logout user
    if (decoded.exp < currentTime) {
      // Hapus token dari cookie
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }

    // Jika token valid, lanjutkan request
    return NextResponse.next();

  } catch (error: unknown) {
    console.log(error);
    // Jika ada error saat decode token, arahkan ke halaman login
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('token');
    return response;
  }
}
