import { KeyRoundIcon } from "lucide-react";
import type { Metadata } from "next";
import { AlreadyAccount } from "../_components/already-account";
import { AuthLayout } from "../_components/layout";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "New Account",
};

export default function SignUpPage(): JSX.Element {
  return (
    <AuthLayout
      title="Crie sua conta"
      description="Insira os dados abaixo para criar sua nova conta"
      icon={KeyRoundIcon}
    >
      <SignUpForm />

      <AlreadyAccount />
    </AuthLayout>
  );
}
