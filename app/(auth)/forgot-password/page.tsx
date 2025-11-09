"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input as AntInput, notification } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Terjadi kesalahan');
            }

            notification.success({
                message: 'Permintaan Terkirim',
                description: data.message,
                placement: 'topRight',
                duration: 3
            });

            setTimeout(() => {
                router.push('/login');
            }, 3000);

        } catch (error: any) {
            notification.error({
                message: 'Permintaan Gagal',
                description: error.message || 'Silakan coba lagi.',
                placement: 'topRight',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center space-y-3">
                    <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-2">
                        <Image src="/logo.png" alt="Omahbasa" width={48} height={48} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Lupa Password Anda?
                    </h1>
                    <p className="text-gray-600 text-base">
                        Jangan khawatir. Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email
                        </Label>
                        <AntInput
                            id="email"
                            type="email"
                            placeholder="contoh@email.com"
                            required
                            className="h-12 rounded-xl text-base"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl text-white transform hover:scale-[1.02] transition-all duration-300 rounded-xl h-12 font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? "Mengirim..." : "Kirim Link Reset"}
                    </Button>
                </form>

                <p className="text-sm text-center text-gray-700">
                    Ingat password Anda?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                        Kembali ke Login
                    </Link>
                </p>
            </div>
        </div>
    );
}