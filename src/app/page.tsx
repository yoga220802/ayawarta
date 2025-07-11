"use client";

import Header from "./components/landing/header";
import HeroSection from "./components/landing/homeSection";


export default function HomePage() {
	return (
		<main className='font-sans'>
			<Header />

			<HeroSection />

			<section
				id='fitur'
				className='h-screen bg-white flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold text-gray-800'>Fitur-Fitur Keren</h2>
					<p className='text-lg text-gray-500 mt-4'>
						Akan kita bangun selanjutnya...
					</p>
				</div>
			</section>
		</main>
	);
}
