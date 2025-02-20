import { LogInIcon } from "lucide-react";
import type { Metadata } from "next";
import { AuthFooter } from "../_components/auth-footer";
import { AuthLayout } from "../_components/layout";
import { SignInForm } from "./form";
import { SignInProviders } from "./providers";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignIn(): JSX.Element {
  return (
    <AuthLayout
      title="Log In"
      description="Selecione o método de autenticação que deseja acessar o sistema."
      icon={LogInIcon}
    >
      <SignInProviders>
        <SignInForm />
      </SignInProviders>

      <AuthFooter
        text="Não possuí uma conta?"
        link={{
          title: "Crie uma gratis!",
          path: "/sign-up",
        }}
      />
    </AuthLayout>
  );
}
