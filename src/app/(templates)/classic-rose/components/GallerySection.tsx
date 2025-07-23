"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryProps {
	images: string[];
}

const GallerySection: React.FC<GalleryProps> = ({ images }) => {
	return (
		<section className='py-20 bg-[#FDF8F8]'>
			<div className='container mx-auto px-8 text-center'>
				<h2 className='font-serif text-4xl text-[#5C4033] mb-12'>
					Momen Indah Kami
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
					{images.map((src, index) => (
						<motion.div
							key={index}
							className='relative aspect-square rounded-lg overflow-hidden shadow-lg'
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}>
							<Image
								src={src}
								alt={`Gallery image ${index + 1}`}
								layout='fill'
								objectFit='cover'
								onError={(e) =>
									(e.currentTarget.src = `https://placehold.co/400x400/FDF8F8/5C4033?text=Momen+Indah+${
										index + 1
									}`)
								}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
export default GallerySection;
