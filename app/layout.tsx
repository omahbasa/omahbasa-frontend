import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import { Toaster } from 'react-hot-toast';

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
      <body className={`${inter.className} bg-gray-50`}>
        <Toaster position="top-right" reverseOrder={false} />
        <AntdRegistry>
          <App>
            {children}
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}