"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
	Eye,
	Bookmark,
	ExternalLink,
	Search,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

// --- Data & Asset Constants ---
const CATEGORIES = [
	"Semua",
	"Pernikahan",
	"Ulang Tahun",
	"Wisuda",
	"Khitanan",
	"Aqiqah",
	"Halal Bihalal",
	"Tahlilan",
];

const DUMMY_THEMES = Array.from({ length: 50 }, (_, i) => ({
	id: i + 1,
	imageSrc: `/images/landing/dummy/themes/contoh tema ${(i % 8) + 1}.jpeg`,
	title: `${CATEGORIES[(i % 7) + 1]} - #${i + 1}`,
	code: `${123456 + i}`,
	category: CATEGORIES[(i % 7) + 1],
}));

const COLORS = [
	"#FF5733",
	"#33FF57",
	"#3357FF",
	"#FF33A1",
	"#A133FF",
	"#33FFA1",
	"#FFC300",
	"#C70039",
];

const ITEMS_PER_PAGE = 8;

// --- Sub-Components ---
const Pagination: React.FC<{
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null;
	return (
		<div className='flex items-center justify-center gap-2 mt-12'>
			<button
            title="Halaman Sebelumnya"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='p-2 rounded-md bg-white shadow-sm disabled:opacity-50'>
				<ChevronLeft />
			</button>
			<span className='text-gray-600 font-medium'>
				Halaman {currentPage} dari {totalPages}
			</span>
			<button
            title="Halaman Selanjutnya"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='p-2 rounded-md bg-white shadow-sm disabled:opacity-50'>
				<ChevronRight />
			</button>
		</div>
	);
};

const ThemeSection: React.FC = () => {
	// State untuk mengelola tampilan (simple/expanded)
	const [isExpanded, setIsExpanded] = useState(false);
	const [activeCategory, setActiveCategory] = useState("Semua");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	// Logika filter yang lebih kompleks
	const filteredThemes = useMemo(() => {
		return DUMMY_THEMES.filter((theme) => {
			const matchesCategory =
				activeCategory === "Semua" || theme.category === activeCategory;
			const matchesSearch =
				theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				theme.code.includes(searchTerm);
			return matchesCategory && matchesSearch;
		});
	}, [activeCategory, searchTerm]);

	// Logika Paginasi
	const totalPages = Math.ceil(filteredThemes.length / ITEMS_PER_PAGE);
	const paginatedThemes = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		return filteredThemes.slice(startIndex, endIndex);
	}, [filteredThemes, currentPage]);

	// Reset ke halaman 1 setiap kali filter berubah
	React.useEffect(() => {
		setCurrentPage(1);
	}, [activeCategory, searchTerm]);

	return (
		<section id='tema' className='bg-gray-50 py-20 lg:py-32'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Section Header */}
				<motion.div
					className='text-center mb-12'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.6 }}>
					<h2 className='text-3xl lg:text-4xl font-extrabold text-gray-800'>
						{isExpanded ? (
							"Pilih Tema Yang Kamu Mau"
						) : (
							<>
								Berbagai Jenis <span className='text-blue-600'>Tema</span>
							</>
						)}
					</h2>
					<p className='mt-4 text-lg text-gray-500 max-w-3xl mx-auto'>
						{!isExpanded &&
							"Setiap momen memiliki jiwa dan ceritanya sendiri. Oleh karena itu, kami menghadirkan koleksi desain yang beragam untuk mewakili setiap gaya."}
					</p>
				</motion.div>

				{/* Filter Buttons */}
				<div className='flex flex-wrap justify-center gap-2 md:gap-3 mb-12'>
					{CATEGORIES.map((category) => (
						<button
							key={category}
							onClick={() => setActiveCategory(category)}
							className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors duration-300 ${
								activeCategory === category
									? "bg-blue-600 text-white shadow-md"
									: "bg-white text-gray-700 hover:bg-gray-200"
							}`}>
							{category}
						</button>
					))}
				</div>

				{/* Expanded View Controls (Search and Color) */}
				<AnimatePresence>
					{isExpanded && (
						<motion.div
							className='max-w-2xl mx-auto mb-12'
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}>
							<div className='relative mb-4'>
								<input
									type='text'
									placeholder='Cari tema (contoh: Aquatic atau 123456)'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
								/>
								<Search
									className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
									size={20}
								/>
							</div>
							<div className='flex items-center gap-3'>
								<p className='text-sm font-semibold text-gray-600'>
									Pilih Warna Yang Kamu Suka:
								</p>
								<div className='flex gap-2'>
									{COLORS.map((color) => (
										<button
                                        title="Pilih Warna"
											key={color}
											style={{ backgroundColor: color }}
											className='w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform'></button>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Themes Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
					{paginatedThemes.map((theme, index) => (
						<motion.div
							key={theme.id}
							className='bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col'
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.5, delay: index * 0.05 }}>
							<div className='relative w-full aspect-[3/4]'>
								<Image
									src={theme.imageSrc}
									alt={theme.title}
									fill
									className='object-cover group-hover:scale-105 transition-transform duration-300'
									onError={(e) =>
										(e.currentTarget.src = `https://placehold.co/300x400/CCCCCC/333?text=${theme.title}`)
									}
								/>
							</div>
							<div className='p-4 flex flex-col flex-grow'>
								<div className='flex justify-between items-center mb-4'>
									<p className='text-sm font-semibold text-gray-700'>
										{theme.title} ({theme.code})
									</p>
									<a href='#' title='Lihat di halaman baru'>
										<ExternalLink className='w-4 h-4 text-gray-400 hover:text-blue-600' />
									</a>
								</div>
								<div className='mt-auto flex items-center gap-2'>
									<button className='flex-grow flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-3 rounded-full text-sm transition-colors'>
										<Eye className='w-4 h-4' />
										Preview
									</button>
									<button
										className='flex-shrink-0 bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-colors'
										title='Simpan tema'>
										<Bookmark className='w-5 h-5' />
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Conditional Button or Pagination */}
				{isExpanded ? (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				) : (
					<div className='text-center mt-16'>
						<button
							onClick={() => setIsExpanded(true)}
							className='bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105 shadow-lg'>
							Tampilkan Tema Lainnya
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default ThemeSection;
