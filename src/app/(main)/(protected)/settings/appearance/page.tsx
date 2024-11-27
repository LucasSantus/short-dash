import { RenderOnClient } from "@/components/render-on-client";
import { Metadata } from "next";
import { SettingsLayout } from "../_components/layout";
import { AppearanceForm } from "./form";

export const metadata: Metadata = {
  title: "Aparência",
};

export default function Appearance() {
  const title = "Aparência";
  const description = "Personalize a aparência do sistema. Alterne entre os temas abaixo.";

  return (
    <SettingsLayout title={title} description={description}>
      <RenderOnClient>
        <AppearanceForm />
      </RenderOnClient>
    </SettingsLayout>
  );
}
