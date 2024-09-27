"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Row } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import { useHistoricFilters } from "../../../_hooks/use-historic-filters";
import type { EventTableColumns } from "../table-columns";

interface DataTableRowActionsProps {
  row: Row<EventTableColumns>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setFilters } = useHistoricFilters();
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
          <DropdownMenuItem
            onClick={() =>
              setFilters({
                linkIds: [link.id],
              })
            }
          >
            Adicionar LinkId
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
