"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

interface Person {
	name: string;
	parents: string;
	instagram: string;
	photo: string;
}

interface CoupleProps {
	groom: Person;
	bride: Person;
}

const PersonCard: React.FC<{ person: Person; align: "left" | "right" }> = ({
	person,
	align,
}) => (
	<motion.div
		className='text-center'
		initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
		whileInView={{ opacity: 1, x: 0 }}
		transition={{ duration: 0.8 }}
		viewport={{ once: true }}>
		<div className='relative w-40 h-40 mx-auto mb-4'>
			<Image
				src={person.photo}
				alt={person.name}
				layout='fill'
				className='rounded-full object-cover'
				onError={(e) =>
					(e.currentTarget.src = `https://placehold.co/160x160/FDF8F8/5C4033?text=${
						person.name.split(" ")[0]
					}`)
				}
			/>
		</div>
		{/* FIX: Mengganti `font-serif` menjadi `font-script` (Alex Brush) untuk nama */}
		<h3 className='font-script text-4xl text-[#5C4033]'>{person.name}</h3>
		{/* FIX: Mengganti `font-sans` menjadi `font-body-alt` (Manrope) untuk detail */}
		<p className='font-body-alt text-sm mt-2 text-gray-600'>{person.parents}</p>
		<a
			href={`https://instagram.com/${person.instagram}`}
			target='_blank'
			rel='noopener noreferrer'
			className='font-body-alt inline-flex items-center gap-2 mt-3 text-sm text-[#8D6E63] hover:text-[#5C4033]'>
			<Instagram size={16} />
			<span>@{person.instagram}</span>
		</a>
	</motion.div>
);

const CoupleSection: React.FC<CoupleProps> = ({ groom, bride }) => {
	return (
		<section className='py-20 bg-[#FDF8F8] text-center'>
			<div className='container mx-auto px-8'>
				{/* FIX: Mengganti `font-serif` menjadi `font-alice` */}
				<p className='font-alice text-xl italic text-gray-700 mb-4'>
					بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
				</p>
				{/* FIX: Menggunakan `font-body-alt` untuk teks paragraf */}
				<p className='max-w-2xl mx-auto text-gray-600 font-body-alt'>
					Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang
					Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12 max-w-4xl mx-auto'>
					<PersonCard person={groom} align='left' />
					<PersonCard person={bride} align='right' />
				</div>
			</div>
		</section>
	);
};
export default CoupleSection;
