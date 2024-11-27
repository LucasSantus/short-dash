import { messages } from "@/constants/messages";
import { TriangleAlertIcon } from "lucide-react";
import { AuthLayout } from "../_components/layout";

export default function Failed() {
  return (
    <AuthLayout
      title="Erro!"
      description="Ops, houve um problema ao tentar recuperar as informações do usuário!"
      icon={TriangleAlertIcon}
    >
      <div className="py-4">{messages.globals.error.errorNotFound}</div>
    </AuthLayout>
  );
}
