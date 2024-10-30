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
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { LockIcon, OctagonAlertIcon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { LinkStatus } from "../../../_types/links";

interface LinkBlockRowProps {
  linkId: string;
}

export function LinkBlockRow({ linkId }: LinkBlockRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.updateMultipleStatus.useMutation({
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, messages.form.ERROR_DATA_HAS_BEEN_BLOCKED);

      toast.error(errorMessage);
    },
    onSuccess: () => {
      toast.success(messages.form.DATA_HAS_BEEN_BLOCKED);

      setIsOpen(false);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();
    },
  });

  async function onHandleSubmit() {
    mutate({
      ids: [linkId],
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
        icon={<LockIcon className="size-4" />}
      >
        Desativar
      </DropdownMenuItem>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação de Desativação de Link</AlertDialogTitle>
            <AlertDialogDescription>Você está prestes a desativar este link.</AlertDialogDescription>
          </AlertDialogHeader>

          <Alert variant="destructive">
            <OctagonAlertIcon className="h-4 w-4" />
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              Esta ação resultará na desativação do link, impactando diretamente na gestão e no controle de acessos
              associados. Deseja realmente prosseguir com esta desativação?
            </AlertDescription>
          </Alert>

          <AlertDialogFooter className="gap-2 pt-2 sm:space-x-0">
            <AlertDialogCancel asChild>
              <Button type="button" variant="secondary" disabled={isPending} icon={<XIcon className="size-4" />}>
                Cancelar
              </Button>
            </AlertDialogCancel>

            <Button
              isLoading={isPending}
              icon={<LockIcon className="size-4" />}
              onClick={onHandleSubmit}
              variant="destructive"
            >
              Desativar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
}
