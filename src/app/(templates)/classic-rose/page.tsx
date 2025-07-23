"use client";

import React from "react";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import CoupleSection from "./components/CoupleSection";
import EventSection from "./components/EventSection";
import GallerySection from "./components/GallerySection";


const invitationData = {
	groom: {
		name: "Bima Mahendra",
		parents: "Putra Pertama dari Pasangan Ayah Bima & Ibu Bima",
		instagram: "satriabaja_hitam",
		photo: "/images/themes/classic-rose/groom.png",
	},
	bride: {
		name: "Anisa Putri",
		parents: "Putri Pertama dari Pasangan Ayah Anisa & Ibu Anisa",
		instagram: "cewenyabimaowo",
		photo: "/images/themes/classic-rose/bride.png",
	},
	heroImage: "/images/themes/classic-rose/hero.png",
	weddingDate: new Date("2025-02-28T08:00:00"),
	events: [
		{
			name: "Akad Nikah",
			date: "28 Februari 2025",
			time: "08:00 WIB - selesai",
			location: "Graha Intan Balarea",
			address:
				"Jl. Patriot No.12-14, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151",
			mapLink: "https://maps.app.goo.gl/...",
		},
		{
			name: "Resepsi",
			date: "28 Februari 2025",
			time: "10:00 WIB - selesai",
			location: "Graha Intan Balarea",
			address:
				"Jl. Patriot No.12-14, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151",
			mapLink: "https://maps.app.goo.gl/...",
		},
	],
	gallery: [
		"/images/themes/classic-rose/gallery-1.png",
		"/images/themes/classic-rose/gallery-2.png",
		"/images/themes/classic-rose/gallery-3.png",
		"/images/themes/classic-rose/gallery-4.png",
		"/images/themes/classic-rose/gallery-5.png",
		"/images/themes/classic-rose/gallery-6.png",
	],
};

const ClassicRosePage: React.FC = () => {
	return (
		<main className='bg-[#FDF8F8] font-sans text-gray-700'>
			<HeroSection
				coupleNames={`${invitationData.groom.name} & ${invitationData.bride.name}`}
				heroImage={invitationData.heroImage}
			/>
			<CountdownSection targetDate={invitationData.weddingDate} />
			<CoupleSection groom={invitationData.groom} bride={invitationData.bride} />
			<EventSection events={invitationData.events} />
			<GallerySection images={invitationData.gallery} />
		</main>
	);
};

export default ClassicRosePage;
