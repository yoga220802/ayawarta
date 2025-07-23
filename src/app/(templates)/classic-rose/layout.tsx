import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";

// Font untuk judul, memberikan kesan elegan dan klasik.
const playfair = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-playfair",
});

// Font untuk teks biasa, mudah dibaca dan modern.
const manrope = Manrope({
	subsets: ["latin"],
	weight: ["400", "600"],
	variable: "--font-manrope",
});

export const metadata: Metadata = {
	title: "Undangan Pernikahan Bima & Anisa",
	description: "Sampel undangan digital dengan tema Classic Rose.",
};

export default function TemplateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='id' className={`${playfair.variable} ${manrope.variable}`}>
			<body className='font-sans'>
				{/*
          Container untuk desktop view.
          - `bg-rose-50`: Warna background lembut.
          - `bg-[url('/images/themes/classic-rose/bg-desktop.png')]`: Gambar background bunga.
          - `hidden lg:flex`: Hanya tampil di layar besar.
        */}
				<div className="hidden lg:flex items-center justify-center min-h-screen bg-rose-50 bg-[url('/images/themes/classic-rose/bg-desktop.png')] bg-cover bg-center p-8">
					{/* Wrapper untuk konten utama di desktop, memberikan efek bayangan
              dan membatasi lebar agar terlihat seperti tampilan mobile.
            */}
					<div className='w-full max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-y-auto max-h-[90vh]'>
						{children}
					</div>
				</div>
				{/* Konten utama untuk mobile view, ditampilkan secara default */}
				<div className='lg:hidden'>{children}</div>
			</body>
		</html>
	);
}
