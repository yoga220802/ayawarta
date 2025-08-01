"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Ikon amplop terbuka, ukurannya disesuaikan dengan desain baru
const MailOpenIcon = ({ className }: { className?: string }) => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M14 5.33317V11.9998C14 12.1767 13.9298 12.3462 13.8047 12.4712C13.6797 12.5963 13.5101 12.6665 13.3333 12.6665H2.66667C2.48986 12.6665 2.32029 12.5963 2.19526 12.4712C2.07024 12.3462 2 12.1767 2 11.9998V5.33317M14 5.33317L10.6667 8.66651M14 5.33317L8.69533 2.09117C8.48597 1.96321 8.24537 1.89551 8 1.89551C7.75463 1.89551 7.51403 1.96321 7.30467 2.09117L2 5.33317M2 5.33317L5.33333 8.66651M2.66667 11.9998L6.276 8.39051C6.52599 8.14044 6.86507 7.99992 7.21867 7.99984H8.78133C9.13493 7.99992 9.47401 8.14044 9.724 8.39051L13.3333 11.9998'
			stroke='white'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
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
	// Komponen ini telah diverifikasi ulang untuk memastikan akurasi dengan desain Figma.
	// Dengan perbaikan pada `layout.tsx`, komponen ini sekarang akan ditampilkan dengan benar
	// pada viewport desktop tanpa terkurung dalam frame mobile.
	return (
		<div className='relative min-h-screen w-full flex items-center justify-center text-primary-rose overflow-hidden font-alice bg-white'>
			{/* Background Image - Sama untuk mobile & desktop */}
			<Image
				src='/images/themes/classic-rose/opening/bg.png'
				alt='Background'
				fill
				className='z-0 object-cover'
				quality={90}
				priority
				onError={(e) =>
					(e.currentTarget.src =
						"https://placehold.co/1440x1024/FDF8F8/630718?text=Background")
				}
			/>

			{/* Decorative Flowers - Menggunakan absolute positioning */}
			{/* Bunga Kiri Atas */}
			<motion.div
				className='absolute -top-12 -left-28 w-64 h-96 md:-top-24 md:-left-28 md:w-[440px] md:h-[740px]'
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
			{/* Bunga Kanan Bawah */}
			<motion.div
				className='absolute -bottom-12 -right-28 w-64 h-96 md:-bottom-24 md:-right-28 md:w-[440px] md:h-[740px] transform rotate-180'
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

			{/* Main Content - Centered */}
			<motion.div
				className='relative z-10 flex flex-col items-center text-center p-8 w-full max-w-md md:max-w-xl'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 0.5 }}>
				<p className='text-[25px] md:text-[32px]'>We Are Getting Married</p>

				{/* Foto dengan Bingkai */}
				<div className='relative w-[290px] h-[290px] md:w-[456px] md:h-[456px] my-4'>
					{/* Bingkai Foto */}
					<div className='absolute inset-0 z-10'>
						<Image
							src='/images/themes/classic-rose/opening/bingkai.png'
							alt='Bingkai Foto'
							fill
							className='object-contain'
						/>
					</div>
					{/* Foto Pasangan (di dalam bingkai) */}
					{/* Padding diatur dengan persentase agar responsif dan akurat */}
					<div className='absolute inset-0 p-[14.8%]'>
						<div className='relative w-full h-full rounded-full overflow-hidden'>
							<Image
								src='/images/themes/classic-rose/opening/foto.png'
								alt='Foto Pasangan'
								fill
								className='object-cover'
							/>
						</div>
					</div>
				</div>

				{/* Nama Pasangan */}
				<h1 className='font-script text-[36px] leading-[45px] md:text-[48px] md:leading-[60px]'>
					{coupleNames}
				</h1>

				{/* Guest Name (jika ada) */}
				{guestName && (
					<div className='mt-8'>
						<p className='text-sm md:text-base'>Kepada Yth. Bapak/Ibu/Saudara/i</p>
						<p className='text-lg md:text-xl mt-1 font-semibold'>{guestName}</p>
					</div>
				)}

				{/* Teks Undangan */}
				<p className='text-xs md:text-base max-w-[324px] md:max-w-[440px] mt-4 leading-snug md:leading-normal'>
					Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari
					momen berharga kami.
				</p>

				{/* Tombol Buka Undangan */}
				<button
					onClick={onOpen}
					className='mt-8 bg-primary-rose text-white rounded-md flex items-center justify-center gap-2 px-8 py-3 md:px-12 md:py-4 hover:bg-opacity-90 transition-all shadow-lg'>
					<MailOpenIcon className='w-4 h-4 md:w-6 md:h-6' />
					{/* Menggunakan font-alice sebagai fallback jika Abhaya Libre tidak ada */}
					<span className='font-alice font-semibold text-sm md:text-xl'>
						Buka Undangan
					</span>
				</button>
			</motion.div>
		</div>
	);
};

export default OpeningSection;
