import { RenderOnClient } from "@/components/render-on-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { messages } from "@/constants/messages";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { UserRoundXIcon } from "lucide-react";
import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { SettingsLayout } from "../_components/layout";
import { ChangePasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Mudar Senha",
};

export default async function ChangedPassword() {
  const { isAuthenticated, user, account } = await getServerAuthSession();

  const title = "Senha";
  const description = "Atualize as configurações para autenticação no sistema.";

  if (!isAuthenticated || !user.email)
    return (
      <SettingsLayout title={title} description={description}>
        <Alert variant="destructive">
          <UserRoundXIcon className="size-4" />
          <AlertTitle>Ocorreu um problema!</AlertTitle>
          <AlertDescription>{messages.globals.user.notFound}</AlertDescription>
        </Alert>
      </SettingsLayout>
    );

  if (account.provider !== "credentials") return permanentRedirect("/settings/account");

  return (
    <SettingsLayout title={title} description={description}>
      <RenderOnClient>
        <ChangePasswordForm email={user.email} />
      </RenderOnClient>
    </SettingsLayout>
  );
}
