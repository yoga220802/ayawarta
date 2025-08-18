// src/app/templates/wedding/classic-rose/[variant]/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "../background.css";

import {
	getClassicRoseThemeConfig,
	ClassicRoseThemeConfig,
} from "@/lib/theme-config/classic-rose";
import { InvitationData, invitationData } from "@/lib/dummy-data/wedding/dummy-wedding";
import CoupleSection from "./components/CoupleSection";
import EventSection from "./components/EventSection";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import MusicPlayer from "./components/MusicPlayer";
import OpeningSection from "./components/OpeningSection";


function InvitationWrapper({
	themeConfig,
	data,
}: {
	themeConfig: ClassicRoseThemeConfig;
	data: InvitationData;
}) {
	const [isOpened, setIsOpened] = useState(false);
	const searchParams = useSearchParams();
	const guestName = searchParams.get("to");

	const handleOpenInvitation = () => {
		setIsOpened(true);
		window.scrollTo(0, 0);
	};

	const themeStyle = {
		"--color-primary": themeConfig.colors.primary,
		"--color-text": themeConfig.colors.text,
		"--font-heading": themeConfig.fonts.heading,
		"--font-body": themeConfig.fonts.body,
		"--font-script": themeConfig.fonts.script,
		"--bg-mobile-url": `url(${themeConfig.assets.background})`,
		"--bg-desktop-url": `url(${themeConfig.assets.backgroundDesktop})`,
	} as React.CSSProperties;

	const openingSectionStyle = {
		backgroundImage: `url(${themeConfig.assets.backgroundDesktop})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundAttachment: "fixed",
	};

	return (
		<main style={themeStyle} className='font-[--font-body]'>
			<AnimatePresence>
				{!isOpened ? (
					<motion.div
						key='opening'
						style={openingSectionStyle}
						exit={{ opacity: 0, y: -50 }}
						transition={{ duration: 0.5 }}>
						<OpeningSection
							coupleNames={`${data.couple.groom.name} & ${data.couple.bride.name}`}
							guestName={guestName}
							onOpen={handleOpenInvitation}
							theme={themeConfig}
						/>
					</motion.div>
				) : (
					<div className='seamless-background'>
						<motion.div
							key='content'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8 }}>
							<MusicPlayer videoUrl={data.musicUrl} theme={themeConfig} />
							<HeroSection data={data.couple} theme={themeConfig} />
							<CoupleSection data={data.couple} theme={themeConfig} />
							<EventSection
								events={data.events}
								targetDate={data.weddingDate}
								theme={themeConfig}
							/>
							<GallerySection
								gallery={data.gallery}
								loveStory={data.loveStory}
								theme={themeConfig}
							/>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</main>
	);
}

export default function ClassicRosePage({
	params,
}: {
	params: { variant: string };
}) {
	const themeConfig = getClassicRoseThemeConfig(params.variant);

	return (
		<Suspense
			fallback={
				<div className='bg-white min-h-screen flex items-center justify-center'>
					Loading...
				</div>
			}>
			<InvitationWrapper themeConfig={themeConfig} data={invitationData} />
		</Suspense>
	);
}
