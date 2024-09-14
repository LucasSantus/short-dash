import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
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
import { BanIcon, Trash2Icon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { LinkStatus } from "../../../_types/links";

interface LinkBlockRowProps {
  linkId: string;
}

export function LinkBlockRow({ linkId }: LinkBlockRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.updateStatus.useMutation({
    onError: (error) => {
      console.error(error);

      toast.error(messages.form.DATA_HAS_BEEN_BLOCKED);
    },
    onSuccess: () => {
      toast.success(messages.form.DATA_HAS_BEEN_BLOCKED);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();

      setIsOpen(false);
    },
  });

  function onHandleSubmit() {
    mutate({
      id: linkId,
      status: LinkStatus.Inactive,
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
        icon={<BanIcon className="size-4" />}
      >
        Bloquear
      </DropdownMenuItem>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação de Bloqueio de Link</AlertDialogTitle>
            <AlertDialogDescription>Você está prestes a bloquear este link.</AlertDialogDescription>
          </AlertDialogHeader>

          <Alert>
            <BanIcon className="h-4 w-4" />
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Esta ação resultará no bloqueio do link, impactando diretamente a gestão e o controle de acessos
              associados. Deseja realmente prosseguir com este bloqueio?
            </AlertDescription>
          </Alert>

          <AlertDialogFooter className="gap-2 pt-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button type="button" variant="secondary" disabled={isPending} icon={<XIcon className="size-4" />}>
                Cancelar
              </Button>
            </AlertDialogCancel>

            <Button isLoading={isPending} icon={<Trash2Icon className="size-4" />} onClick={onHandleSubmit}>
              Continuar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
