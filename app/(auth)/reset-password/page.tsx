"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input as AntInput, notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setError("Token reset tidak ditemukan atau tidak valid.");
            notification.error({
                message: 'Error',
                description: 'Token reset tidak ditemukan. Silakan minta link baru.',
                placement: 'topRight',
            });
            router.push('/forgot-password');
        }
    }, [token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            notification.error({
                message: 'Gagal',
                description: 'Password dan Konfirmasi Password tidak cocok.',
                placement: 'topRight',
            });
            return;
        }

        if (!token) {
            notification.error({
                message: 'Gagal',
                description: 'Token reset tidak valid.',
                placement: 'topRight',
            });
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Gagal mereset password');
            }

            notification.success({
                message: 'Berhasil',
                description: 'Password Anda telah berhasil direset. Silakan login.',
                placement: 'topRight',
                duration: 3
            });

            setTimeout(() => {
                router.push('/login');
            }, 3000);

        } catch (error: any) {
            notification.error({
                message: 'Reset Gagal',
                description: error.message || 'Token mungkin tidak valid atau sudah kedaluwarsa.',
                placement: 'topRight',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!token || error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="w-full max-w-md p-8 text-center bg-white rounded-2xl shadow-lg">
                    <h1 className="text-xl font-bold text-red-600">Token Tidak Valid</h1>
                    <p className="text-gray-600 mt-2">Link reset password ini tidak valid atau sudah kedaluwarsa.</p>
                    <Link href="/forgot-password">
                        <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 h-12 font-semibold">
                            Minta Link Baru
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center space-y-3">
                    <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-2">
                        <Image src="/logo.png" alt="Omahbasa" width={48} height={48} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Reset Password Anda
                    </h1>
                    <p className="text-gray-600 text-base">
                        Masukkan password baru Anda di bawah ini.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700 font-medium">
                            Password Baru
                        </Label>
                        <AntInput.Password
                            id="password"
                            placeholder="Masukkan password baru"
                            required
                            iconRender={(visible) =>
                                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                            }
                            className="h-12 rounded-xl text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                            Konfirmasi Password Baru
                        </Label>
                        <AntInput.Password
                            id="confirmPassword"
                            placeholder="Konfirmasi password baru"
                            required
                            iconRender={(visible) =>
                                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                            }
                            className="h-12 rounded-xl text-base"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl text-white transform hover:scale-[1.02] transition-all duration-300 rounded-xl h-12 font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? "Menyimpan..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}