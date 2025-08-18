// src/app/templates/wedding/classic-rose/[variant]/layout.tsx
import type { Metadata } from "next";

// Metadata bisa dibuat dinamis berdasarkan params jika diperlukan nanti
export const metadata: Metadata = {
	title: "Undangan Pernikahan Digital",
	description: "Dibuat dengan AyaWarta",
};

/**
 * Layout ini berfungsi sebagai pass-through.
 * Tidak ada wrapper atau style yang ditambahkan di sini,
 * memberikan kontrol penuh ke `page.tsx`.
 */
export default function TemplateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
