import { DataTableFloatingBar } from "@/components/data-table/data-table-floating-bar";
import { type Table } from "@tanstack/react-table";
import { useTransition } from "react";
import { LinkTableColumns } from "../table-columns";
import { DeleteFloatingBarItem } from "./delete-floating-bar-item";
import { UpdateStatusFloatingBarItem } from "./update-status-floating-bar-item";

interface LinkTableFloatingBarProps {
  table: Table<LinkTableColumns>;
}

export function LinkTableFloatingBar({ table }: LinkTableFloatingBarProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <DataTableFloatingBar table={table}>
      <UpdateStatusFloatingBarItem table={table} isDisabled={isPending} startTransition={startTransition} />
      <DeleteFloatingBarItem table={table} isDisabled={isPending} startTransition={startTransition} />
    </DataTableFloatingBar>
  );
}
