'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + '/');
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/dashboard" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            <Image src="/logo.png" alt="Omahbasa" width={32} height={32} />
                            {/* Omahbasa */}
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-4">
                            <Link
                                href="/dashboard"
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard')
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span className="mr-2">🏠</span>
                                Beranda
                            </Link>
                            <Link
                                href="/sinau"
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/sinau')
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span className="mr-2">📚</span>
                                Sinau
                            </Link>
                            <Link
                                href="/swara"
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/swara')
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span className="mr-2">🗣️</span>
                                Swara
                            </Link>
                            <Link
                                href="/papanskor"
                                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/papanskor')
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span className="mr-2">🏆</span>
                                Papan Skor
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu*/}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="bg-gray-100 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Buka menu utama</span>
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <div>
                            <button
                                type="button"
                                className="bg-gray-100 dark:bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                onClick={toggleDropdown}
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <span className="sr-only">Buka menu user</span>
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">U</span>
                                </div>
                            </button>
                        </div>

                        {isDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <Link
                                    href="/profil"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <span className="mr-2">👤</span>
                                    Profil
                                </Link>
                                <button
                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        // Tambahkan logika logout di sini
                                        console.log('Logout clicked');
                                    }}
                                >
                                    <span className="mr-2">🚪</span>
                                    Keluar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-800">
                        <Link
                            href="/dashboard"
                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/dashboard')
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="mr-3">🏠</span>
                            Beranda
                        </Link>
                        <Link
                            href="/sinau"
                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/sinau')
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="mr-3">📚</span>
                            Sinau
                        </Link>
                        <Link
                            href="/swara"
                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/swara')
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="mr-3">🗣️</span>
                            Swara
                        </Link>
                        <Link
                            href="/papanskor"
                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive('/papanskor')
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="mr-3">🏆</span>
                            Papan Skor
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
            <Navbar />
            <main className="flex-1 px-19 py-5 overflow-auto">
                {children}
            </main>
        </div>
    );
}