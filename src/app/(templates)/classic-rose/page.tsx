"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Impor semua komponen section
import OpeningSection from "./components/OpeningSection";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import CoupleSection from "./components/CoupleSection";
import EventSection from "./components/EventSection";
import GallerySection from "./components/GallerySection";

// Data dummy untuk seluruh undangan.
const invitationData = {
	groom: {
		name: "Bima Mahendra",
		parents: "Putra Pertama dari Pasangan Ayah Bima & Ibu Bima",
		instagram: "satriabaja_hitam",
		photo: "/images/themes/classic-rose/groom.jpg",
	},
	bride: {
		name: "Anisa Putri",
		parents: "Putri Pertama dari Pasangan Ayah Anisa & Ibu Anisa",
		instagram: "cewenyabimaowo",
		photo: "/images/themes/classic-rose/bride.jpg",
	},
	heroImage: "/images/themes/classic-rose/opening/foto.png",
	weddingDate: new Date("2025-02-28T08:00:00"),
	events: [
		{
			name: "Akad Nikah",
			date: "28 Februari 2025",
			time: "08:00 WIB - selesai",
			location: "Graha Intan Balarea",
			address:
				"Jl. Patriot No.12-14, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151",
			mapLink: "https://maps.app.goo.gl/rCpzs7gD7iHPNQU59",
		},
		{
			name: "Resepsi",
			date: "28 Februari 2025",
			time: "10:00 WIB - selesai",
			location: "Graha Intan Balarea",
			address:
				"Jl. Patriot No.12-14, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151",
			mapLink: "https://maps.app.goo.gl/rCpzs7gD7iHPNQU59",
		},
	],
	gallery: [
		"/images/themes/classic-rose/photo sample.jpg",
		"/images/themes/classic-rose/photo sample.jpg",
		"/images/themes/classic-rose/photo sample.jpg",
		"/images/themes/classic-rose/photo sample.jpg",
		"/images/themes/classic-rose/photo sample.jpg",
		"/images/themes/classic-rose/photo sample.jpg",
	],
};

// Komponen utama yang berisi logika state
const InvitationContent = () => {
	// State untuk mengontrol tampilan opening vs main content
	const [isOpened, setIsOpened] = useState(false);

	// Hook untuk membaca query parameter dari URL
	const searchParams = useSearchParams();
	const guestName = searchParams.get("to");

	// Fungsi yang akan dipanggil oleh tombol "Buka Undangan"
	const handleOpenInvitation = () => {
		setIsOpened(true);
		// Optional: Mainkan musik saat undangan dibuka
		// const audio = document.getElementById('bg-music');
		// audio?.play();
	};

	return (
		<AnimatePresence>
			{!isOpened ? (
				// Tampilan Opening/Greeting
				<motion.div
					key='opening'
					exit={{ opacity: 0, y: -50 }}
					transition={{ duration: 0.5 }}>
					<OpeningSection
						coupleNames='Bima & Anisa'
						guestName={guestName}
						onOpen={handleOpenInvitation}
					/>
				</motion.div>
			) : (
				// Tampilan Isi Undangan setelah dibuka
				<motion.div
					key='content'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}>
					<HeroSection
						coupleNames={`${invitationData.groom.name} & ${invitationData.bride.name}`}
						heroImage={invitationData.heroImage}
					/>
					<CountdownSection targetDate={invitationData.weddingDate} />
					<CoupleSection groom={invitationData.groom} bride={invitationData.bride} />
					<EventSection events={invitationData.events} />
					<GallerySection images={invitationData.gallery} />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

// Halaman utama yang menggunakan Suspense
const ClassicRosePage: React.FC = () => {
	return (
		// Suspense diperlukan karena useSearchParams membaca data saat rendering.
		<Suspense fallback={<div>Loading...</div>}>
			<InvitationContent />
		</Suspense>
	);
};

export default ClassicRosePage;
