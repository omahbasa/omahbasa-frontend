import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const units = await prisma.unit.findMany({
      orderBy: {
        order: 'asc', 
      },
      include: {
        lessons: {
          select: {
            id: true,
            title: true,
          }
        },
      },
    });

    return NextResponse.json(units, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Gagal mengambil data unit' }, { status: 500 });
  }
}