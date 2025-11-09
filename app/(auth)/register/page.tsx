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

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Terjadi kesalahan saat pendaftaran');
      }

      toast.success('Pendaftaran Berhasil! Anda akan diarahkan ke halaman login...');

      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch (error: any) {
      toast.error(error.message || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center space-y-3">
          <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-2">
            <Image src="/logo.png" alt="Omahbasa" width={48} height={48} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Buat Akun Omahbasa
          </h1>
          <p className="text-gray-600 text-base">
            Mulai perjalanan bahasa Jawa Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Nama
            </Label>
            <AntInput
              id="name"
              type="text"
              placeholder="Nama lengkap Anda"
              required
              className="h-12 rounded-xl text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>

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
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <AntInput.Password
              id="password"
              placeholder="Buat password"
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
            {isLoading ? "Memproses..." : "Daftar"}
          </Button>
        </form>

        <div className="relative flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <div className="px-4 text-sm text-gray-500">atau</div>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <p className="text-sm text-center text-gray-700">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}