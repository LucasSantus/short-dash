import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { messages } from "@/constants/messages";
import { unBlockCategoryMutation } from "@/graphql/mutations/unblock-category";
import { graphQLClient } from "@/lib/graphql-request/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, Lock } from "lucide-react";
import { toast } from "sonner";
import { useCategoryOnCache } from "../../_hooks/use-category-on-cache";
import { AllProductCategoryStatus } from "../../_types/all-product-categories";

interface CategoryUnBlockStatusRowProps {
  categoryId: string;
}

export function CategoryUnBlockStatusRow({ categoryId }: CategoryUnBlockStatusRowProps): JSX.Element {
  const { updateCategoryStatusOnCache } = useCategoryOnCache();

  const { mutate: unBlockCategoryFn, isPending: isUnBlockCategoryPending } = useMutation({
    mutationFn: async () =>
      await graphQLClient.request(unBlockCategoryMutation, {
        id: categoryId,
      }),
    onSuccess() {
      updateCategoryStatusOnCache({
        categoryId,
        newStatus: AllProductCategoryStatus.Active,
      });

      toast.success(messages.form.DATA_HAS_BEEN_UNBLOCKED);
    },
    onError(error) {
      console.error(error);
      toast.error(messages.form.ERROR_DATA_HAS_BEEN_UNBLOCKED);
    },
  });

  return (
    <DropdownMenuItem className="flex gap-2 items-center" onClick={() => unBlockCategoryFn()}>
      {isUnBlockCategoryPending ? <Loader2Icon className="animate-spin size-4" /> : <Lock className="size-4" />}
      Desbloquear
    </DropdownMenuItem>
  );
}
