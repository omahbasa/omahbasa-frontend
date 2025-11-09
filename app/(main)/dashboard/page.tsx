import Link from "next/link";

const UnitSection = ({ title, description, lessons }: { title: string, description: string, lessons: any[] }) => (
    <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-blue-700 mb-1">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
        <div className="space-y-3 p-5">
            {/* Nanti di sini Anda akan map data dari API /api/units */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                <div>
                    <h3 className="font-semibold text-gray-800">Pelajaran 1: Ngoko Lugu</h3>
                    <p className="text-sm text-gray-500">Dasar-dasar percakapan</p>
                </div>
                <Link href="/lesson/1" passHref>
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                        Mulai
                    </button>
                </Link>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div>
                    <h3 className="font-semibold text-gray-400">Pelajaran 2: Ngoko Alus</h3>
                    <p className="text-sm text-gray-400">Menunjukkan rasa hormat</p>
                </div>
                <button className="px-5 py-2 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed text-sm" disabled>
                    Terkunci
                </button>
            </div>
        </div>
    </div>
);

const LeaderboardSidebar = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-purple-600 mb-4">Papan Skor</h3>
        <ul className="space-y-3">
            <li className="flex items-center justify-between">
                <span className="font-medium text-gray-700">1. User A</span>
                <span className="text-gray-500">1500 XP</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="font-medium text-gray-700">2. User B</span>
                <span className="text-gray-500">1200 XP</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="font-medium text-gray-700">3. Anda</span>
                <span className="font-semibold text-blue-600">1000 XP</span>
            </li>
        </ul>
        <Link href="/papanskor" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Lihat selengkapnya →
        </Link>
    </div>
);

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Mulai Petualangan Bahasa Jawa Anda!
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-8">
                    <UnitSection
                        title="Unit 1: Tataran Ngoko"
                        description="Pelajari cara berbicara dengan teman sebaya dan situasi informal."
                        lessons={[]}
                    />
                    <UnitSection
                        title="Unit 2: Tataran Krama"
                        description="Pahami cara menggunakan bahasa yang sopan untuk orang yang lebih tua."
                        lessons={[]}
                    />
                </div>

                <div className="space-y-6">
                    <LeaderboardSidebar />
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-semibold text-green-600 mb-2">Latih Pelafalan (Swara)</h3>
                        <p className="text-gray-700 mb-4">
                            Dengarkan dan tirukan abjad Jawa.
                        </p>
                        <Link href="/swara" className="inline-block text-green-600 hover:underline">
                            Mulai Latih →
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}