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
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DeactiveAccountAlertDialogProps {
  userId: string;
}

export function DeactiveAccountAlertDialog({ userId }: DeactiveAccountAlertDialogProps): JSX.Element {
  const { mutate, isPending } = useMutation({
    mutationKey: ["mutation-user-deleting-by-id", userId],
    mutationFn: async ({ userId }: DeactiveAccountAlertDialogProps) => {},
    onError: () => toast.error("Não foi possível excluir sua conta. Tente novamente mais tarde."),
  });

  async function onHandleDeleteUser() {
    mutate({ userId });
  }

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
          <AlertDialogCancel disabled={isPending}>Fechar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onHandleDeleteUser}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
