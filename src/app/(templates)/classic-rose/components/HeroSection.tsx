"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
	coupleNames: string;
	heroImage: string;
}

const HeroSection: React.FC<HeroProps> = ({ coupleNames, heroImage }) => {
	return (
		<section className='relative min-h-screen flex flex-col items-center justify-center text-center p-8 overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<Image
					src='/images/themes/classic-rose/bg-pattern.svg'
					alt='Background Pattern'
					layout='fill'
					objectFit='cover'
					className='opacity-50'
					onError={(e) => (e.currentTarget.style.display = "none")}
				/>
			</div>
			<motion.div
				className='relative z-10'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}>
				<p className='font-sans text-sm tracking-widest text-gray-600 mb-4'>
					Undangan Pernikahan
				</p>
				<div className='relative w-64 h-64 mx-auto mb-6'>
					<Image
						src='/images/themes/classic-rose/hero-frame.svg'
						alt='Frame'
						layout='fill'
						className='z-10'
						onError={(e) => (e.currentTarget.style.display = "none")}
					/>
					<div className='absolute inset-[10px] rounded-full overflow-hidden'>
						<Image
							src={heroImage}
							alt='Bima & Anisa'
							layout='fill'
							objectFit='cover'
							onError={(e) =>
								(e.currentTarget.src =
									"https://placehold.co/256x256/FDF8F8/5C4033?text=Foto+Pasangan")
							}
						/>
					</div>
				</div>
				<h1 className='font-serif text-5xl text-[#5C4033]'>
					{coupleNames.split("&")[0]}
				</h1>
				<h1 className='font-serif text-5xl text-[#5C4033]'>
					& {coupleNames.split("&")[1]}
				</h1>
				<div className='mt-8'>
					<p className='text-sm text-gray-500'>Kepada Yth. Bapak/Ibu/Saudara/i</p>
					<p className='text-lg font-bold text-gray-800 mt-1'>Nama Tamu</p>
				</div>
				<button className='mt-8 bg-[#8D6E63] text-white font-sans font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#795548] transition-colors'>
					Buka Undangan
				</button>
			</motion.div>
		</section>
	);
};
export default HeroSection;
