import { LogInIcon } from "lucide-react";
import type { Metadata } from "next";
import { AuthLayout } from "../_components/_layouts";
import { DontAlreadyAccount } from "../_components/dont-already-account";
import { SignInForm } from "./form";

export const metadata: Metadata = {
  title: "Log In",
};

export default function SignIn(): JSX.Element {
  return (
    <AuthLayout title="Log In" description="Insira os dados abaixo para fazer login em sua conta" icon={LogInIcon}>
      <SignInForm />

      <DontAlreadyAccount />
    </AuthLayout>
  );
}
