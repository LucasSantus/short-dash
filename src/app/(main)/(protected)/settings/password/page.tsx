import { getUser } from "@/actions/queries/auth/get-user";
import { RenderOnClient } from "@/components/render-on-client";
import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { SettingsLayout } from "../_components/layout";
import { ChangePasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Mudar Senha",
};

export default async function ChangedPassword() {
  const { user, account } = await getUser();

  if (account.provider !== "credentials") return permanentRedirect("/settings/account");

  return (
    <SettingsLayout title="Senha" description="Atualize as configurações para autenticação no sistema.">
      <RenderOnClient>
        <ChangePasswordForm email={user.email!} />
      </RenderOnClient>
    </SettingsLayout>
  );
}
