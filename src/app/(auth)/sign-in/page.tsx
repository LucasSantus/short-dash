import { LogInIcon } from "lucide-react";
import type { Metadata } from "next";
import { DontAlreadyAccount } from "../_components/dont-already-account";
import { AuthLayout } from "../_components/layout";
import { SignInProviders } from "./providers";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignIn(): JSX.Element {
  return (
    <AuthLayout
      title="Log In"
      description="Selecione o tipo de autenticador que deseja acessar o sistema."
      icon={LogInIcon}
    >
      <SignInProviders />

      <DontAlreadyAccount />
    </AuthLayout>
  );
}
