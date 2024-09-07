import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PencilIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { LinkTableColumns } from "../table-columns";

interface CategoryUpdateRowProps {
  link: LinkTableColumns;
}

export function LinkUpdateRow({  }: CategoryUpdateRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const form = useForm<UpdateLinkSchema>({
  //   resolver: zodResolver(updateLinkSchema),
  //   defaultValues: {
  //     title: link.title ?? "",
  //     description: link.description ?? "",
  //     originalUrl: link.originalUrl ?? "",
  //   },
  // });

  // const { mutateAsync: updateLinkFn, isPending } = useMutation({
  //   mutationFn: async (values: UpdateLinkSchema) =>
  //     await updateLinkAction(values),
  //   onSuccess: async () => {
  //     // await updateCategoryOnCache({ categoryId, category: values });

  //     form.reset();

  //     setIsOpen(false);

  //     toast.success(messages.form.DATA_HAS_BEEN_UPDATED);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     toast.error(messages.form.ERROR_DATA_HAS_BEEN_UPDATED);
  //   },
  // });

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
          {/* <LinkForm form={form} onSubmit={updateLinkFn}>
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
          </LinkForm> */}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
