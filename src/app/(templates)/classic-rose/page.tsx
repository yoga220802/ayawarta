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
import MusicPlayer from "./components/MusicPlayer";

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
	weddingDate: new Date("2025-10-28T08:00:00"),
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
	gallery: {
		videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		images: [
			"/images/themes/classic-rose/photo sample.jpg",
			"/images/themes/classic-rose/photo sample.jpg",
			"/images/themes/classic-rose/photo sample.jpg",
			"/images/themes/classic-rose/photo sample.jpg",
			"/images/themes/classic-rose/photo sample.jpg",
			"/images/themes/classic-rose/photo sample.jpg",
		],
	},
	loveStory: [
		{
			title: "Awal",
			content:
				"Kisah kami berawal dari ketidaksengajaan di sebuah kedai kopi senja. Obrolan ringan tentang buku dan musik ternyata membuka pintu ke sebuah cerita yang tak pernah kami duga. Setiap pertemuan setelahnya seolah menegaskan bahwa kami telah menemukan potongan puzzle yang hilang.",
		},
		{
			title: "Lamaran",
			content:
				"Di bawah langit berbintang, di tempat yang sama di mana kami pertama kali berbagi tawa, sebuah pertanyaan sederhana diucapkan dengan hati berdebar. Jawaban 'iya' yang terucap menjadi janji awal untuk selamanya, disaksikan oleh semesta yang turut berbahagia.",
		},
		{
			title: "Menikah",
			content:
				"Kini, kami berdiri di ambang babak baru. Dengan restu dan doa, kami siap mengikat janji suci, melanjutkan perjalanan ini sebagai sepasang kekasih sejati. Inilah awal dari petualangan abadi kami, sebuah kisah yang akan kami tulis bersama, selamanya.",
		},
	],
	musicUrl: "https://youtu.be/qf1W5iIRTe8?si=NJPJTeV7afylQeLQ",
};

// Komponen utama yang berisi logika state
const InvitationContent = () => {
	const [isOpened, setIsOpened] = useState(false);
	const searchParams = useSearchParams();
	const guestName = searchParams.get("to");

	const handleOpenInvitation = () => {
		setIsOpened(true);
	};

	return (
		<AnimatePresence>
			{!isOpened ? (
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
				<motion.div
					key='content'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}>
					{/* FIX: Render MusicPlayer saat undangan dibuka */}
					<MusicPlayer videoUrl={invitationData.musicUrl} />

					<HeroSection
						coupleNames={`${invitationData.groom.name} & ${invitationData.bride.name}`}
						heroImage={invitationData.heroImage}
					/>
					<CoupleSection groom={invitationData.groom} bride={invitationData.bride} />
					<EventSection
						events={invitationData.events}
						targetDate={invitationData.weddingDate}
					/>
					<GallerySection
						gallery={invitationData.gallery}
						loveStory={invitationData.loveStory}
					/>
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
