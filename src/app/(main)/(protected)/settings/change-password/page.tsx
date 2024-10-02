import type { Metadata } from "next";
import { LayoutSettings } from "../_components/_layouts";
import { ChangePasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Mudar Senha",
};

export default function ChangePassword(): JSX.Element {
  return (
    <LayoutSettings title="Mudar Senha" description="">
      <ChangePasswordForm />
    </LayoutSettings>
  );
}
