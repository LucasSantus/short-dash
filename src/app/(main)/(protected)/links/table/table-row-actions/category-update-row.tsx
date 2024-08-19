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
import { updateCategoryMutation } from "@/graphql/mutations/update-category";
import { graphQLClient } from "@/lib/graphql-request/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCategoryOnCache } from "../../_hooks/use-category-on-cache";
import { categorySchema, CategorySchema, LinkForm } from "../form/link-form";
import { CategoryTableColumns } from "../table-columns";

interface CategoryUpdateRowProps {
  categoryId: string;
  category: CategoryTableColumns;
}

export function CategoryUpdateRow({
  categoryId,
  category,
}: CategoryUpdateRowProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { updateCategoryOnCache } = useCategoryOnCache();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name ?? "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CategorySchema) {
    try {
      await graphQLClient.request(updateCategoryMutation, {
        id: categoryId,
        input: {
          name: values.name,
        },
      });

      await updateCategoryOnCache({ categoryId, category: values });

      form.reset();

      setIsOpen(false);

      toast.success(messages.form.DATA_HAS_BEEN_UPDATED);
    } catch (error) {
      console.error(error);
      toast.error(messages.form.ERROR_DATA_HAS_BEEN_UPDATED);
    }
  }

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
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para editar uma categoria.
            </DialogDescription>
          </DialogHeader>
          <LinkForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isSubmitting}
                  icon={<XIcon className="size-4" />}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                isLoading={isSubmitting}
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
