// src/app/templates/wedding/classic-rose/[variant]/page.tsx

// File ini sekarang adalah Server Component murni. Tidak ada "use client".

import React from "react";
import "../background.css";

import { getClassicRoseThemeConfig } from "@/lib/theme-config/classic-rose";
import { invitationData } from "@/lib/dummy-data/wedding/dummy-wedding";
import ClassicRoseClientView from "./components/ClassicRoseClientView";

// Impor komponen baru yang sudah ditandai "use client"

/**
 * Ini adalah komponen utama halaman (Server Component).
 * Tugasnya adalah mengambil data di sisi server dan melemparkannya ke Client Component.
 */
export default async function ClassicRosePage({
	params,
}: {
	params: { variant: string };
}) {
	// 1. Logika server: mengambil params dan mendapatkan konfigurasi tema.
	const themeConfig = getClassicRoseThemeConfig(params.variant);

	// 2. Data bisa diambil dari database di sini jika perlu.
	const data = invitationData;

	// 3. Render Client Component dan kirim data sebagai props.
	return <ClassicRoseClientView themeConfig={themeConfig} data={data} />;
}
