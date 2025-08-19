// src/lib/invitations.ts
import { InvitationData as InvitationDataType } from '@/lib/dummy-data/wedding/dummy-wedding';
import { invitationData as defaultInvitationData } from "@/lib/dummy-data/wedding/dummy-wedding";

// Tipe data untuk metadata undangan
interface InvitationMeta {
    theme: 'classic-rose'; // Untuk sekarang hanya classic-rose
    variant: 'red' | 'green' | 'blue' | 'orange' | 'black' | 'white';
}

// Tipe data lengkap untuk satu undangan
interface Invitation {
    meta: InvitationMeta;
    data: InvitationDataType; // Menggunakan tipe data dari dummy-data agar strukturnya konsisten
}

// Database simulasi kita, menggunakan slug sebagai kunci
const sampleInvitations: Record<string, Invitation> = {
    "rika-fauzi": {
        meta: {
            theme: 'classic-rose',
            variant: 'black',
        },
        // Data ini 100% baru dan tidak menggunakan ...defaultData
        data: {
            couple: {
                groom: {
                    name: "Moch Fauzi Febriana",
                    parents: "Putra Pertama dari Bapak Ade Sudiana & Ibu Yani Andriani",
                    instagram: "mochfaauzi",
                    photo: "/images/SAMPLE/FOTO - Fauzi.jpg",
                },
                bride: {
                    name: "Rika Widiarti",
                    parents: "Putri Ketiga dari Bapak Timan & Ibu Nawangsih",
                    instagram: "rikawidiartii",
                    photo: "/images/SAMPLE/FOTO - Rika Widiarti.jpg",
                },
                heroImage: "/images/SAMPLE/FOTO - Couple.jpg",
            },
            weddingDate: new Date("2025-09-07T08:00:00"),
            events: [
                {
                    name: "Akad Nikah",
                    date: "3 September 2025",
                    time: "08:00 WIB - Selesai",
                    location: "Kantor Urusan Agama (KUA) Kecamatan Garut Kota",
                    address: "Jl. Bratayuda No.78, Kota Kulon, Kec. Garut Kota, Kabupaten Garut, Jawa Barat 44112",
                    mapLink: "https://maps.app.goo.gl/YYUHWnh5TbEWMvJ16",
                },
                {
                    name: "Resepsi",
                    date: "7 September 2025",
                    time: "08:00 WIB - Selesai",
                    location: "Kediaman Mempelai Wanita",
                    address: "Kp Galumpit, RT 01 RW 24, Kel. Kota Kulon, Kabupaten Garut",
                    mapLink: "https://maps.app.goo.gl/aCbnqFP7h4BzSAYM6",
                },
            ],
            gallery: {
                videoUrl: "",
                images: [
                    "/images/SAMPLE/IMG-20250802-WA0006.jpg",
                    "/images/SAMPLE/IMG-20250802-WA0005.jpg",
                    "/images/SAMPLE/IMG-20250802-WA0007.jpg",
                    "/images/SAMPLE/IMG-20250802-WA0008.jpg",
                    "/images/SAMPLE/IMG-20250802-WA0009.jpg",
                    "/images/SAMPLE/FOTO - Couple.jpg",
                ],
            },
            loveStory: [
                {
                    title: "Cerita Awal Pertemuan",
                    content: "Tidak ada yang tidak mungkin di dunia ini, bulan Februari 2019 kami saling mengenal satu sama lain melalui salah satu teman kami, hingga kami bertemu kembali setelah berkenalan 2 minggu dan memutuskan untuk menjalin hubungan sebagai pasangan.",
                },
                {
                    title: "Cerita Lamaran",
                    content: "Kehendaknya menuntun kami pada sebuah pertemuan yang tidak pernah disangka hingga akhirnya membawa kami pada sebuah ikatan suci yang di cintanya, kami melangsungkan acara lamaran pada bulan April 2024.",
                },
                {
                    title: "Cerita Pernikahan",
                    content: "Bukan karena bertemu lalu berjodoh, tapi karena berjodoh lah kami bisa bertemu,kami memutuskan untuk mengikrar janji suci pernikahan pada bulan September 2025 sebagaimana yang pernah dikatakan oleh Ali bin Abi thalib 'apa yang menjadi takdirmu akan menemukan jalannya untuk menemukanmu'.",
                },
            ],
            musicUrl: "https://youtu.be/GAf2DQPYvGE?si=JemtvfvApS7Dmt_t",
            gifts: [
                {
                    platform: "Permata Bank",
                    accountHolder: "Moch Fauzi Febriana",
                    accountNumber: "9999947317",
                    logo: "/images/landing/payments/Permata.png"
                },
                {
                    platform: "Dana",
                    accountHolder: "Rika widiarti",
                    accountNumber: "083824827362",
                    logo: "/images/landing/payments/Dana.png"
                }
            ]
        }
    }
};

/**
 * Fungsi untuk mengambil data undangan berdasarkan slug.
 * Ini mensimulasikan panggilan ke database/backend.
 * @param slug - URL slug dari undangan, cth: "rika-fauzi"
 * @returns Data undangan atau null jika tidak ditemukan.
 */
export function getInvitationBySlug(slug: string): Invitation | null {
    return sampleInvitations[slug] || null;
}

// Fungsi untuk mendapatkan undangan default
export function getDefaultInvitation(): Invitation {
    return {
        meta: {
            theme: "classic-rose",
            variant: "red", // Default variant
        },
        data: defaultInvitationData,
    };
}
