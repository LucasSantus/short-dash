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
import { Fragment, ReactNode } from "react";
import { LinkStatus } from "../../../_types/links";
import type { LinkTableColumns } from "../table-columns";
import { LinkBlockRow } from "./link-block-row";
import { LinkDeleteRow } from "./link-delete-row";
import { LinkDetailsRow } from "./link-details-row";
import { LinkEventRow } from "./link-event-row";
import { LinkUnBlockRow } from "./link-unblock-row";
import { LinkUpdateRow } from "./link-update-row";

interface DataTableRowActionsProps {
  row: Row<LinkTableColumns>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const link = row.original;

  const linkStatus: Record<LinkStatus, ReactNode> = {
    Active: <LinkBlockRow linkId={link.id} />,
    Inactive: <LinkUnBlockRow linkId={link.id} />,
    Expired: <Fragment />,
  };

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Open menu" variant="secondary" className="flex size-8 p-0">
            <EllipsisIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <LinkUpdateRow link={link} />
          <LinkDetailsRow link={link} />
          <LinkEventRow linkId={link.id} />
          <DropdownMenuSeparator />
          {linkStatus[link.status]}
          <DropdownMenuSeparator />
          <LinkDeleteRow linkId={link.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
