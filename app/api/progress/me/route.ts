import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { userId } = verifyAuth(request);

    const userProgress = await prisma.lessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          select: { title: true }
        }
      }
    });

    const totalScore = userProgress.reduce((sum, progress) => sum + progress.score, 0);

    return NextResponse.json({ totalScore, details: userProgress }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.startsWith('Akses ditolak')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Gagal mengambil data progress' }, { status: 500 });
  }
}