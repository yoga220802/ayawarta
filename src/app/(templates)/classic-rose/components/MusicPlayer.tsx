"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ikon untuk tombol mute/unmute
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

// FIX: Membuat fungsi yang lebih andal untuk mengekstrak ID video YouTube
const getYoutubeVideoId = (url: string): string | null => {
	const regExp =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ videoUrl }) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const playerRef = useRef<any>(null);

	// FIX: Menggunakan fungsi baru untuk mendapatkan ID video
	const videoId = getYoutubeVideoId(videoUrl);

	useEffect(() => {
		// Jangan lakukan apa pun jika ID video tidak valid
		if (!videoId) {
			console.error("Invalid YouTube URL provided:", videoUrl);
			return;
		}

		// Fungsi ini akan dipanggil oleh YouTube Iframe API setelah script-nya termuat
		(window as any).onYouTubeIframeAPIReady = () => {
			playerRef.current = new (window as any).YT.Player("youtube-player", {
				height: "0",
				width: "0",
				videoId: videoId,
				playerVars: {
					autoplay: 1,
					loop: 1,
					playlist: videoId, // Diperlukan agar loop berfungsi
				},
				events: {
					onReady: (event: any) => {
						event.target.playVideo();
						event.target.setVolume(50); // Atur volume awal
					},
				},
			});
		};

		// Muat YouTube Iframe API script secara dinamis
		const tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

		// Cleanup function untuk menghapus script dan instance saat komponen unmount
		return () => {
			if (playerRef.current) {
				playerRef.current.destroy();
			}
			(window as any).onYouTubeIframeAPIReady = undefined;
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
			{/* Div ini adalah tempat YouTube player akan di-render, tapi disembunyikan */}
			<div id='youtube-player' className='absolute -top-96'></div>

			{/* Floating Action Button (FAB) */}
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
