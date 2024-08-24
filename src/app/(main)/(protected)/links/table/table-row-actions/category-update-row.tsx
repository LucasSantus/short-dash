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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateLinkAction } from "../../_actions/update-link";
import {
  createLinkSchema,
  CreateLinkSchema,
  LinkForm,
} from "../form/link-form";
import { LinkTableColumns } from "../table-columns";

interface CategoryUpdateRowProps {
  link: LinkTableColumns;
}

export function LinkUpdateRow({ link }: CategoryUpdateRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      name: link.title ?? "",
      path: link.originalUrl ?? "",
    },
  });

  const { mutateAsync: updateLinkFn, isPending } = useMutation({
    mutationFn: async (values: any) => {
      await updateLinkAction(values);
    },
    onSuccess: async () => {
      // await updateCategoryOnCache({ categoryId, category: values });

      form.reset();

      setIsOpen(false);

      toast.success(messages.form.DATA_HAS_BEEN_UPDATED);
    },
    onError: (error) => {
      console.error(error);
      toast.error(messages.form.ERROR_DATA_HAS_BEEN_UPDATED);
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
        <PencilIcon className="size-4" />
        Editar
      </DropdownMenuItem>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Link</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para editar um link.
            </DialogDescription>
          </DialogHeader>
          <LinkForm form={form} onSubmit={updateLinkFn}>
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
    </Fragment>
  );
}
