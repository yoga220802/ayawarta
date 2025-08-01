"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- SVG Icons ---
const PlayIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='currentColor'
		xmlns='http://www.w3.org/2000/svg'>
		<path d='M8 5v14l11-7z' />
	</svg>
);

// --- Interfaces ---
interface GalleryData {
	videoUrl: string;
	images: string[];
}

interface LoveStory {
	title: string;
	content: string;
}

interface GallerySectionProps {
	gallery: GalleryData;
	loveStory: LoveStory[];
}

// --- Sub-Components ---
const TitleDivider: React.FC = () => (
	<div className='relative w-20 h-4'>
		<Image
			src='/images/themes/classic-rose/divider.png'
			alt='Divider'
			fill
			className='object-contain'
		/>
	</div>
);

// --- Main Component ---
const GallerySection: React.FC<GallerySectionProps> = ({
	gallery,
	loveStory,
}) => {
	// State untuk mengontrol tampilan video embed
	const [playVideo, setPlayVideo] = useState(false);

	// Fungsi untuk mengubah URL YouTube biasa menjadi URL embed
	const getEmbedUrl = (url: string) => {
		const videoId = url.split("v=")[1]?.split("&")[0];
		return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
	};

	return (
		<section className='relative py-20 md:py-32 bg-[#FDF8F8] overflow-hidden'>
			{/* Latar Belakang dan Dekorasi */}
			<div className='absolute inset-0 z-0'>
				<Image
					src='/images/themes/classic-rose/opening/bg.png'
					alt='Background'
					fill
					className='object-cover'
				/>
				{/* FIX: Posisi bunga kanan atas */}
				<div className='absolute -top-20 -right-20 w-80 h-80 md:w-[400px] md:h-[400px] transform -scale-x-100'>
					<Image
						src='/images/themes/classic-rose/opening/bunga.png'
						alt='Bunga Kanan Atas'
						fill
						className='object-contain'
					/>
				</div>
				{/* FIX: Posisi bunga kiri bawah */}
				<div className='absolute -bottom-20 -left-20 w-80 h-80 md:w-[400px] md:h-[400px] transform -scale-y-100'>
					<Image
						src='/images/themes/classic-rose/opening/bunga.png'
						alt='Bunga Kiri Bawah'
						fill
						className='object-contain'
					/>
				</div>
			</div>

			{/* Konten Utama */}
			<div className='relative z-10 container mx-auto px-4 sm:px-8 max-w-md flex flex-col items-center gap-10'>
				{/* Galeri Foto & Video */}
				<motion.div
					className='w-full p-4 text-center text-primary-rose bg-white/60 backdrop-blur-sm rounded-2xl'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<div className='flex items-center justify-center gap-4'>
						<TitleDivider />
						<h2 className='font-alice text-xl'>Momen Indah Kami</h2>
						<div className='transform -scale-x-100'>
							<TitleDivider />
						</div>
					</div>
					<p className='font-alice text-base mt-2'>The Memorable Wedding Gallery</p>

					{/* Grid Foto Collage */}
					<div className='grid grid-cols-3 grid-rows-4 gap-2 mt-6 h-[500px]'>
						{/* FIX: Logika untuk embed video */}
						<div className='col-span-3 row-span-2 relative rounded-lg overflow-hidden group bg-black'>
							{!playVideo ? (
								<>
									<Image
										src={gallery.images[0]}
										alt='Video Thumbnail'
										fill
										className='object-cover group-hover:scale-105 transition-transform duration-300'
									/>
									<div
										className='absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer'
										onClick={() => setPlayVideo(true)}>
										<PlayIcon className='w-16 h-16 text-white/80 drop-shadow-lg' />
									</div>
								</>
							) : (
								<iframe
									src={getEmbedUrl(gallery.videoUrl)}
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									allowFullScreen
									className='w-full h-full'></iframe>
							)}
						</div>

						{/* Foto-foto lainnya */}
						<div className='col-span-1 row-span-1 relative rounded-lg overflow-hidden'>
							<Image
								src={gallery.images[1]}
								alt='Gallery 2'
								fill
								className='object-cover'
							/>
						</div>
						<div className='col-span-2 row-span-1 relative rounded-lg overflow-hidden'>
							<Image
								src={gallery.images[2]}
								alt='Gallery 3'
								fill
								className='object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-1 relative rounded-lg overflow-hidden'>
							<Image
								src={gallery.images[3]}
								alt='Gallery 4'
								fill
								className='object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-1 relative rounded-lg overflow-hidden'>
							<Image
								src={gallery.images[4]}
								alt='Gallery 5'
								fill
								className='object-cover'
							/>
						</div>
						<div className='col-span-1 row-span-1 relative rounded-lg overflow-hidden'>
							<Image
								src={gallery.images[5]}
								alt='Gallery 6'
								fill
								className='object-cover'
							/>
						</div>
					</div>
				</motion.div>

				{/* Kisah Kami */}
				<motion.div
					className='w-full p-6 text-center text-primary-rose bg-white/60 backdrop-blur-sm rounded-2xl'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}>
					<div className='flex items-center justify-center gap-4'>
						<TitleDivider />
						<h2 className='font-alice text-xl'>Kisah Kami</h2>
						<div className='transform -scale-x-100'>
							<TitleDivider />
						</div>
					</div>
					<div className='mt-6 space-y-6'>
						{loveStory.map((story) => (
							<div key={story.title}>
								<h3 className='font-alice text-lg font-semibold'>{story.title}</h3>
								<p className='font-alice text-sm text-justify mt-2'>{story.content}</p>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default GallerySection;
