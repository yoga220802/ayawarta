"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
	Copy,
	Check,
	Users,
	Link as LinkIcon,
	MessageSquare, // Icon WhatsApp
	LoaderCircle, // Icon untuk loading
} from "lucide-react";
import { getInvitationBySlug } from "@/lib/invitations";
import { InvitationData } from "@/lib/dummy-data/wedding/dummy-wedding";

export default function InvitePage() {
	const params = useParams();
	const slug = params.slug as string;

	const [namesInput, setNamesInput] = useState("");
	const [guestList, setGuestList] = useState<string[]>([]);
	const [baseUrl, setBaseUrl] = useState("");
	const [copiedName, setCopiedName] = useState<string | null>(null);

	// --- STATE BARU UNTUK DATA UNDANGAN ---
	const [invitationData, setInvitationData] = useState<InvitationData | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	// Ambil data undangan berdasarkan slug saat komponen dimuat
	useEffect(() => {
		// Kita butuh `window.location.origin` yang cuma ada di client-side
		setBaseUrl(`${window.location.origin}/${slug}`);

		if (slug) {
			const invitation = getInvitationBySlug(slug);
			if (invitation) {
				setInvitationData(invitation.data);
			} else {
				console.error("Data undangan tidak ditemukan untuk slug:", slug);
			}
			setIsLoading(false);
		}
	}, [slug]);

	const handleGenerateLinks = () => {
		const names = namesInput
			.split("\n")
			.map((name) => name.trim())
			.filter((name) => name.length > 0);
		setGuestList(names);
	};

	const handleCopy = (name: string) => {
		const url = `${baseUrl}?to=${encodeURIComponent(name)}`;
		const textArea = document.createElement("textarea");
		textArea.value = url;
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand("copy");
			setCopiedName(name);
			setTimeout(() => setCopiedName(null), 2000); // Reset feedback setelah 2 detik
		} catch (err) {
			console.error("Gagal menyalin link", err);
		}
		document.body.removeChild(textArea);
	};

	// --- FUNGSI SHARE DIPERBARUI ---
	const handleShareToWhatsApp = (name: string) => {
		if (!invitationData) return;

		const { couple, events } = invitationData;
		// Asumsi acara resepsi adalah acara terakhir di array
		const reception = events[events.length - 1];

		const url = `${baseUrl}?to=${encodeURIComponent(name)}`;
		const message = `بِسْــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْـــــم

💐 UNDANGAN PERNIKAHAN 💐

Kepada Yth:
${name}

Segala puji bagi Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan ini kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami :

*${couple.bride.name}*
${couple.bride.parents}

dengan

*${couple.groom.name}*
${couple.groom.parents}

Insyaa Allah yang akan diselenggarakan pada:
*${reception.date}*

🏢 *Tempat Acara*
${reception.location}
${reception.address}

Klik link berikut untuk Undangan Resmi
${url}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan do'a terbaiknya.
Jazaakumullah Khairan Katsiran
💌
Wedding E-Invitation ini merupakan undangan resmi dari kami, kami mohon maaf mengirim undangan melalui online.`;

		const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
			message
		)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<main className='min-h-screen bg-gray-50 flex items-center justify-center p-4 font-body'>
			<div className='w-full max-w-2xl mx-auto'>
				<div className='bg-white rounded-2xl shadow-lg p-8'>
					{isLoading ? (
						<div className='flex flex-col items-center justify-center text-gray-500'>
							<LoaderCircle className='w-8 h-8 animate-spin mb-4' />
							<p>Memuat data undangan...</p>
						</div>
					) : !invitationData ? (
						<div className='text-center text-red-500'>
							<h1 className='text-xl font-bold'>Gagal Memuat Data</h1>
							<p>Data untuk undangan '{slug}' tidak ditemukan.</p>
						</div>
					) : (
						<>
							<div className='text-center mb-8'>
								<h1 className='text-3xl font-bold text-gray-800'>Buat Link Undangan</h1>
								<p className='text-gray-500 mt-2'>
									Untuk pernikahan{" "}
									<span className='font-semibold text-gray-700'>
										{invitationData.couple.groom.name} &{" "}
										{invitationData.couple.bride.name}
									</span>
								</p>
							</div>

							{/* Input Section */}
							<div className='mb-6'>
								<label
									htmlFor='names'
									className='block text-sm font-semibold text-gray-700 mb-2'>
									<Users className='inline-block w-4 h-4 mr-2' />
									Nama Tamu (satu nama per baris)
								</label>
								<textarea
									id='names'
									rows={5}
									value={namesInput}
									onChange={(e) => setNamesInput(e.target.value)}
									className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
									placeholder='Contoh:&#10;John Doe&#10;Jane Smith&#10;Keluarga Besar Bapak Budi'
								/>
							</div>

							<button
								onClick={handleGenerateLinks}
								className='w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform duration-200 hover:scale-105 shadow-md flex items-center justify-center gap-2'>
								<LinkIcon className='w-5 h-5' />
								Buat Link
							</button>

							{/* Result Section */}
							{guestList.length > 0 && (
								<div className='mt-10'>
									<h2 className='text-xl font-bold text-gray-800 mb-4 text-center'>
										Hasil Link Undangan
									</h2>
									<div className='bg-gray-50 rounded-lg border border-gray-200 max-h-80 overflow-y-auto'>
										<table className='w-full text-sm text-left text-gray-600'>
											<thead className='text-xs text-gray-700 uppercase bg-gray-100 sticky top-0'>
												<tr>
													<th scope='col' className='px-6 py-3'>
														Nama Tamu
													</th>
													<th scope='col' className='px-6 py-3 text-right'>
														Aksi
													</th>
												</tr>
											</thead>
											<tbody>
												{guestList.map((name, index) => (
													<tr key={index} className='bg-white border-b hover:bg-gray-50'>
														<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
															{name}
														</td>
														<td className='px-6 py-4 text-right space-x-2'>
															<button
																onClick={() => handleCopy(name)}
																className={`inline-flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-md transition ${
																	copiedName === name
																		? "bg-green-100 text-green-700"
																		: "bg-blue-100 text-blue-700 hover:bg-blue-200"
																}`}>
																{copiedName === name ? (
																	<>
																		<Check className='w-3 h-3' />
																		Tersalin!
																	</>
																) : (
																	<>
																		<Copy className='w-3 h-3' />
																		Salin
																	</>
																)}
															</button>
															<button
																onClick={() => handleShareToWhatsApp(name)}
																title='Bagikan ke WhatsApp'
																className='inline-flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-md transition bg-green-100 text-green-800 hover:bg-green-200'>
																<MessageSquare className='w-3 h-3' />
																<span>WhatsApp</span>
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							)}
						</>
					)}
				</div>
				<p className='text-center text-xs text-gray-400 mt-6'>
					© {new Date().getFullYear()} AyaWarta. Fitur dibuat oleh Programmer
					Berkelas.
				</p>
			</div>
		</main>
	);
}
