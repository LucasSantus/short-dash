import { trpcServer } from "@/trpc/server";
import { KeyRoundIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthLayout } from "../../_components/layout";
import { ResetPasswordForm } from "./form";

export const metadata: Metadata = {
  title: "Resetar Senha",
};

interface ForgetPasswordProps {
  params: {
    token: string;
  };
}

export default async function ResetPassword({ params }: ForgetPasswordProps): Promise<JSX.Element> {
  const { user } = await trpcServer.auth.verifyToken({
    token: params.token,
  });

  if (!user || !user?.email) return notFound();

  return (
    <AuthLayout
      title="Recuperação de conta"
      description="Digite os dados abaixo para resetar sua senha."
      icon={KeyRoundIcon}
    >
      <ResetPasswordForm email={user.email} />
    </AuthLayout>
  );
}
