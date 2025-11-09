// app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, password } = body;

        if (!token || !password) {
            return NextResponse.json({ message: 'Token dan password wajib diisi' }, { status: 400 });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token: hashedToken },
        });

        if (!resetToken) {
            return NextResponse.json({ message: 'Token tidak valid' }, { status: 400 });
        }

        if (new Date() > resetToken.expiresAt) {
            await prisma.passwordResetToken.delete({
                where: { id: resetToken.id }
            });
            return NextResponse.json({ message: 'Token sudah kedaluwarsa' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: resetToken.userId },
            data: {
                password: hashedPassword,
            },
        });

        await prisma.passwordResetToken.delete({
            where: { id: resetToken.id },
        });

        return NextResponse.json({ message: 'Password berhasil direset' }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
    }
}