import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { Table } from "@tanstack/react-table";
import { Loader2Icon, Trash2Icon, TrashIcon, XIcon } from "lucide-react";
import { TransitionStartFunction } from "react";
import { toast } from "sonner";
import { LinkTableColumns } from "../table-columns";

interface DeleteFloatingBarItemProps {
  table: Table<LinkTableColumns>;
  isDisabled: boolean;
  startTransition: TransitionStartFunction;
}

export function DeleteFloatingBarItem({ table, isDisabled, startTransition }: DeleteFloatingBarItemProps): JSX.Element {
  const utils = trpc.useUtils();

  const { mutateAsync, isPending } = trpc.link.deleteMultiple.useMutation({
    onError: (error) => {
      console.error(error);

      if (error instanceof Error) toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(messages.form.DATA_HAS_BEEN_DELETED);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();

      table.toggleAllRowsSelected(false);
    },
  });

  const rows = table.getFilteredSelectedRowModel().rows;

  async function handleDeleteLinks() {
    const ids = rows.map((row) => row.original.id);

    startTransition(() =>
      mutateAsync({
        ids,
      })
    );
  }

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-7 border"
              disabled={isPending || isDisabled}
              icon={
                isPending ? (
                  <Loader2Icon className="size-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <TrashIcon className="size-3.5" aria-hidden="true" />
                )
              }
            />
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
          <p>Deletar Links</p>
        </TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmação de Exclusão de Links</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a excluir permanentemente varias links do sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Alert variant="destructive">
          <Trash2Icon className="h-4 w-4" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Essa ação é irreversível e resultará na remoção definitiva do acesso aos links excluidos. Deseja continuar
            com a exclusão?
          </AlertDescription>
        </Alert>

        <AlertDialogFooter className="gap-2 pt-2 sm:space-x-0">
          <AlertDialogCancel asChild>
            <Button variant="secondary" icon={<XIcon className="size-4" />} disabled={isPending}>
              Cancelar
            </Button>
          </AlertDialogCancel>

          <Button icon={<Trash2Icon className="size-4" />} onClick={handleDeleteLinks} isLoading={isPending}>
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
