import Link from "next/link";

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Beranda Omahbasa</h1>
            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                Selamat datang kembali di platform belajar bahasa Jawa Anda!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Mulai Belajar (Sinau)</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Pilih materi dan tingkat kesulitan untuk mengasah kemampuan bahasa Jawa Anda.
                    </p>
                    <Link href="/sinau" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
                        Lihat Materi →
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Latih Pelafalan (Swara)</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Dengarkan abjad Jawa dan latih pengucapan Anda dengan fitur rekaman suara.
                    </p>
                    <Link href="/swara" className="mt-4 inline-block text-green-600 dark:text-green-400 hover:underline">
                        Mulai Latih →
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">Cek Papan Skor</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Pantau progres belajar Anda dan bandingkan dengan pengguna lain.
                    </p>
                    <Link href="/skor" className="mt-4 inline-block text-purple-600 dark:text-purple-400 hover:underline">
                        Lihat Skor →
                    </Link>
                </div>
            </div>
        </div>
    );
}