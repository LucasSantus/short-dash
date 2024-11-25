import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck, SendIcon } from "lucide-react";
import { Metadata } from "next";
import { AuthLayout } from "../../_components/layout";

export const metadata: Metadata = {
  title: "Recuperar Senha",
};

export default function ForgetPassword(): JSX.Element {
  return (
    <AuthLayout
      title="Recuperação de Conta"
      description="Abaixo se encontra as instruções da recuperação ao acesso de sua conta."
      icon={SendIcon}
    >
      <div className="px-2 py-4">
        <Alert variant="secondary">
          <MailCheck className="size-4" />

          <AlertTitle>E-mail Enviado com Sucesso</AlertTitle>
          <AlertDescription>
            Enviamos um e-mail com as instruções necessárias para recuperar o acesso à sua conta. Por favor, verifique
            sua caixa de entrada e também a pasta de spam ou lixo eletrônico, caso não encontre o e-mail.
          </AlertDescription>
        </Alert>
      </div>
    </AuthLayout>
  );
}
