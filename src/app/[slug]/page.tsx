import "@/app/(templates)/wedding/classic-rose/background.css";

import ClassicRoseClientView from "../(templates)/wedding/classic-rose/[variant]/components/ClassicRoseClientView";
import { invitationData } from "@/lib/dummy-data/wedding/dummy-wedding";
import { getInvitationBySlug } from "@/lib/invitations";
import { getClassicRoseThemeConfig } from "@/lib/theme-config/classic-rose";

type InvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;
  const invitation = getInvitationBySlug(slug);

  const variant = invitation?.meta.variant ?? "red";
  const data = invitation?.data ?? invitationData;
  const invitationSlug = invitation ? slug : "default";

  return (
    <ClassicRoseClientView
      invitationSlug={invitationSlug}
      themeConfig={getClassicRoseThemeConfig(variant)}
      data={data}
    />
  );
}
