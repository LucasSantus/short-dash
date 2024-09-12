import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";
import { SaveIcon, Trash2Icon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

interface LinkDeleteRowProps {
  linkId: string;
}

export function LinkDeleteRow({ linkId }: LinkDeleteRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = trpc.link.deleteLink.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["link", "getLinks"] });

      toast.success(messages.form.DATA_HAS_BEEN_DELETED);

      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(messages.form.ERROR_DATA_HAS_BEEN_DELETED);
    },
  });

  function onHandleSubmit() {
    mutate({
      id: linkId,
    });
  }

  return (
    <Fragment>
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
        className="flex items-center gap-2"
      >
        <Trash2Icon className="size-4" />
        Deletar
      </DropdownMenuItem>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação de Exclusão de Link</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir permanentemente este link do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Alert variant="destructive">
            <Trash2Icon className="h-4 w-4" />
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              Essa ação é irreversível e resultará na remoção definitiva do
              acesso ao link excluido. Deseja continuar com a exclusão?
            </AlertDescription>
          </Alert>

          <AlertDialogFooter className="gap-2 pt-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button
                type="button"
                variant="secondary"
                disabled={isPending}
                icon={<XIcon className="size-4" />}
              >
                Cancelar
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                isLoading={isPending}
                icon={<SaveIcon className="size-4" />}
                onClick={onHandleSubmit}
              >
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
