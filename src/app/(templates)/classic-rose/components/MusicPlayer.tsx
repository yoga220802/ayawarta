"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Interfaces untuk TypeScript yang lebih ketat ---
interface YTPlayer {
	playVideo: () => void;
	mute: () => void;
	unMute: () => void;
	destroy: () => void;
	setVolume: (volume: number) => void;
}

interface YTEvent {
	target: YTPlayer;
}

// Menambahkan properti YT ke object window global
declare global {
	interface Window {
		YT: any;
		onYouTubeIframeAPIReady?: () => void;
	}
}

// --- Icons ---
const VolumeOnIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'></polygon>
		<path d='M15.54 8.46a5 5 0 0 1 0 7.07'></path>
		<path d='M19.07 4.93a10 10 0 0 1 0 14.14'></path>
	</svg>
);

const VolumeOffIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'></polygon>
		<line x1='23' y1='9' x2='17' y2='15'></line>
		<line x1='17' y1='9' x2='23' y2='15'></line>
	</svg>
);

interface MusicPlayerProps {
	videoUrl: string;
}

const getYoutubeVideoId = (url: string): string | null => {
	const regExp =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ videoUrl }) => {
	const [isPlaying, setIsPlaying] = useState(true);
	// FIX: Memberikan tipe yang spesifik pada ref
	const playerRef = useRef<YTPlayer | null>(null);

	const videoId = getYoutubeVideoId(videoUrl);

	useEffect(() => {
		if (!videoId) {
			console.error("Invalid YouTube URL provided:", videoUrl);
			return;
		}

		(window as any).onYouTubeIframeAPIReady = () => {
			playerRef.current = new window.YT.Player("youtube-player", {
				height: "0",
				width: "0",
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					loop: 1,
					playlist: videoId,
				},
				events: {
					// FIX: Memberikan tipe pada event
					onReady: (event: YTEvent) => {
						event.target.playVideo();
						event.target.setVolume(50);
					},
				},
			});
		};

		const tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

		return () => {
			if (playerRef.current) {
				playerRef.current.destroy();
			}
			window.onYouTubeIframeAPIReady = undefined;
		};
	}, [videoId, videoUrl]);

	const toggleMusic = () => {
		if (!playerRef.current) return;

		if (isPlaying) {
			playerRef.current.mute();
		} else {
			playerRef.current.unMute();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<>
			<div id='youtube-player' className='absolute -top-96'></div>

			<motion.button
				onClick={toggleMusic}
				className='fixed bottom-5 right-5 z-50 w-12 h-12 bg-primary-rose text-white rounded-full flex items-center justify-center shadow-lg'
				initial={{ scale: 0, rotate: -180 }}
				animate={{ scale: 1, rotate: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}>
				<AnimatePresence mode='wait'>
					<motion.div
						key={isPlaying ? "on" : "off"}
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.5, opacity: 0 }}
						transition={{ duration: 0.2 }}>
						{isPlaying ? (
							<VolumeOnIcon className='w-6 h-6' />
						) : (
							<VolumeOffIcon className='w-6 h-6' />
						)}
					</motion.div>
				</AnimatePresence>
			</motion.button>
		</>
	);
};

export default MusicPlayer;
