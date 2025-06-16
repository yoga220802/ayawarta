import React from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function LandingPage() {
	return (
		<div className='relative min-h-screen bg-white text-slate-800 overflow-hidden font-sans'>
			<Image
				src='/images/landing/bg-page.svg'
				alt='Latar belakang halaman dengan bentuk dekoratif'
				fill
				className='object-cover opacity-75'
			/>

			<div className='container mx-auto px-6 md:px-12 relative z-10'>
				<header className='py-8'>
					<h1 className='font-lilita text-4xl font-normal tracking-wider'>
							<span className='text-[#403D99]'>Aya</span>
							<span className='text-[#6B66FF]'>Warta</span>.
					</h1>
				</header>

				<main className='flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-150px)] pb-16'>
					<div className='text-center lg:text-left max-w-xl'>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight'>
								<span className='text-[#403D99]'>Ini Hari Anda</span>
								<br />
								<span className='text-[#403D99]'>
									Rayakan Setiap <span className='text-[#6B66FF]'>Detiknya</span>
								</span>
						</h2>
						<p className='mt-6 text-lg text-slate-600'>
							Bagikan kabar bahagia pernikahan Anda melalui undangan digital yang
							didesain untuk menyentuh hati dan memukau setiap tamu.
						</p>
						<a
							href='#order'
							className='mt-10 inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105'>
							COMING SOON
							<MoveRight size={20} />
						</a>
					</div>

					<div className='relative flex-1 flex items-center justify-center lg:justify-end w-full lg:w-auto'>
						<div className='relative w-full max-w-md lg:max-w-xl'>
							<Image
								src='/images/landing/bg-handphone.svg' // Ganti dengan path aset bg-handphone Anda
								alt='Latar belakang abstrak untuk telepon'
								width={700}
								height={700}
								className='w-full h-auto'
							/>
							<div className='absolute inset-0 flex items-center justify-center'>
								<Image
									src='/images/landing/handphone.svg'
									alt='Mockup aplikasi di telepon'
									width={300}
									height={600}
									priority
									className='w-auto h-auto max-h-[90%] transform transition-transform duration-500 hover:scale-105'
								/>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
