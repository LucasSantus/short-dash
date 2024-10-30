import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { LoaderIcon, UnlockIcon } from "lucide-react";
import { toast } from "sonner";
import { LinkStatus } from "../../../_types/links";

interface LinkUnBlockRowProps {
  linkId: string;
}

export function LinkUnBlockRow({ linkId }: LinkUnBlockRowProps): JSX.Element {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.updateMultipleStatus.useMutation({
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, messages.form.ERROR_DATA_HAS_BEEN_BLOCKED);

      toast.error(errorMessage);
    },
    onSuccess: () => {
      toast.success(messages.form.DATA_HAS_BEEN_UNBLOCKED);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();
    },
  });

  async function onHandleSubmit() {
    mutate({
      ids: [linkId],
      status: LinkStatus.Active,
    });
  }

  return (
    <DropdownMenuItem
      onSelect={(event) => {
        event.preventDefault();

        onHandleSubmit();
      }}
      className="flex items-center gap-2"
      icon={isPending ? <LoaderIcon className="size-4 animate-spin" /> : <UnlockIcon className="size-4" />}
    >
      Ativar
    </DropdownMenuItem>
  );
}
