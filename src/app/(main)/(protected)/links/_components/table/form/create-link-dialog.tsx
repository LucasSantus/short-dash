"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { type LinkSchema, linkSchema } from "@/validation/main/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LinkForm } from "./link-form";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
  });

  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.createLinkMutation.useMutation({
    onError: (error) => {
      console.error(error);

      if (error instanceof Error) toast.error(error.message);
    },
    onSettled: async () => {
      await utils.link.getLinksQuery.invalidate();

      form.reset();

      setOpen(false);

      toast.success(messages.form.DATA_HAS_BEEN_STORED);
    },
  });

  function onHandleSubmit(input: LinkSchema) {
    mutate(input);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Adicionar Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Link</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para criar um novo link.</DialogDescription>
        </DialogHeader>

        <LinkForm form={form} onSubmit={onHandleSubmit} isPending={isPending}>
          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <DialogClose asChild>
              <Button type="button" variant="secondary" icon={<XIcon className="size-4" />} disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button icon={<SaveIcon className="size-4" />} isLoading={isPending}>
              Salvar
            </Button>
          </DialogFooter>
        </LinkForm>
      </DialogContent>
    </Dialog>
  );
}
