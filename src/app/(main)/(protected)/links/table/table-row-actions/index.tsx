"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import { LinkTableColumns } from "../table-columns";
import { LinkUpdateRow } from "./category-update-row";
import { LinkDeleteRow } from "./link-delete-row";

interface DataTableRowActionsProps {
  row: Row<LinkTableColumns>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const link = row.original;

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="secondary"
            className="flex size-8 p-0"
          >
            <EllipsisIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <LinkUpdateRow link={link} />
          <DropdownMenuSeparator />
          <LinkDeleteRow linkId={link.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
