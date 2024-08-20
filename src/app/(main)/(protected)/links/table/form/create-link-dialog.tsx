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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createLinkAction } from "../../_actions/create-link";
import { createLinkSchema, CreateLinkSchema, LinkForm } from "./link-form";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
  });

  const { mutateAsync: createLinkFn, isPending } = useMutation({
    mutationFn: async (values: CreateLinkSchema) =>
      await createLinkAction(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === "links";
        },
      });

      form.reset();

      setOpen(false);

      toast.success(messages.form.DATA_HAS_BEEN_STORED);
    },
    onError: (error) => {
      console.error(error);

      if (error instanceof Error) toast.error(error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          icon={<PlusIcon className="size-4" aria-hidden="true" />}
        >
          Novo Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Link</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um novo link.
          </DialogDescription>
        </DialogHeader>
        <LinkForm form={form} onSubmit={createLinkFn}>
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
            >
              Salvar
            </Button>
          </DialogFooter>
        </LinkForm>
      </DialogContent>
    </Dialog>
  );
}
