// src/components/templates/classic-rose/WishesSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
	collection,
	addDoc,
	query,
	onSnapshot,
	orderBy,
	Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ClassicRoseThemeConfig as ThemeConfig } from "@/lib/theme-config/classic-rose";
import CornerFlower from "./CornerFlower";

const TitleDivider: React.FC<{ src: string }> = ({ src }) => (
	<div className='relative w-20 h-4'>
		<Image src={src} alt='Divider' fill className='object-contain' />
	</div>
);

// Tipe data untuk ucapan, sekarang termasuk status kehadiran
interface Wish {
	id: string;
	name: string;
	message: string;
	attendance: "Hadir" | "Tidak Hadir" | "Belum Konfirmasi"; // Status kehadiran
	timestamp: Date;
}

interface WishesSectionProps {
	invitationSlug: string;
	theme: ThemeConfig;
}

const WishesSection: React.FC<WishesSectionProps> = ({
	invitationSlug,
	theme,
}) => {
	const [wishes, setWishes] = useState<Wish[]>([]);
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [attendance, setAttendance] = useState<"Hadir" | "Tidak Hadir" | null>(
		null
	); // State baru untuk kehadiran
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	// Mengambil data ucapan secara real-time dari Firestore
	useEffect(() => {
		if (!invitationSlug) return;

		const q = query(
			collection(db, "wishes", invitationSlug, "messages"),
			orderBy("timestamp", "desc")
		);

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const wishesData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				timestamp: (doc.data().timestamp as Timestamp).toDate(),
			})) as Wish[];
			setWishes(wishesData);
		});

		return () => unsubscribe();
	}, [invitationSlug]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !message.trim()) {
			setError("Nama dan ucapan tidak boleh kosong.");
			return;
		}
		if (!attendance) {
			setError("Mohon pilih konfirmasi kehadiran Anda.");
			return;
		}
		setIsSubmitting(true);
		setError("");

		try {
			await addDoc(collection(db, "wishes", invitationSlug, "messages"), {
				name: name,
				message: message,
				attendance: attendance, // Simpan status kehadiran
				timestamp: new Date(),
			});
			setName("");
			setMessage("");
			setAttendance(null); // Reset pilihan kehadiran
		} catch (error) {
			console.error("Error adding document: ", error);
			setError("Gagal mengirim ucapan. Coba lagi.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className='relative'>
			<CornerFlower flowerSrc={theme.assets.flower} position='top-right' />
			<CornerFlower flowerSrc={theme.assets.flower} position='bottom-left' />
			<div
				className='relative z-20 container mx-auto px-4 sm:px-8 max-w-md flex flex-col items-center gap-8 text-center py-20 md:py-32'
				style={{ color: "var(--color-text)" }}>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<div className='flex items-center justify-center gap-4'>
						<TitleDivider src={theme.assets.divider} />
						<h2 className='text-xl' style={{ fontFamily: "var(--font-body)" }}>
							Buku Tamu
						</h2>
						<div className='transform -scale-x-100'>
							<TitleDivider src={theme.assets.divider} />
						</div>
					</div>
					<p className='text-sm mt-4 max-w-xs mx-auto'>
						Kirimkan doa dan ucapan terbaik Anda untuk kedua mempelai.
					</p>
				</motion.div>

				<motion.form
					onSubmit={handleSubmit}
					className='w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 space-y-3 text-left'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}>
					<div>
						<label htmlFor='name' className='text-xs font-semibold'>
							Nama
						</label>
						<input
							type='text'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='w-full p-2 mt-1 rounded border border-gray-300 text-sm text-gray-800'
							placeholder='Nama Anda'
						/>
					</div>
					<div>
						<label className='text-xs font-semibold'>Konfirmasi Kehadiran</label>
						<div className='flex gap-2 mt-1'>
							<button
								type='button'
								onClick={() => setAttendance("Hadir")}
								className={`flex-1 py-2 text-xs rounded ${
									attendance === "Hadir"
										? "bg-[--color-primary] text-white"
										: "bg-gray-200 text-gray-700"
								}`}>
								Hadir
							</button>
							<button
								type='button'
								onClick={() => setAttendance("Tidak Hadir")}
								className={`flex-1 py-2 text-xs rounded ${
									attendance === "Tidak Hadir"
										? "bg-[--color-primary] text-white"
										: "bg-gray-200 text-gray-700"
								}`}>
								Tidak Hadir
							</button>
						</div>
					</div>
					<div>
						<label htmlFor='message' className='text-xs font-semibold'>
							Ucapan
						</label>
						<textarea
							id='message'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							rows={4}
							className='w-full p-2 mt-1 rounded border border-gray-300 text-sm text-gray-800'
							placeholder='Tulis ucapan Anda...'></textarea>
					</div>
					{error && <p className='text-xs text-red-500'>{error}</p>}
					<button
						type='submit'
						disabled={isSubmitting}
						style={{ backgroundColor: "var(--color-primary)" }}
						className='w-full text-white py-2 rounded-lg font-semibold transition-opacity disabled:opacity-50'>
						{isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
					</button>
				</motion.form>

				<div className='w-full max-h-96 overflow-y-auto space-y-3 text-left'>
					{wishes.map((wish) => (
						<motion.div
							key={wish.id}
							className='bg-white/90 backdrop-blur-sm rounded-lg p-3'
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}>
							<div className='flex justify-between items-start'>
								<p
									className='font-semibold text-sm'
									style={{ fontFamily: "var(--font-heading)" }}>
									{wish.name}
								</p>
								{wish.attendance && (
									<span
										className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
											wish.attendance === "Hadir"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}>
										{wish.attendance}
									</span>
								)}
							</div>
							<p className='text-xs mt-1'>{wish.message}</p>
							<p className='text-[10px] text-gray-500 mt-2'>
								{wish.timestamp.toLocaleString("id-ID")}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WishesSection;
