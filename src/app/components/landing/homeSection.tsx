"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
			className='relative w-full min-h-screen bg-[#F3F6FD] overflow-hidden'>
			{/* Background Blue Shape */}
			<motion.div
				className='absolute bottom-0 right-0 w-full md:w-4/5 h-[300px] md:h-[520px] z-0'
				initial={{ x: 200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}>
				<Image
					src={ASSETS.bgBlue || "/placeholder.svg"}
					alt='Background Biru'
					fill
					className='object-contain object-right'
				/>
			</motion.div>

			{/* Main Content Container */}
			<div className='relative z-10 container mx-auto px-4 sm:px-8 lg:px-24 pt-20 md:pt-36 h-screen flex items-start'>
				<div className='w-full grid lg:grid-cols-2 gap-8 items-start'>
					{/* Left Content - Text and Buttons */}
					<motion.div
						className='relative mt-4 md:mt-8 ml-0 md:ml-6 lg:ml-12 text-center lg:text-left lg:top-10 lg:left-30'
						variants={containerVariants}
						initial='hidden'
						animate='visible'>
						{/* Title with Images */}
						<motion.h1
							className='flex items-end justify-center lg:justify-start mb-4'
							variants={itemVariants}>
							<div className='h-[35px] sm:h-[45px] md:h-[55px] aspect-[2.5/1] relative'>
								<Image
									src={ASSETS.undanganTextImg || "/placeholder.svg"}
									alt='Undangan'
									fill
									className='object-contain'
								/>
							</div>
							<div className='h-[45px] sm:h-[55px] md:h-[70px] aspect-[2.5/1] relative -mb-1'>
								<Image
									src={ASSETS.digitalTextImg || "/placeholder.svg"}
									alt='Digital'
									fill
									className='object-contain'
								/>
							</div>
						</motion.h1>

						{/* Description */}
						<motion.p
							className='mt-4 mb-8 text-sm sm:text-base md:text-lg text-gray-600 max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0 leading-relaxed'
							variants={itemVariants}>
							Bagikan kabar bahagia mu melalui undangan digital yang didesain untuk
							menyentuh hati dan memukau setiap tamu.
						</motion.p>

						{/* Buttons */}
						<motion.div
							className='flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center lg:justify-start'
							variants={itemVariants}>
							<motion.button
								className='flex items-center justify-center w-[180px] sm:w-[200px] h-[48px] sm:h-[56px] shadow-[0px_0px_70px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity text-white font-extrabold text-lg sm:text-2xl rounded-2xl'
								style={{
									background:
										"linear-gradient(90deg, rgba(2,100,255,1) 0%, rgba(1,76,196,1) 100%)",
									borderRadius: "12px",
									color: "white",
									fontWeight: "bold",
								}}
								whileHover={{ scale: 1.05, y: -5 }}
								whileTap={{ scale: 0.95 }}>
								Selengkapnya
							</motion.button>
							<motion.button
								className='flex items-center justify-center w-[180px] sm:w-[200px] h-[48px] sm:h-[56px] bg-white text-gray-800 shadow-[0px_0px_70px_rgba(0,0,0,0.25)] hover:bg-gray-100 transition-colors gap-2 sm:gap-3 font-extrabold text-lg sm:text-2xl rounded-2xl'
								style={{
									borderRadius: "12px",
									fontWeight: "bold",
								}}
								whileHover={{ scale: 1.05, y: -5 }}
								whileTap={{ scale: 0.95 }}>
								<MessageCircle size={18} className='sm:w-5 sm:h-5' /> Hubungi Kami
							</motion.button>
						</motion.div>
					</motion.div>
				</div>
			</div>

			{/* Phone Mockup - Right Side */}
			<motion.div
				className='absolute top-0 right-0 h-full w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] flex items-center pointer-events-none'
				initial={{ x: 200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>
				<div className='relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] pointer-events-auto'>
					{/* Hand holding phone image */}
					<div className='absolute inset-0 z-20 pointer-events-none'>
						<Image
							src={ASSETS.handPhone || "/placeholder.svg"}
							alt='Hand holding phone'
							fill
							className='object-contain'
						/>
					</div>

					{/* Phone screen with slider */}
					<div className='absolute w-[120px] sm:w-[140px] md:w-[170px] lg:w-[190px] h-[260px] sm:h-[300px] md:h-[370px] lg:h-[409px] top-1/2 left-[32.5%] -translate-x-1/2 -translate-y-[75%] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] overflow-hidden bg-gray-200 shadow-inner z-10'>
						<AnimatePresence initial={false}>
							<motion.div
								key={currentSlide}
								className='absolute inset-0 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] overflow-hidden'
								initial={{ opacity: 0, x: "100%" }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: "-100%" }}
								transition={{ duration: 0.6, ease: "easeInOut" }}>
								<Image
									src={ASSETS.sliderImages[currentSlide] || "/placeholder.svg"}
									alt={`Contoh Desain ${currentSlide + 1}`}
									fill
									className='object-contain p-1'
								/>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Navigation buttons */}
					<button
						onClick={prevSlide}
						className='absolute left-[-10px] sm:left-[-15px] md:left-[-20px] top-1/2 -translate-y-1/2 bg-white/60 p-1.5 sm:p-2 rounded-full text-gray-800 hover:bg-white transition-colors shadow-md z-30 pointer-events-auto'
						aria-label='Previous Slide'>
						<ChevronLeft size={18} className='sm:w-6 sm:h-6' />
					</button>
					<button
						onClick={nextSlide}
						className='absolute right-[-10px] sm:right-[-15px] md:right-[-20px] top-1/2 -translate-y-1/2 bg-white/60 p-1.5 sm:p-2 rounded-full text-gray-800 hover:bg-white transition-colors shadow-md z-30 pointer-events-auto'
						aria-label='Next Slide'>
						<ChevronRight size={18} className='sm:w-6 sm:h-6' />
					</button>
				</div>
			</motion.div>

			{/* User testimonial at bottom */}
			<div className='absolute bottom-0 right-0 w-full md:w-4/5 h-[300px] md:h-[520px] z-0 pointer-events-none'>
				<div className='absolute bottom-[100px] sm:bottom-[120px] md:bottom-[120px] left-4 sm:left-8 md:left-16 flex items-center gap-3 sm:gap-4'>
					<div className='flex -space-x-2 sm:-space-x-3'>
						{ASSETS.userAvatars.map((avatar, index) => (
							<Image
								key={index}
								src={avatar || "/placeholder.svg"}
								alt={`User ${index + 1}`}
								width={32}
								height={32}
								className='w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm'
							/>
						))}
					</div>
					<p className='text-white text-xs sm:text-sm font-medium'>
						Telah digunakan lebih dari <br />
						<span className='font-bold'>5rb Pengguna</span> 👑
					</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
