import { DataTableFloatingBar } from "@/components/data-table/data-table-floating-bar";
import { type Table } from "@tanstack/react-table";
import { useState } from "react";
import { LinkTableColumns } from "../table-columns";
import { DeleteFloatingBarItem } from "./delete-floating-bar-item";
import { UpdateStatusFloatingBarItem } from "./update-status-floating-bar-item";

interface LinkTableFloatingBarProps {
  table: Table<LinkTableColumns>;
}

export function LinkTableFloatingBar({ table }: LinkTableFloatingBarProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <DataTableFloatingBar table={table}>
      <UpdateStatusFloatingBarItem table={table} isLoading={isLoading} setIsLoading={setIsLoading} />
      <DeleteFloatingBarItem table={table} isLoading={isLoading} setIsLoading={setIsLoading} />
    </DataTableFloatingBar>
  );
}
