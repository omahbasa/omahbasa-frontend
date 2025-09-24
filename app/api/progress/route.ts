import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const payload = verifyAuth(request); 
    const { userId } = payload;
    
    const body = await request.json();
    const { lessonId, score } = body;

    if (!lessonId || score === undefined) {
      return NextResponse.json({ message: 'lessonId dan score wajib diisi' }, { status: 400 });
    }

    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { 
          userId,
          lessonId,
        },
      },
      update: {
        score,
        completed: true,
      },
      create: {
        userId,
        lessonId,
        score,
        completed: true,
      },
    });

    return NextResponse.json({ message: 'Progress berhasil disimpan', progress }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.startsWith('Akses ditolak')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Gagal menyimpan progress' }, { status: 500 });
  }
}