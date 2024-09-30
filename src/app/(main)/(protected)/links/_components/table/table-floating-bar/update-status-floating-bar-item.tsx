import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { SelectTrigger } from "@radix-ui/react-select";
import { Table } from "@tanstack/react-table";
import { TRPCClientError } from "@trpc/client";
import { CheckCircleIcon, Loader2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { linkStatusDescription } from "../../../_constants/status";
import { LinkStatus } from "../../../_types/links";
import { LinkTableColumns } from "../table-columns";

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
    },
    onSettled: async () => {
      await utils.link.list.invalidate();

      table.toggleAllRowsSelected(false);
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
      let errorMessage = messages.form.ERROR_DATA_HAS_BEEN_BLOCKED;

      if (error instanceof TRPCClientError) {
        errorMessage = error.message;
      }

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
                <Loader2Icon className="size-3.5 animate-spin" aria-hidden="true" />
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
          {Object.keys(linkStatusDescription).map((item) => {
            const enumStatus = item as LinkStatus;

            const { label, icon: Icon } = linkStatusDescription[enumStatus];

            return (
              <SelectItem key={enumStatus} value={enumStatus} className="capitalize pl-2">
                <div className="flex gap-1 items-center">
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
