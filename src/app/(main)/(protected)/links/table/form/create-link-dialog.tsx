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
import { linkSchema, LinkSchema } from "@/validation/main/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LinkForm } from "./link-form";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
  });

  const { mutate, isPending } = trpc.link.createLink.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["link", "getLinks"] });

      form.reset();

      setOpen(false);

      toast.success(messages.form.DATA_HAS_BEEN_STORED);
    },
    onError: (error) => {
      console.error(error);

      if (error instanceof Error) toast.error(error.message);
    },
  });

  function onHandleSubmit(input: LinkSchema) {
    mutate(input);
  }

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

        {/* {error && <p>Something went wrong! {error.message}</p>} */}

        <LinkForm form={form} onSubmit={onHandleSubmit}>
          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                icon={<XIcon className="size-4" />}
                disabled={isPending}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              icon={<SaveIcon className="size-4" />}
              isLoading={isPending}
            >
              Salvar
            </Button>
          </DialogFooter>
        </LinkForm>
      </DialogContent>
    </Dialog>
  );
}
