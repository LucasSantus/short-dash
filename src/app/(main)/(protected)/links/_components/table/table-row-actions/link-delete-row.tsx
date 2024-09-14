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
import { OctagonAlertIcon, Trash2Icon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

interface LinkDeleteRowProps {
  linkId: string;
}

export function LinkDeleteRow({ linkId }: LinkDeleteRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.delete.useMutation({
    onError: (error) => {
      console.error(error);

      toast.error(messages.form.ERROR_DATA_HAS_BEEN_DELETED);
    },
    onSuccess: async () => {
      toast.success(messages.form.DATA_HAS_BEEN_DELETED);
    },
    onSettled: async () => {
      utils.link.list.invalidate();

      setIsOpen(false);
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
        icon={<Trash2Icon className="size-4" />}
      >
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
            <OctagonAlertIcon className="size-4" />
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              Essa ação é irreversível e resultará na remoção definitiva do acesso ao link excluido. Deseja continuar
              com a exclusão?
            </AlertDescription>
          </Alert>

          <AlertDialogFooter className="gap-2 pt-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button type="button" variant="secondary" disabled={isPending} icon={<XIcon className="size-4" />}>
                Cancelar
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button isLoading={isPending} icon={<Trash2Icon className="size-4" />} onClick={onHandleSubmit}>
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
