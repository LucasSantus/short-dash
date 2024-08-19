import { BlockDialog } from "@/components/block-dialog";
import { messages } from "@/constants/messages";
import { blockCategoryMutation } from "@/graphql/mutations/block-category";
import { graphQLClient } from "@/lib/graphql-request/client";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { useCategoryOnCache } from "../../../_hooks/use-category-on-cache";
import { AllProductCategoryStatus } from "../../../_types/all-product-categories";

interface CategoryBlockStatusDialogProps {
  categoryId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CategoryBlockStatusDialog({
  categoryId,
  isOpen,
  setIsOpen,
}: CategoryBlockStatusDialogProps): JSX.Element {
  const { updateCategoryStatusOnCache } = useCategoryOnCache();

  const { mutate: blockCategoryFn, isPending: isBlockCategoryPending } = useMutation({
    mutationFn: async () =>
      await graphQLClient.request(blockCategoryMutation, {
        id: categoryId,
      }),
    async onSuccess() {
      await updateCategoryStatusOnCache({ categoryId, newStatus: AllProductCategoryStatus.Blocked });

      setIsOpen(false);

      toast.success(messages.form.DATA_HAS_BEEN_BLOCKED);
    },
    onError(error) {
      console.error(error);
      toast.error(messages.form.ERROR_DATA_HAS_BEEN_BLOCKED);
    },
  });

  return (
    <BlockDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={isBlockCategoryPending}
      onHandleClick={() => blockCategoryFn()}
      messages={{
        dialogTitle: "Confirmar Bloqueio de Categoria",
        dialogDescription: "Você tem certeza de que deseja bloquear esta categoria?",
        alertDescription:
          "Bloquear esta categoria fará com que ela não seja mais visível para os usuários na plataforma.",
      }}
    />
  );
}
