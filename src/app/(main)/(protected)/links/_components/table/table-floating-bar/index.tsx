import { DataTableFloatingBar } from "@/components/data-table/data-table-floating-bar";
import { type Table } from "@tanstack/react-table";
import { useState, useTransition } from "react";
import { LinkTableColumns } from "../table-columns";
import { DeleteFloatingBarItem } from "./delete-floating-bar-item";

export type LinkFloatingBarMethod = "update-status" | "delete";

interface LinkTableFloatingBarProps {
  table: Table<LinkTableColumns>;
}

export function LinkTableFloatingBar({ table }: LinkTableFloatingBarProps) {
  const [isPending, startPendingTransition] = useTransition();
  const [method, setMethod] = useState<LinkFloatingBarMethod>();

  return (
    <DataTableFloatingBar table={table}>
      {/* <Select
              onValueChange={(value: Task["status"]) => {
                setMethod("update-status");

                startTransition(async () => {
                  // const { error } = await updateLink({
                  //   ids: rows.map((row) => row.original.id),
                  //   status: value,
                  // });

                  // if (error) {
                  //   toast.error(error);
                  //   return;
                  // }

                  toast.success("Link updated");
                });
              }}
            >
              <Tooltip delayDuration={250}>
                <SelectTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                      disabled={isPending}
                    >
                      {isPending && method === "update-status" ? (
                        <Loader2Icon className="size-3.5 animate-spin" aria-hidden="true" />
                      ) : (
                        <CheckCircleIcon className="size-3.5" aria-hidden="true" />
                      )}
                    </Button>
                  </TooltipTrigger>
                </SelectTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                  <p>Update status</p>
                </TooltipContent>
              </Tooltip>
              <SelectContent align="center">
                <SelectGroup>
                  {Link.status.enumValues.map((status) => (
                    <SelectItem key={status} value={status} className="capitalize">
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
      <DeleteFloatingBarItem table={table} startPendingTransition={startPendingTransition} />
    </DataTableFloatingBar>
  );
}
