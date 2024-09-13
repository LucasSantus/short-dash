"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Row } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import type { LinkTableColumns } from "../table-columns";
import { LinkDeleteRow } from "./link-delete-row";
import { LinkDetailsRow } from "./link-details-row";
import { LinkHistoricRow } from "./link-historic-row";
import { LinkUpdateRow } from "./link-update-row";

interface DataTableRowActionsProps {
  row: Row<LinkTableColumns>;
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
        <DropdownMenuContent align="end" className="w-44">
          <LinkUpdateRow link={link} />
          <DropdownMenuSeparator />
          <LinkHistoricRow linkId={link.id} />
          <LinkDetailsRow link={link} />
          <DropdownMenuSeparator />
          <LinkDeleteRow linkId={link.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
