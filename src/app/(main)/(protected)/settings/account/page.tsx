import { getUser } from "@/actions/queries/auth/get-user";
import { RenderOnClient } from "@/components/render-on-client";
import { Metadata } from "next";
import { SettingsLayout } from "../_components/layout";
import { ProfileForm } from "./form";

export const metadata: Metadata = {
  title: "Minha Conta",
};

export default async function Account() {
  const { user } = await getUser();

  return (
    <SettingsLayout title={"Minha Conta"} description={"Atualize as configurações da sua conta."}>
      <RenderOnClient>
        <ProfileForm user={user} />
      </RenderOnClient>
    </SettingsLayout>
  );
}
