import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const { userId } = verifyAuth(request);

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        if (!user) {
            return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error && error.message.startsWith('Akses ditolak')) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        console.error(error);
        return NextResponse.json({ message: 'Gagal mengambil data profile' }, { status: 500 });
    }
}