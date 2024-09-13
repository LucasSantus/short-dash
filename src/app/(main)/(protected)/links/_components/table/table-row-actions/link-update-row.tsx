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
import { type LinkSchema, linkSchema } from "@/validation/main/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LinkForm } from "../form/link-form";
import type { LinkTableColumns } from "../table-columns";

interface CategoryUpdateRowProps {
  link: LinkTableColumns;
}

export function LinkUpdateRow({ link }: CategoryUpdateRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: link.title ?? "",
      description: link.description ?? "",
      originalUrl: link.originalUrl ?? "",
    },
  });

  const { mutate, isPending } = trpc.link.updateLinkMutation.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["link", "getLinks"] });

      form.reset();

      setIsOpen(false);

      toast.success(messages.form.DATA_HAS_BEEN_UPDATED);
    },
    onError: (error) => {
      console.error(error);
      toast.error(messages.form.ERROR_DATA_HAS_BEEN_UPDATED);
    },
  });

  function onHandleSubmit(input: LinkSchema) {
    mutate({
      ...input,
      id: link.id,
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
        icon={<PencilIcon className="size-4" />}
      >
        Atualizar
      </DropdownMenuItem>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Link</DialogTitle>
            <DialogDescription>Preencha os campos abaixo para atualizar as informações do link.</DialogDescription>
          </DialogHeader>
          <LinkForm form={form} onSubmit={onHandleSubmit} isPending={isPending}>
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isPending} icon={<XIcon className="size-4" />}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button isLoading={isPending} icon={<SaveIcon className="size-4" />}>
                Salvar
              </Button>
            </DialogFooter>
          </LinkForm>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
