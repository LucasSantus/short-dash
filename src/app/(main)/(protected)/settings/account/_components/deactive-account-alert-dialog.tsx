import { logOut } from "@/actions/auth/logout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeactiveAccountAlertDialog(): JSX.Element {
  const [isPendingLogout, startLogoutTransition] = useTransition();

  const { mutate, isPending } = trpc.user.deactivate.useMutation({
    onSuccess: async () => {
      toast.success("A conta foi desativada com sucesso!");

      startLogoutTransition(() => logOut());
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, "Ocorreu uma falha ao tentar alterar a senha do usuário!");

      toast.error(errorMessage);
    },
  });

  async function onSubmit() {
    mutate();
  }

  const isLoading = isPendingLogout || isPending;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          aria-label="delete user"
          isLoading={isPending}
          variant="destructive"
          icon={<Trash2Icon />}
          size="sm"
        >
          Desativar Conta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Desativar Conta</AlertDialogTitle>
          <AlertDialogDescription>Ao confirmar essa ação, sua conta será desativada do sistema.</AlertDialogDescription>
        </AlertDialogHeader>
        <Alert variant="destructive">
          <AlertDescription>
            Tem certeza absoluta de que pretende desativar a sua conta? Logo após a confirmação, não será possível
            recupera-la.
          </AlertDescription>
        </Alert>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Fechar</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onSubmit} className="flex items-center gap-2">
            {isLoading && <LoaderIcon className="size-4 animate-spin" />}
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
