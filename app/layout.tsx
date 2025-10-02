import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omahbasa - Belajar Bahasa Jawa",
  description: "Platform modern untuk belajar undha-usuk basa Jawa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}