import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { BanIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { LinkStatus } from "../../../_types/links";

interface LinkUnBlockRowProps {
  linkId: string;
}

export function LinkUnBlockRow({ linkId }: LinkUnBlockRowProps): JSX.Element {
  const utils = trpc.useUtils();

  const { mutate, isPending } = trpc.link.updateStatus.useMutation({
    onError: (error) => {
      console.error(error);

      toast.error(messages.form.DATA_HAS_BEEN_UNBLOCKED);
    },
    onSuccess: () => {
      toast.success(messages.form.DATA_HAS_BEEN_UNBLOCKED);
    },
    onSettled: async () => {
      await utils.link.list.invalidate();
    },
  });

  function onHandleSubmit() {
    mutate({
      id: linkId,
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
      icon={isPending ? <Loader2Icon className="size-4 animate-spin" /> : <BanIcon className="size-4" />}
    >
      Desbloquear
    </DropdownMenuItem>
  );
}
