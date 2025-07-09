"use client";

import Header from "./components/header"

export default function HomePage() {
	return (
		<main className="font-sans">
			<Header logoUrl='/images/logo.png' />

			<section id="hero" className="h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Selamat Datang di AyaWarta</h1>
					<p className="text-lg text-gray-700 mb-6">Buat undangan digital modern yang elegan dan interaktif.</p>
					<a href="#fitur" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors">Mulai Sekarang</a>
				</div>
			</section>
		</main>
	)
}