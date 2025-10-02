"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input as AntInput } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
    console.log("Login submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-[#154D71] relative overflow-hidden p-4 font-sans">
      <div className="w-full max-w-md p-5 space-y-8 bg-[#1C6EA4] backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 relative z-10 my-auto">
        <div className="text-center space-y-3">
          <div className="inline-block p-4 bg-[#33A1E0]/20 rounded-4xl backdrop-blur-sm mb-2">
            <Image src="/logo.png" alt="Omahbasa" width={48} height={48} />
          </div>
          <h1 className="text-2xl font-bold text-[#FFF9AF] tracking-tight">
            Selamat Datang di Omahbasa
          </h1>
          <p className="text-[#FFF9AF]/80 text-base mt-[-10]">
            Silakan masuk untuk melanjutkan
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#FFF9AF] font-medium">
              Email
            </Label>
            <AntInput
              id="email"
              type="email"
              placeholder="contoh@email.com"
              required
              style={{ fontFamily: "Inter, sans-serif" }}
              className="bg-[#33A1E0]/30 border-[#33A1E0]/50 text-white placeholder:text-white/50 focus:bg-[#33A1E0]/40 focus:border-[#33A1E0] transition-all duration-300 rounded-xl h-12 [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#FFF9AF] font-medium">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#FFF9AF]/70 hover:text-[#FFF9AF] transition-colors duration-200"
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
              className="bg-[#33A1E0]/30 border-[#33A1E0]/50 text-white placeholder:text-white/50 focus:bg-[#33A1E0]/40 focus:border-[#33A1E0] transition-all duration-300 rounded-xl h-12 [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-white/50 [&_.ant-input-password-icon]:text-white/70 hover:[&_.ant-input-password-icon]:text-white"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#33A1E0] to-[#1C6EA4] hover:from-[#33A1E0]/90 hover:to-[#1C6EA4]/90 shadow-lg hover:shadow-xl hover:cursor-pointer transform hover:scale-[1.02] transition-all duration-300 rounded-xl h-12 font-semibold text-white"
          >
            Masuk
          </Button>
        </div>

        <div className="relative flex items-center">
          <div className="flex-1 border-t border-white/20"></div>
          <div className="px-4 text-sm text-[#FFF9AF]/60">atau</div>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        <p className="text-sm text-center text-white/90">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#FFF9AF] hover:text-white transition-colors duration-200 underline decoration-[#33A1E0] underline-offset-4"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
