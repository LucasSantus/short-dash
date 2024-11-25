import { messages } from "@/constants/messages";
import { KeyRoundIcon } from "lucide-react";
import { AuthLayout } from "../../_components/layout";

export default function NotFound() {
  return (
    <AuthLayout
      title="Recuperação de conta"
      description="Ops, houve um problema ao tentar recuperar as informações!"
      icon={KeyRoundIcon}
    >
      <span className="text-center">{messages.globals.user.notFound}</span>
    </AuthLayout>
  );
}
