import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { type LinkSchema, linkSchema } from "@/validation/main/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, SaveIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { LinkTableColumns } from "../table-columns";
import { LinkForm } from "../table-form/link-form";

interface CategoryUpdateRowProps {
  link: LinkTableColumns;
}

export function LinkUpdateRow({ link }: CategoryUpdateRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: link.title ?? "",
      description: link.description ?? "",
      originalUrl: link.originalUrl ?? "",
    },
  });

  const { mutate, isPending } = trpc.link.update.useMutation({
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, messages.form.ERROR_DATA_HAS_BEEN_UPDATED);

      toast.error(errorMessage);
    },
    onSuccess: () => {
      form.reset();

      toast.success(messages.form.DATA_HAS_BEEN_UPDATED);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();

      setIsOpen(false);
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
        <SheetContent className="p-4">
          <SheetHeader>
            <SheetTitle>Atualizar Link</SheetTitle>
            <SheetDescription>Preencha os campos abaixo para atualizar as informações do link.</SheetDescription>
          </SheetHeader>

          <LinkForm form={form} onSubmit={onHandleSubmit} isPending={isPending}>
            <SheetFooter className="sm:!flex-col absolute inset-x-4 bottom-4">
              <div>
                <Alert>
                  <TriangleAlertIcon className="size-5" />
                  <AlertTitle>Atenção</AlertTitle>
                  <AlertDescription>Salve as alterações antes de sair.</AlertDescription>
                </Alert>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
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
              </div>
            </SheetFooter>
          </LinkForm>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
