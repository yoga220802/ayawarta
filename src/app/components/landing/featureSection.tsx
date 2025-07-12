"use client";

import type React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
	Clock,
	Gift,
	Users,
	MessageSquareQuote,
	CalendarDays,
	MapPin,
} from "lucide-react";

// --- Data & Asset Constants ---
const FEATURES_DATA = [
	{
		icon: <Clock size={32} className='text-white' />,
		title: "Hitung mundur waktu",
		description:
			"Tampilkan waktu hitung mundur agar acaramu semakin ditunggu-tunggu.",
	},
	{
		icon: <Gift size={32} className='text-white' />,
		title: "Kirim kado",
		description: "Tamu bisa mengirimkan hadiah digital dengan mudah.",
	},
	{
		icon: <Users size={32} className='text-white' />,
		title: "Unlimited tamu",
		description:
			"Undang semua orang penting tanpa pusing mikirin batasan jumlah tamu.",
	},
	{
		icon: <MessageSquareQuote size={32} className='text-white' />,
		title: "Ucapan Digital",
		description:
			"Abadikan setiap doa dan ucapan dari tamu pada buku tamu online.",
	},
	{
		icon: <CalendarDays size={32} className='text-white' />,
		title: "Rangkaian Acara",
		description: "Pastikan semua tamu hadir di momen yang tepat.",
	},
	{
		icon: <MapPin size={32} className='text-white' />,
		title: "Peta Lokasi",
		description: "Bantu tamu menemukan lokasi acaramu tanpa takut nyasar.",
	},
];

const ASSETS = {
	phoneFeature: "/images/landing/feature-phone.png",
	bgBlueFeature: "/images/landing/bg-blue-features.png",
};

const FeatureSection: React.FC = () => {
	return (
		<section id='fitur' className='bg-white py-20 lg:py-32'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<motion.div
					className='text-center mb-12 lg:mb-16'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.6 }}>
					<h2 className='text-3xl lg:text-4xl font-extrabold text-gray-800'>
						Fitur-Fitur untuk Momen Terbaikmu
					</h2>
					<p className='mt-4 text-lg text-gray-500 max-w-3xl mx-auto'>
						Di sini, kamu pilih bisa desain, sebar undangan, dan lihat siapa aja yang
						datang, semuanya dari satu tempat.
					</p>
				</motion.div>

				{/* Main Content Grid */}
				<div className='relative flex justify-center items-center'>
					{/* Phone Mockup */}
					{/* Disembunyikan di mobile, muncul di layar besar */}
					<motion.div
						className='hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] z-20'
						initial={{ opacity: 0, x: -100, rotate: -15 }}
						whileInView={{ opacity: 1, x: 0, rotate: -10 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, ease: "easeOut" }}>
						<Image
							src={ASSETS.phoneFeature}
							alt='Fitur Undangan di HP'
							fill
							className='object-contain'
							onError={(e) =>
								(e.currentTarget.src =
									"https://placehold.co/300x600/transparent/333?text=Phone")
							}
						/>
					</motion.div>

					{/* Blue Features Box */}
					<motion.div
						className='relative w-full max-w-5xl rounded-[40px] p-8 md:p-12 lg:pl-48 z-10'
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.7, ease: "easeOut" }}>
						{/* Background Image for the box */}
						<Image
							src={ASSETS.bgBlueFeature}
							alt='Background Fitur'
							fill
							className='object-cover rounded-[40px] -z-10'
							onError={(e) =>
								(e.currentTarget.src =
									"https://placehold.co/1024x600/2563EB/FFFFFF?text=Features")
							}
						/>

						{/* Features Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
							{FEATURES_DATA.map((feature, index) => (
								<motion.div
									key={index}
									className='flex items-start gap-4'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.5 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}>
									<div className='flex-shrink-0 bg-white/20 rounded-lg p-3'>
										{feature.icon}
									</div>
									<div>
										<h3 className='font-bold text-lg text-white'>{feature.title}</h3>
										<p className='text-white/80 mt-1'>{feature.description}</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default FeatureSection;
