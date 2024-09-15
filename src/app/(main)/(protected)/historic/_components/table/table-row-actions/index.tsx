"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Row } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import type { HistoricTableColumns } from "../table-columns";

interface DataTableRowActionsProps {
  row: Row<HistoricTableColumns>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const link = row.original;

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Open menu" variant="secondary" className="flex size-8 p-0">
            <EllipsisIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          sda
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
