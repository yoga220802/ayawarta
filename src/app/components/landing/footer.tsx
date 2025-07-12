"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

// --- Data & Asset Constants ---
const CONTACT_INFO = [
	{
		icon: <MapPin className='w-5 h-5 text-white/80' />,
		text:
			"Jl. Mayor Syamsu No.1, Jayaraga, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat, INDONESIA 44151",
	},
	{
		icon: <Phone className='w-5 h-5 text-white/80' />,
		text: "+62 xxx xxxx xxxx",
	},
	{
		icon: (
			<div className='relative w-5 h-5'>
				<Image
					src='/images/landing/icons/mail.svg'
					alt='Mail Icon'
					fill
					className='object-contain'
				/>
			</div>
		),
		text: "ayawarta123@gmail.com",
	},
];

const SOCIAL_LINKS = [
	{
		name: "Instagram",
		icon: "/images/landing/icons/instagram.svg",
		href: "#",
	},
	{
		name: "Facebook",
		icon: "/images/landing/icons/facebook.svg",
		href: "#",
	},
	{
		name: "TikTok",
		icon: "/images/landing/icons/tiktok.svg",
		href: "#",
	},
	{
		name: "Email",
		icon: "/images/landing/icons/mail.svg",
		href: "#",
	},
];

const Footer: React.FC = () => {
	return (
		<footer id='tentang' className='relative bg-gray-50'>
			<div className='absolute inset-0 w-full h-full'>
				<Image
					src='/images/landing/BG footer.svg'
					alt='Footer background'
					fill
					className='object-cover'
					onError={(e) =>
						(e.currentTarget.src =
							"https://placehold.co/1920x1080/0D285B/FFFFFF?text=Footer+BG")
					}
				/>
			</div>

			<div className='relative z-10 container mx-auto px-8 pt-48 pb-16 text-white'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
					{/* Column 1: Brand & About */}
					<div className='md:col-span-2 lg:col-span-1'>
						<h2 className='text-3xl font-bold'>AyaWarta</h2>
						<p className='mt-1 text-white/80'>Undangan Digital, Semudah Bercerita</p>
						<h3 className='font-bold text-xl mt-10 mb-4'>Tentang Kami</h3>
						<p className='text-sm text-white/80 leading-relaxed'>
							Setiap perayaan, entah itu penyatuan dua hati, sebuah pencapaian baru,
							atau syukuran sederhana, adalah sebuah babak baru yang penuh makna. Kami
							di Ayawarta terinspirasi oleh keindahan momen-momen ini.
						</p>
						<p className='mt-4 text-sm text-white/80 leading-relaxed'>
							Kami bertanya pada diri kami sendiri: bagaimana jika sebuah kabar bahagia
							dapat dibagikan dengan cara yang sama indahnya seperti perasaan yang
							menyertainya? Bagaimana jika teknologi bisa membantu kita untuk tidak
							hanya memberi informasi, tetapi juga berbagi cerita.
						</p>
					</div>

					{/* Column 2: Kontak */}
					<div className='lg:pl-8'>
						<h3 className='font-bold text-xl mb-6'>Kontak</h3>
						<ul className='space-y-4'>
							{CONTACT_INFO.map((item, index) => (
								<li key={index} className='flex items-start gap-4'>
									<span className='flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center'>
										{item.icon}
									</span>
									<span className='text-sm text-white/80'>{item.text}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Column 3: Ikuti Kami */}
					<div>
						<h3 className='font-bold text-xl mb-6'>Ikuti Kami</h3>
						<div className='flex items-center gap-3'>
							{SOCIAL_LINKS.map((social) => (
								<a
									key={social.name}
									href={social.href}
									title={social.name}
									className='bg-white text-[#0D285B] p-3 rounded-full hover:bg-gray-200 hover:scale-110 transition-all duration-300'>
									<div className='relative w-6 h-6'>
										<Image
											src={social.icon}
											alt={`${social.name} Icon`}
											fill
											className='object-contain'
										/>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='relative z-10 border-t border-white/10 mt-16'>
				<p className='text-center text-sm text-white/50 py-6'>
					© {new Date().getFullYear()} AyaWarta. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
