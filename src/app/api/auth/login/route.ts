import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import { createToken, setTokenCookie } from "../../lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identify, password, remember } = body;

    if (!identify || !password) {
      return NextResponse.json(
        {
          code: 400001,
          field: !identify ? 'identify' : 'password',
          message: 'Email/Username dan Password wajib diisi',
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identify }, { username: identify }],
      },
      include: {
        roleMaster: true,
        userDetail: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          code: 404001,
          field: 'identify',
          message: 'User tidak ditemukan',
        },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          code: 401001,
          field: 'password',
          message: 'Password salah',
        },
        { status: 401 }
      );
    }

    const token = createToken(user, remember);

    const response = NextResponse.json({
      code: 210200,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        roleMaster: user.roleMaster,
        userDetail: user.userDetail,
      },
    });

    return setTokenCookie(response, token, remember);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        code: 500000,
        message: 'Terjadi kesalahan di server',
      },
      { status: 500 }
    );
  }
}


