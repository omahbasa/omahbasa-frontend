'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import toast from 'react-hot-toast';

interface UserProfile {
    name: string;
    email: string;
    createdAt: string;
}

export default function ProfilPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const getToken = () => localStorage.getItem('omahbasa_token');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = getToken();
            if (!token) {
                toast.error('Anda harus login untuk melihat profil');
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/profile/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Gagal memuat profil');
                }

                const data: UserProfile = await res.json();
                setProfile(data);
                setName(data.name || "");
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const token = getToken();

        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Gagal menyimpan profil');
            }

            toast.success('Profil berhasil diperbarui!');
            setProfile(prev => prev ? { ...prev, name } : null);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 max-w-3xl mx-auto">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900">Profil Anda</h1>
            </div>

            <div className="p-6">
                {isLoading ? (
                    <p className="text-gray-500">Memuat profil...</p>
                ) : !profile ? (
                    <p className="text-gray-500">Gagal memuat profil. Silakan login kembali.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700 font-medium">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                className="bg-gray-50 border-gray-300"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className="bg-gray-200 border-gray-300 text-gray-500"
                                value={profile.email}
                                disabled
                            />
                            <p className="text-xs text-gray-500">Email tidak dapat diubah.</p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700 font-medium">Tanggal Bergabung</Label>
                            <Input
                                type="text"
                                className="bg-gray-200 border-gray-300 text-gray-500"
                                value={new Date(profile.createdAt).toLocaleDateString('id-ID', {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                })}
                                disabled
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                                disabled={isSaving}
                            >
                                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}