"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// --- Data & Asset Constants ---
const DUMMY_TESTIMONIALS = [
	{
		name: "Joel & Ellie",
		category: "Pernikahan",
		rating: 5,
		text:
			"Jujur, urusan undangan ini hampir bikin kami berantem, haha. Stres banget bolak-balik percetakan. Pas nemu platform ini, wah... rasanya kayak nemu harta karun. Gak ada lagi drama revisi. Paling seneng pas liat ucapan dari teman-teman di buku tamu digitalnya, jadi bisa dibaca-baca ulang sambil senyum-senyum sendiri. Sumpah, worth it banget.",
		imageSrc: "/images/landing/dummy/testimony/contoh testimoni 1.jpeg",
	},
	{
		name: "Hendra",
		category: "Khitanan",
		rating: 5,
		text:
			"Saya bukan orang yang ngerti-ngerti banget teknologi, tapi buat acara syukuran khitanan anak, saya mau yang praktis. Ternyata pakai ini gampang banget. Tinggal klik-klik, isi info, sebar link ke grup keluarga, selesai. Gak ada lagi pertanyaan 'Acaranya di mana?' atau 'Jam berapa?' berulang-ulang di WhatsApp. Bikin kepala adem.",
		imageSrc: "/images/landing/dummy/testimony/contoh testimoni 2.jpeg",
	},
	{
		name: "Citra",
		category: "Wisuda",
		rating: 4,
		text:
			"Mau wisuda, pengen undang temen-temen tapi budget pas-pasan, hehe. Iseng nyoba yang paket standar di sini, kaget banget! Desainnya kekinian, gak kelihatan murahan sama sekali. Temen-temenku pada muji undangannya, dikira aku jago desain. Padahal tinggal chat miminya sama isi formulir doang.",
		imageSrc: "/images/landing/dummy/testimony/contoh testimoni 3.jpeg",
	},
];
// Komponen kecil untuk menampilkan bintang rating
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
	<div className='flex items-center gap-1'>
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
			/>
		))}
	</div>
);

const TestimonialSection: React.FC = () => {
	return (
		<section id='testimoni' className='bg-gray-50 py-20 lg:py-32'>
			<div className='container mx-auto'>
				{/* Section Header */}
				<motion.div
					className='text-center mb-12 lg:mb-16 px-4'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.6 }}>
					<h2 className='text-3xl lg:text-4xl font-extrabold text-gray-800'>Testimoni</h2>
					<p className='mt-4 text-lg text-gray-500 max-w-2xl mx-auto'>
						Intip beberapa kesan dari para pengguna yang telah merayakan momen istimewanya bersama kami.
					</p>
				</motion.div>

				{/* Testimonials Horizontal Scroll */}
				<div className='flex overflow-x-auto space-x-8 pb-8 -mx-4 px-4 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-6 lg:scroll-pl-8'>
					{DUMMY_TESTIMONIALS.map((testi, index) => (
						<motion.div
							key={index}
							className='flex-shrink-0 w-[85vw] sm:w-[350px] aspect-[9/12] rounded-3xl shadow-xl overflow-hidden relative snap-center'
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Gambar sebagai background utama */}
                            <Image
                                src={testi.imageSrc}
                                alt={testi.name}
                                fill
                                className='object-cover'
                                onError={(e) => e.currentTarget.src = 'https://placehold.co/350x467/CCCCCC/333?text=Testimoni'}
                            />
                            
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/80 backdrop-blur-[10px] rounded-2xl p-4 shadow-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className='font-bold text-lg text-gray-900'>{testi.name}</h3>
                                            <p className='text-xs text-gray-600'>{testi.category}</p>
                                        </div>
                                        <StarRating rating={testi.rating} />
                                    </div>
                                    <p className='text-xs text-gray-700 leading-relaxed'>
                                        {testi.text}
                                    </p>
                                </div>
                            </div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialSection;