"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input as AntInput, notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Terjadi kesalahan saat login');
      }

      localStorage.setItem('omahbasa_token', data.token);

      toast.success('Login Berhasil! Anda akan diarahkan...');

      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 1000);

    } catch (error: any) {
      toast.error(error.message || 'Email atau password salah. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center space-y-3">
          <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-2">
            <Image src="/logo.png" alt="Omahbasa" width={48} height={48} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Selamat Datang di Omahbasa
          </h1>
          <p className="text-gray-600 text-base">
            Silakan masuk untuk melanjutkan
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Lupa password?
              </Link>
            </div>
            <AntInput.Password
              id="password"
              placeholder="Masukkan password"
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

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl text-white transform hover:scale-[1.02] transition-all duration-300 rounded-xl h-12 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <div className="relative flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="px-4 text-sm text-gray-500">atau</div>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <p className="text-sm text-center text-gray-700">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}