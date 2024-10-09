import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { TRPCClientError } from "@trpc/client";
import { LoaderIcon, UnlockIcon } from "lucide-react";
import { toast } from "sonner";
import { LinkStatus } from "../../../_types/links";

interface LinkUnBlockRowProps {
  linkId: string;
}

export function LinkUnBlockRow({ linkId }: LinkUnBlockRowProps): JSX.Element {
  const utils = trpc.useUtils();

  const { mutateAsync, isPending } = trpc.link.updateStatus.useMutation({
    onSuccess: () => {
      toast.success(messages.form.DATA_HAS_BEEN_UNBLOCKED);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();
    },
  });

  async function onHandleSubmit() {
    try {
      await mutateAsync({
        id: linkId,
        status: LinkStatus.Active,
      });
    } catch (error) {
      let errorMessage = messages.form.ERROR_DATA_HAS_BEEN_BLOCKED;

      if (error instanceof TRPCClientError) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
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
