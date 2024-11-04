import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { SelectTrigger } from "@radix-ui/react-select";
import { Table } from "@tanstack/react-table";
import { CheckCircleIcon, LoaderIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { LinkStatus } from "../../../_types/links";
import { LinkTableColumns, getLinkStatusDescription } from "../table-columns";

interface UpdateStatusFloatingBarItemProps {
  table: Table<LinkTableColumns>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export function UpdateStatusFloatingBarItem({
  table,
  isLoading,
  setIsLoading,
}: UpdateStatusFloatingBarItemProps): JSX.Element {
  const utils = trpc.useUtils();

  const { mutateAsync, isPending } = trpc.link.updateMultipleStatus.useMutation({
    onSuccess: () => {
      toast.success(messages.form.DATA_HAS_BEEN_UPDATED);

      table.toggleAllRowsSelected(false);
    },
    onSettled: async () => {
      await utils.link.invalidate();
    },
  });

  const rows = table.getFilteredSelectedRowModel().rows;

  async function handleUpdateStatus(value: LinkStatus) {
    const ids = rows.map((row) => row.original.id);

    setIsLoading(true);

    try {
      await mutateAsync({
        ids,
        status: value,
      });
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, messages.form.ERROR_DATA_HAS_BEEN_BLOCKED);

      toast.error(errorMessage);
    }

    setIsLoading(false);
  }

  return (
    <Select onValueChange={handleUpdateStatus}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SelectTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
              disabled={isPending || isLoading}
            >
              {isPending ? (
                <LoaderIcon className="size-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <CheckCircleIcon className="size-3.5" aria-hidden="true" />
              )}
            </Button>
          </SelectTrigger>
        </TooltipTrigger>
        <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
          <p>Atualizar Status</p>
        </TooltipContent>
      </Tooltip>

      <SelectContent>
        <SelectGroup>
          {Object.keys(getLinkStatusDescription).map((item) => {
            const enumStatus = item as LinkStatus;

            const { label, icon: Icon } = getLinkStatusDescription[enumStatus];

            return (
              <SelectItem key={enumStatus} value={enumStatus} className="pl-2 capitalize">
                <div className="flex items-center gap-1">
                  <Icon className="size-3.5" />
                  {label}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
