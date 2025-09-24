import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth'; 
const prisma = new PrismaClient();
export async function GET(request: NextRequest, { params }: { params: { lessonId: string } }) {
try {
    verifyAuth(request);
    const { lessonId } = params;

    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
            questions: {
                select: {
                    id: true,
                    text: true,
                    type: true,
                    options: true, 
                }
            },
        },
    });

    if (!lesson) {
        return NextResponse.json({ message: 'Pelajaran tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(lesson, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error && error.message.startsWith('Akses ditolak')) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        console.error(error);
        return NextResponse.json({ message: 'Gagal mengambil data pelajaran' }, { status: 500 });
    }
}