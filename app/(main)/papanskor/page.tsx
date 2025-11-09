'use client';

import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

interface LeaderboardEntry {
    userId: string;
    name: string;
    totalScore: number | null;
}

export default function ScorePage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch('/api/leaderboard');
                if (!res.ok) {
                    throw new Error('Gagal memuat data');
                }
                const data = await res.json();
                setLeaderboard(data);
            } catch (error: any) {
                toast.error(error.message || 'Gagal mengambil data leaderboard');
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Papan Skor</h1>
                <p className="text-lg text-gray-700">
                    Lihat peringkat Anda dan bersaing dengan pengguna lain!
                </p>
            </div>

            <div className="p-6">
                {isLoading ? (
                    <p className="text-gray-500">Memuat data...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peringkat</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Skor</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leaderboard.map((user, index) => (
                                    <tr key={user.userId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{user.totalScore || 0} XP</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}