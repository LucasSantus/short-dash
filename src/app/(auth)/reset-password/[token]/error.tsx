"use client";

import ErrorHandling from "@/components/error-handling";
import { ErrorHandlingData } from "@/types/error-handling";
import { KeyRoundIcon } from "lucide-react";
import { AuthLayout } from "../../_components/layout";

export default function ResetPasswordErrorHandling({ error }: ErrorHandlingData) {
  return (
    <AuthLayout
      title="Resetar Senha"
      description="Ops, houve um problema ao tentar recuperar as informações do usuário!"
      icon={KeyRoundIcon}
    >
      <div className="py-4">
        <ErrorHandling error={error} />
      </div>
    </AuthLayout>
  );
}
