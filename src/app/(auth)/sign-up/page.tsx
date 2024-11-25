import { KeyRoundIcon } from "lucide-react";
import type { Metadata } from "next";
import { AuthFooter } from "../_components/auth-footer";
import { AuthLayout } from "../_components/layout";
import { SignUpForm } from "./form";

export const metadata: Metadata = {
  title: "Nova Conta",
};

export default function SignUpPage(): JSX.Element {
  return (
    <AuthLayout
      title="Crie sua conta"
      description="Insira os dados abaixo para criar sua nova conta"
      icon={KeyRoundIcon}
    >
      <SignUpForm />

      <AuthFooter
        text="Já possuí uma conta?"
        link={{
          title: "Acessar",
          path: "/sign-in",
        }}
      />
    </AuthLayout>
  );
}
