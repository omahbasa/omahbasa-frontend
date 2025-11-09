// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ message: 'Email wajib diisi' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            const rawToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

            const expiresAt = new Date(Date.now() + 3600 * 1000);

            await prisma.passwordResetToken.deleteMany({
                where: { userId: user.id }
            });

            await prisma.passwordResetToken.create({
                data: {
                    userId: user.id,
                    token: hashedToken,
                    expiresAt: expiresAt,
                },
            });

            const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${rawToken}`;

            console.log('RESET PASSWORD LINK (Kirim ini ke user):', resetLink);
        }

        return NextResponse.json({
            message: 'Jika email Anda terdaftar, link reset password akan dikirim.'
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
    }
}