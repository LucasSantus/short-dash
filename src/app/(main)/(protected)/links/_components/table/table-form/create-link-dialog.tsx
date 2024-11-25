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
import { createNewCode } from "@/utils/create-new-code";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { type LinkSchema, linkSchema } from "@/validation/main/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LinkForm } from "./link-form";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      code: createNewCode(),
      hasPassword: false,
    },
  });

  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.create.useMutation({
    onSuccess: () => {
      form.reset();

      toast.success(messages.globals.data.stored);

      setOpen(false);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, messages.globals.data.errorStored);

      toast.error(errorMessage);
    },
  });

  function onHandleSubmit(input: LinkSchema) {
    mutate(input);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" icon={<PlusIcon className="size-4" />}>
          Adicionar Link
        </Button>
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
