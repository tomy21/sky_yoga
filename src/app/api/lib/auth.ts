import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET as string;

type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export type UserResponsePayload = {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    phone?: string;
    roleMaster?: {
      id?: number;
      name?: string;
      status?: string;
    };
    userDetail?: {
      fullName?: string;
      nickName?: string;
      email?: string;
      phoneWa?: string;
      address?: string;
      emergencyContact?: string;
    };
  };
};

export function createToken(
  user: Pick<AuthUser, 'id' | 'username' | 'email' | 'role'>,
  remember: boolean = false
) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: remember ? '30d' : '1d',
    }
  );
}

export function setTokenCookie(response: NextResponse, token: string, remember = false) {
  response.cookies.set('token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
  });

  return response;
}

export function removeTokenCookie() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Set-Cookie': serialize('token', '', {
        maxAge: 0,
        path: '/',
      }),
    },
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error: unknown) {
    console.error('JWT verification error:', error);
    return null;
  }
}
