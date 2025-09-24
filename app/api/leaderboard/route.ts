import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const aggregatedScores = await prisma.lessonProgress.groupBy({
      by: ['userId'],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
      take: 10, 
    });

    const userIds = aggregatedScores.map(score => score.userId);
    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const leaderboard = aggregatedScores.map(score => {
      const user = users.find(u => u.id === score.userId);
      return {
        userId: score.userId,
        name: user?.name || 'User Tanpa Nama',
        totalScore: score._sum.score,
      };
    });

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Gagal mengambil data leaderboard' }, { status: 500 });
  }
}