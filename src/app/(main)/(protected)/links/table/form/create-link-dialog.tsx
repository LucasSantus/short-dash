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
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SaveIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LinkForm, LinkSchema, linkSchema } from "./link-form";

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  // const queryClient = useQueryClient();

  const { mutate, isPending } = trpc.createLink.useMutation();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
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
