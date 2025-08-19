// src/app/[slug]/page.tsx
import React from "react";

import { getInvitationBySlug } from "@/lib/invitations";
import { getClassicRoseThemeConfig } from "@/lib/theme-config/classic-rose";

// Impor komponen view client

// CSS untuk background, pastikan jalur impor benar
import "@/app/(templates)/wedding/classic-rose/background.css";
import ClassicRoseClientView from "../(templates)/wedding/classic-rose/[variant]/components/ClassicRoseClientView";

/**
 * Halaman dinamis untuk setiap undangan berdasarkan slug.
 * Ini adalah Server Component.
 */
export default async function InvitationPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// Tunggu params jika diperlukan
	const { slug } = await params;

	// 1. Ambil data undangan berdasarkan slug
	const invitation = getInvitationBySlug(slug);

	// Jika undangan ditemukan, gunakan data dari slug
	if (invitation) {
		if (invitation.meta.theme === "classic-rose") {
			const themeConfig = getClassicRoseThemeConfig(invitation.meta.variant);

			return (
				<ClassicRoseClientView
					invitationSlug={slug} // Kirim slug untuk Firestore
					themeConfig={themeConfig}
					data={invitation.data}
				/>
			);
		}
	}

	// 2. Jika slug tidak ditemukan, gunakan undangan default dari dummy-wedding.ts
	const { invitationData } = await import("@/lib/dummy-data/wedding/dummy-wedding");
	const themeConfig = getClassicRoseThemeConfig("red"); // Default variant

	return (
		<ClassicRoseClientView
			invitationSlug="default" // Gunakan slug default
			themeConfig={themeConfig}
			data={invitationData}
		/>
	);
}
