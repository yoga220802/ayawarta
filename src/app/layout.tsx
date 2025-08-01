import type { Metadata } from "next";
import {
	Noto_Sans_Thai,
	Playfair_Display,
	Manrope,
	Alex_Brush,
	Alice,
} from "next/font/google";
import "./globals.css";

// INFO: Font untuk landing page
const noto = Noto_Sans_Thai({
	subsets: ["latin", "thai"],
	weight: ["400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-noto-sans-thai",
});

// INFO: Font untuk template Classic Rose dan template lainnya nanti
const playfair = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-playfair",
});

const manrope = Manrope({
	subsets: ["latin"],
	weight: ["400", "600"],
	variable: "--font-manrope",
});

const alexBrush = Alex_Brush({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-alex-brush",
});

const alice = Alice({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-alice",
});

export const metadata: Metadata = {
	title: "AyaWarta - Undangan Digital Modern",
	description:
		"Buat dan bagikan undangan pernikahan online yang elegan, interaktif, dan ramah lingkungan.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='id'
			className={`${noto.variable} ${playfair.variable} ${manrope.variable} ${alexBrush.variable} ${alice.variable}`}>
			<body className='font-body bg-white antialiased'>{children}</body>
		</html>
	);
}
