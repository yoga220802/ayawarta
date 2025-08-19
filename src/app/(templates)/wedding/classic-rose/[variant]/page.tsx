// src/app/templates/wedding/classic-rose/[variant]/page.tsx

// File ini sekarang adalah Server Component murni. Tidak ada "use client".

import React from "react";
import "../background.css";

import { getClassicRoseThemeConfig } from "@/lib/theme-config/classic-rose";
import ClassicRoseClientView from "./components/ClassicRoseClientView";

// Impor komponen baru yang sudah ditandai "use client"

/**
 * Ini adalah komponen utama halaman (Server Component).
 * Tugasnya adalah mengambil data di sisi server dan melemparkannya ke Client Component.
 */
export default async function ClassicRosePage({
	params,
}: {
	params: { variant: string; slug?: string };
}) {
	// Pastikan params tidak diperlakukan sebagai Promise
	const { variant, slug } = params;

	// 1. Logika server: mengambil params dan mendapatkan konfigurasi tema.
	const themeConfig = getClassicRoseThemeConfig(variant);

	// 2. Data bisa diambil dari database atau dummy-data.
	const data = slug
		? (await import("@/lib/invitations")).getInvitationBySlug(slug)?.data
		: (await import("@/lib/dummy-data/wedding/dummy-wedding")).invitationData;

	// Jika data tidak ditemukan, lempar error
	if (!data) {
		throw new Error("Invitation data not found");
	}

	// 3. Render Client Component dan kirim data sebagai props.
	return (
		<ClassicRoseClientView
			invitationSlug={slug || "default"} // Tambahkan invitationSlug
			themeConfig={themeConfig}
			data={data}
		/>
	);
}
