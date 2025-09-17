import Link from "next/link";
import { Button } from "@/components/ui/Button";

const Sidebar = () => (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col justify-between">
        <div>
            <div className="p-4 font-bold text-2xl text-blue-600 dark:text-blue-400 mb-6">
                Omahbasa
            </div>
            <nav className="space-y-2">
                <Link href="/" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="mr-3 text-lg">🏠</span>
                    <span className="font-medium">Beranda</span>
                </Link>
                <Link href="/sinau" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="mr-3 text-lg">📚</span>
                    <span className="font-medium">Sinau</span>
                </Link>
                <Link href="/swara" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="mr-3 text-lg">🗣️</span>
                    <span className="font-medium">Swara</span>
                </Link>
                <Link href="/skor" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="mr-3 text-lg">🏆</span>
                    <span className="font-medium">Papan Skor</span>
                </Link>
                <Link href="/profil" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="mr-3 text-lg">👤</span>
                    <span className="font-medium">Profil</span>
                </Link>
            </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" className="w-full">Keluar</Button>
        </div>
    </aside>
);

const Header = () => (
    <header className="p-4 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">Halo, Pengguna!</span>
        </div>
    </header>
);

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}