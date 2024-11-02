import { RenderOnClient } from "@/components/render-on-client";
import { messages } from "@/constants/messages";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { Metadata } from "next";
import { SettingsLayout } from "../_components/settings-layout";
import { ProfileForm } from "./form";

export const metadata: Metadata = {
  title: "Minha Conta",
};

export default async function SettingsAccountPage() {
  const { isAuthenticated, user } = await getServerAuthSession();

  if (!isAuthenticated || !user.id)
    return (
      <SettingsLayout title="Conta" description="Atualize as configurações da sua conta.">
        <span className="flex items-center justify-center text-foreground">{messages.globals.user.notFound}</span>
      </SettingsLayout>
    );

  return (
    <SettingsLayout title="Minha Conta" description="Atualize as configurações da sua conta.">
      <RenderOnClient>
        <ProfileForm user={user} />
      </RenderOnClient>
    </SettingsLayout>
  );
}
