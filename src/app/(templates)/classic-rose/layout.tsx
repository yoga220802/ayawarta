import type { Metadata } from "next";

// INFO: Kita tidak perlu lagi mengimpor font di sini.
// Semua font akan di-handle oleh layout akar (RootLayout).

export const metadata: Metadata = {
	title: "Undangan Pernikahan Bima & Anisa",
	description: "Sampel undangan digital dengan tema Classic Rose.",
};

// Layout anak sekarang menjadi komponen sederhana yang hanya menerima children.
// Tidak ada lagi tag <html> atau <body> di sini.
export default function TemplateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		// FIX: Menghapus `font-body-alt` dari sini.
		// Dengan menghapusnya, kita tidak "memaksa" semua teks di dalam template
		// untuk menggunakan font Manrope. Ini memberikan kebebasan bagi setiap komponen
		// (Hero, Couple, Event) untuk menentukan font-nya sendiri (misal: heading pakai Playfair,
		// body pakai Manrope, nama pakai Alice). Font default akan mengikuti `font-body` dari RootLayout.
		<div>
			<div className="hidden lg:flex items-center justify-center min-h-screen bg-rose-50 bg-[url('/images/themes/classic-rose/bg-desktop.png')] bg-cover bg-center p-8">
				<div className='w-full max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-y-auto max-h-[90vh]'>
					{children}
				</div>
			</div>
			<div className='lg:hidden'>{children}</div>
		</div>
	);
}
