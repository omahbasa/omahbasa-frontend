import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Akses ditolak: Token tidak ada atau format salah' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    let decodedPayload: TokenPayload;
    try {
      decodedPayload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    } catch (error) {
      return NextResponse.json({ message: 'Akses ditolak: Token tidak valid atau kadaluarsa' }, { status: 401 });
    }
    
    const body = await request.json();
    const { name } = body; 
    
    const updatedUser = await prisma.user.update({
      where: { id: decodedPayload.userId },
      data: {
        name: name,
      },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json({ user: userWithoutPassword, message: 'Profil berhasil diupdate' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}