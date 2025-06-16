import type { Metadata } from "next";
import { Lilita_One, Noto_Sans } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-lilita-one",
});

const notoSans = Noto_Sans({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "AyaWarta - Undangan Digital",
	description: "Bagikan kabar bahagia pernikahan Anda melalui undangan digital.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${lilitaOne.variable} ${notoSans.className} font-sans antialiased`}>
				{children}
			</body>
		</html>
	);
}
