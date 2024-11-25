import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { AuthFooter } from "../_components/auth-footer";
import { AuthLayout } from "../_components/layout";
import { ForgetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Recuperar Senha",
};

export default function ForgetPassword(): JSX.Element {
  return (
    <AuthLayout
      title="Recuperação de conta"
      description="Insira o seu e-mail abaixo para recuperar o acesso à sua conta. Você receberá um e-mail com instruções para continuar o processo."
      icon={UserIcon}
    >
      <ForgetPasswordForm />

      <AuthFooter
        text="Voltar para o"
        link={{
          title: "Log In",
          path: "/sign-in",
        }}
      />
    </AuthLayout>
  );
}
