import type { Metadata } from "next";

import {Noto_Sans_Thai} from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Thai({
	  subsets: ["latin", "thai"],
	  weight: ["400", "500", "600", "700", "800", "900"],
	  display: "swap",
	  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  title: "AyaWarta - Undangan Digital Modern",
  description: 'Buat dan bagikan undangan pernikahan online yang elegan, interaktif, dan ramah lingkungan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
	<html lang="id" className={`${noto.variable}`}>
	  <body className={`${noto.className} bg-white antialiased`}>
		{children}
	  </body>
	</html>
  );
}