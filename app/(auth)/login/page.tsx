'use client';
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login submitted");
    };
    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
                <p className="text-gray-600">Silakan masuk untuk melanjutkan</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contoh@email.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Masuk
                </Button>
            </form>
            <p className="text-sm text-center text-gray-600">
                Belum punya akun?{" "}
                <Link href="/register" className="font-medium text-blue-600 hover:underline">
                    Daftar di sini
                </Link>
            </p>
        </div>
    );
}