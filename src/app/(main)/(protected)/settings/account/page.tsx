import { RenderOnClient } from "@/components/render-on-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { messages } from "@/constants/messages";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { UserRoundXIcon } from "lucide-react";
import { Metadata } from "next";
import { SettingsLayout } from "../_components/layout";
import { ProfileForm } from "./form";

export const metadata: Metadata = {
  title: "Minha Conta",
};

export default async function Account() {
  const { isAuthenticated, user } = await getServerAuthSession();

  const title = "Minha Conta";
  const description = "Atualize as configurações da sua conta.";

  if (!isAuthenticated || !user.id)
    return (
      <SettingsLayout title={title} description={description}>
        <Alert variant="destructive">
          <UserRoundXIcon className="size-4" />
          <AlertTitle>Ocorreu um problema!</AlertTitle>
          <AlertDescription>{messages.globals.user.notFound}</AlertDescription>
        </Alert>
      </SettingsLayout>
    );

  return (
    <SettingsLayout title={title} description={description}>
      <RenderOnClient>
        <ProfileForm user={user} />
      </RenderOnClient>
    </SettingsLayout>
  );
}
