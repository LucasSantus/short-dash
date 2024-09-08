import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar Link</DialogTitle>
            <DialogDescription>Confirme para deletar o link</DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                disabled={isPending}
                icon={<XIcon className="size-4" />}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              isLoading={isPending}
              icon={<SaveIcon className="size-4" />}
              onClick={onHandleSubmit}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
