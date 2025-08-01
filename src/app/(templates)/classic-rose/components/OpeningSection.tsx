"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Ikon amplop terbuka
const MailOpenIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7l8 5 8-5z' />
		<path d='m22 6-8 5-8-5' />
	</svg>
);

interface OpeningProps {
	coupleNames: string;
	guestName?: string | null;
	onOpen: () => void;
}

const OpeningSection: React.FC<OpeningProps> = ({
	coupleNames,
	guestName,
	onOpen,
}) => {
	// INFO: Komponen ini sudah menggunakan kelas font yang benar (`font-alice`, `font-script`).
	// Jadi tidak banyak perubahan di sini, hanya memastikan konsistensi.
	return (
		<div className='relative min-h-screen w-full flex items-center justify-center text-[#630718] overflow-hidden font-alice'>
			{/* Background Image */}
			<Image
				src='/images/themes/classic-rose/opening/bg.png'
				alt='Background'
				fill
				className='z-0 object-cover'
				onError={(e) =>
					(e.currentTarget.src =
						"https://placehold.co/800x1200/FDF8F8/630718?text=BG")
				}
			/>

			{/* Decorative Flowers */}
			<motion.div
				className='absolute -top-16 -left-24 w-64 h-96 md:w-96 md:h-[500px]'
				initial={{ opacity: 0, x: -100, y: -100 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				transition={{ duration: 1.5, ease: "easeOut" }}>
				<Image
					src='/images/themes/classic-rose/opening/bunga.png'
					alt='Bunga Kiri Atas'
					fill
					className='object-contain'
				/>
			</motion.div>
			<motion.div
				className='absolute -bottom-16 -right-24 w-64 h-96 md:w-96 md:h-[500px] transform rotate-180'
				initial={{ opacity: 0, x: 100, y: 100 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				transition={{ duration: 1.5, ease: "easeOut" }}>
				<Image
					src='/images/themes/classic-rose/opening/bunga.png'
					alt='Bunga Kanan Bawah'
					fill
					className='object-contain'
				/>
			</motion.div>

			{/* Main Content */}
			<motion.div
				className='relative z-10 flex flex-col items-center text-center p-8'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 0.5 }}>
				<p className='text-2xl md:text-3xl'>We Are Getting Married</p>

				<div className='relative w-64 h-64 md:w-80 md:h-80 my-4'>
					<Image
						src='/images/themes/classic-rose/opening/bingkai.png'
						alt='Bingkai Foto'
						fill
						className='z-10'
					/>
					<div className='absolute inset-[25px] md:inset-[30px] rounded-full overflow-hidden'>
						<Image
							src='/images/themes/classic-rose/opening/foto.png'
							alt='Foto Pasangan'
							fill
							className='object-cover'
						/>
					</div>
				</div>

				{/* FIX: Menggunakan `font-script` untuk nama pasangan */}
				<h1 className='font-script text-5xl md:text-6xl'>{coupleNames}</h1>

				{guestName && (
					<div className='mt-6'>
						<p className='text-sm'>Kepada Yth. Bapak/Ibu/Saudara/i</p>
						<p className='text-lg mt-1'>{guestName}</p>
					</div>
				)}

				<p className='text-xs md:text-sm max-w-xs mt-4'>
					Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari
					momen berharga kami.
				</p>

				<button
					onClick={onOpen}
					className='mt-8 bg-[#630718] text-white rounded-md flex items-center justify-center gap-2 px-6 py-3 hover:bg-opacity-90 transition-all shadow-lg'>
					<MailOpenIcon />
					{/* FIX: Dihapus `font-sans` agar font-nya mewarisi dari parent (`font-alice`) */}
					<span className='font-semibold'>Buka Undangan</span>
				</button>
			</motion.div>
		</div>
	);
};

export default OpeningSection;
