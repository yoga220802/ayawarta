// src/components/templates/classic-rose/ClassicRoseClientView.tsx
"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { ClassicRoseThemeConfig } from "@/lib/theme-config/classic-rose";

import OpeningSection from "./OpeningSection";
import HeroSection from "./HeroSection";
import CoupleSection from "./CoupleSection";
import EventSection from "./EventSection";
import GallerySection from "./GallerySection";
import GiftSection from "./GiftSection";
import WishesSection from "./WishesSection";
import MusicPlayer from "./MusicPlayer";
import { InvitationData } from "@/lib/dummy-data/wedding/dummy-wedding";

function InvitationView({
	invitationSlug,
	themeConfig,
	data,
}: {
	invitationSlug: string;
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

	return (
		<div style={themeStyle} className='font-[--font-body]'>
			<AnimatePresence>
				{!isOpened ? (
					<motion.div
						key='opening'
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
					<main className='seamless-background'>
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
								theme={themeConfig}
							/>
							<GallerySection
								gallery={data.gallery}
								loveStory={data.loveStory}
								theme={themeConfig}
							/>
							<GiftSection gifts={data.gifts} theme={themeConfig} />
							<WishesSection invitationSlug={invitationSlug} theme={themeConfig} />
						</motion.div>
					</main>
				)}
			</AnimatePresence>
		</div>
	);
}

export default function ClassicRoseClientView({
	invitationSlug,
	themeConfig,
	data,
}: {
	invitationSlug: string;
	themeConfig: ClassicRoseThemeConfig;
	data: InvitationData;
}) {
	return (
		<Suspense
			fallback={
				<div className='bg-white min-h-screen flex items-center justify-center'>
					Loading Guest...
				</div>
			}>
			<InvitationView
				invitationSlug={invitationSlug}
				themeConfig={themeConfig}
				data={data}
			/>
		</Suspense>
	);
}
