"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

const ASSETS = {
	bgBlue: "/images/landing/BG Blue.png",
	handPhone: "/images/landing/Holding handphone.png",
	undanganTextImg: "/images/landing/Undangan.png", // Gambar untuk teks "Undangan"
	digitalTextImg: "/images/landing/Digital.png",
	sliderImages: [
		"/images/slider/slide1.png",
		"/images/slider/slide2.png",
		"/images/slider/slide3.jpg",
	],
	userAvatars: [
		"https://i.pravatar.cc/40?img=1",
		"https://i.pravatar.cc/40?img=2",
		"https://i.pravatar.cc/40?img=3",
	],
};

const HeroSection: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) =>
			prev === ASSETS.sliderImages.length - 1 ? 0 : prev + 1
		);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) =>
			prev === 0 ? ASSETS.sliderImages.length - 1 : prev - 1
		);
	};

	useEffect(() => {
		const slideInterval = setInterval(nextSlide, 5000);
		return () => clearInterval(slideInterval);
	}, []);

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2 },
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
	};

	return (
		<section
			id='home'
			className='relative w-full min-h-screen bg-[#F3F6FD] overflow-x-hidden'>
			<motion.div
				className='absolute bottom-0 right-0 w-4/5 h-[520px] z-0'
				initial={{ x: 200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}>
				<Image
					src={ASSETS.bgBlue}
					alt='Background Biru'
					fill
					className='object-contain object-right'
				/>
			</motion.div>
			<div className='relative z-10 container mx-auto px-24 pt-36 h-screen flex items-start'>
				<div className='w-full grid md:grid-cols-2 gap-8 items-start'>
					{/* REVISI: Posisi digeser 20px lagi ke kanan (total 40px) */}
					<motion.div
						className='relative top-10 left-30 text-left mt-8 ml-12'
						variants={containerVariants}
						initial='hidden'
						animate='visible'>
						<motion.h1 className='flex items-end' variants={itemVariants}>
							<div className='h-[55px] aspect-[2.5/1] relative'>
								<Image
									src={ASSETS.undanganTextImg}
									alt='Undangan'
									fill
									className='object-contain'
								/>
							</div>
							<div className='h-[70px] aspect-[2.5/1] relative -mb-1'>
								<Image
									src={ASSETS.digitalTextImg}
									alt='Digital'
									fill
									className='object-contain'
								/>
							</div>
						</motion.h1>
						{/* REVISI: Ukuran div deskripsi diperpanjang */}
						<motion.p
							className='mt-4 mb-8 text-base md:text-lg text-gray-600 max-w-lg'
							variants={itemVariants}>
							Bagikan kabar bahagia mu melalui undangan digital yang didesain untuk
							menyentuh hati dan memukau setiap tamu.
						</motion.p>
						<motion.div
							className='flex flex-col sm:flex-row gap-5'
							variants={itemVariants}>
							<motion.button
								className='flex items-center justify-center w-[200px] h-[56px] shadow-[0px_0px_70px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity'
								style={{
									background:
										"linear-gradient(90deg, rgba(2,100,255,1) 0%, rgba(1,76,196,1) 100%)",
									color: "white",
									borderRadius: "10px",
									fontSize: "20px",
									fontWeight: "bold",
								}}
								whileHover={{ scale: 1.05, y: -5 }}
								whileTap={{ scale: 0.95 }}>
								Selengkapnya
							</motion.button>
							<motion.button
								className='flex items-center justify-center w-[200px] h-[56px] bg-white text-gray-800 shadow-[0px_0px_70px_rgba(0,0,0,0.25)] hover:bg-gray-100 transition-colors gap-3'
								style={{ borderRadius: "10px", fontSize: "20px", fontWeight: "bold" }}
								whileHover={{ scale: 1.05, y: -5 }}
								whileTap={{ scale: 0.95 }}>
								<MessageCircle size={20} /> Hubungi Kami
							</motion.button>
						</motion.div>
					</motion.div>
				</div>
			</div>
			<motion.div
				className='absolute top-0 right-0 h-full w-[450px] flex items-center pointer-events-none'
				initial={{ x: 200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>
				<div className='relative w-full h-[750px] pointer-events-auto'>
					<div className='absolute inset-0 z-20 pointer-events-none'>
						<Image
							src={ASSETS.handPhone}
							alt='Hand holding phone'
							fill
							className='object-contain'
						/>
					</div>
					<div className='absolute w-[190px] h-[409px] top-1/2 left-[32.5%] -translate-x-1/2 -translate-y-[75%] rounded-[30px] overflow-hidden bg-gray-200 shadow-inner z-10'>
						<AnimatePresence initial={false}>
							<motion.div
								key={currentSlide}
								className='absolute inset-0 rounded-[30px] overflow-hidden'
								initial={{ opacity: 0, x: "100%" }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: "-100%" }}
								transition={{ duration: 0.6, ease: "easeInOut" }}>
								<Image
									src={ASSETS.sliderImages[currentSlide]}
									alt={`Contoh Desain ${currentSlide + 1}`}
									fill
									className='object-contain p-1'
								/>
							</motion.div>
						</AnimatePresence>
					</div>
					<button
						onClick={prevSlide}
						className='absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full text-gray-800 hover:bg-white transition-colors shadow-md z-30 pointer-events-auto'
						aria-label='Previous Slide'>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={nextSlide}
						className='absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/60 p-2 rounded-full text-gray-800 hover:bg-white transition-colors shadow-md z-30 pointer-events-auto'
						aria-label='Next Slide'>
						<ChevronRight size={24} />
					</button>
				</div>
			</motion.div>
			<div className='absolute bottom-0 right-0 w-4/5 h-[520px] z-0 pointer-events-none'>
				<div className='absolute bottom-[120px] left-8 md:left-16 flex items-center gap-4'>
					<div className='flex -space-x-3'>
						{ASSETS.userAvatars.map((avatar, index) => (
							<Image
								key={index}
								src={avatar}
								alt={`User ${index + 1}`}
								width={40}
								height={40}
								className='rounded-full border-2 border-white'
							/>
						))}
					</div>
					<p className='text-white text-sm font-medium'>
						Telah digunakan lebih dari <br />{" "}
						<span className='font-bold'>5rb Pengguna</span> 👑
					</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
