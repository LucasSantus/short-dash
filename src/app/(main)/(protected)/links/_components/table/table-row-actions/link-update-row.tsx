import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

  const { mutate, isPending } = trpc.link.update.useMutation({
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

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="max-w-3xl w-full">
          <SheetHeader>
            <SheetTitle>Atualizar Link</SheetTitle>
            <SheetDescription>Preencha os campos abaixo para atualizar as informações do link.</SheetDescription>
          </SheetHeader>
          <LinkForm form={form} onSubmit={onHandleSubmit} isPending={isPending}>
            <SheetFooter className="gap-2 pt-2 sm:space-x-0 justify-between">
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isPending}
                  icon={<XIcon className="size-4" />}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button isLoading={isPending} icon={<SaveIcon className="size-4" />} className="w-full">
                Salvar
              </Button>
            </SheetFooter>
          </LinkForm>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
