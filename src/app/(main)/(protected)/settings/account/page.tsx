import type { Metadata } from "next";
import { LayoutSettings } from "../_components/_layouts";
import { AccountForm } from "./form/form";

export const metadata: Metadata = {
  title: "Conta",
};

export default function Account(): JSX.Element {
  return (
    <LayoutSettings title="Conta" description="Atualize as configurações da sua conta.">
      <AccountForm />
    </LayoutSettings>
  );
}
