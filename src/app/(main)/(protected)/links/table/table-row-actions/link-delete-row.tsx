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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SaveIcon, Trash2Icon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

interface LinkDeleteRowProps {
  linkId: string;
}

export function LinkDeleteRow({ }: LinkDeleteRowProps): JSX.Element {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutateAsync: updateLinkFn, isPending } = useMutation({
    mutationFn: async () =>
      {},
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "links";
        },
      });

      toast.success("foi po carai");

      setIsOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("deu erro na hora de ir po carai");
    },
  });

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
              onClick={() => {
                updateLinkFn();
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
