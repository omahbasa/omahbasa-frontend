import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password wajib diisi' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 }); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    return NextResponse.json({ token, message: 'Login berhasil' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}