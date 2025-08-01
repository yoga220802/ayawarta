import type { Metadata } from "next";

// Metadata tidak berubah, tetap relevan.
export const metadata: Metadata = {
	title: "Undangan Pernikahan Bima & Anisa",
	description: "Sampel undangan digital dengan tema Classic Rose.",
};

export default function TemplateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// --- FIX ---
	// Struktur layout ini dirombak total untuk mengatasi masalah tampilan desktop.
	// Sebelumnya, ada div yang memaksa `max-w-md` pada layar besar (lg),
	// yang menyebabkan layout desktop terlihat seperti mobile.

	// Sekarang, layout ini hanya bertindak sebagai 'pass-through'.
	// Ia tidak lagi memaksakan container atau styling apa pun.
	// Ini memberikan kebebasan penuh kepada setiap child component (seperti OpeningSection, HeroSection, dll.)
	// untuk mengelola layout responsif mereka sendiri secara penuh.
	return <>{children}</>;
}
