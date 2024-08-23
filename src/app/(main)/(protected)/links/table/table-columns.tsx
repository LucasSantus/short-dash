"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkResponse } from "@/hooks/api/queries/use-links";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableRowActions } from "./table-row-actions";

export type LinkTableColumns = LinkResponse;

export const getLinkLabelColumn: Record<keyof LinkTableColumns, string> = {
  id: "ID",
  name: "Nome",
  code: "Código",
  numberOfVisitors: "Número de Visitantes",
  path: "Url de Redirecionamento",
  ownerId: "Id do Dono",
};

export function getLinkTableColumns(): ColumnDef<LinkTableColumns>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.name}
          className="pl-2"
        />
      ),
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.code}
        />
      ),
      cell: ({ row }) => <span>{row.getValue("code")}</span>,
    },
    {
      accessorKey: "numberOfVisitors",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.numberOfVisitors}
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {row.getValue("numberOfVisitors")}
          </span>
          <span className="text-muted-foreground">Visitante(s)</span>
        </div>
      ),
    },
    {
      accessorKey: "path",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.path}
        />
      ),
      cell: ({ row }) => {
        const redirectUrl: string = row.getValue("path");

        return (
          <div className="max-w-60 truncate">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={redirectUrl}>{redirectUrl}</Link>
                </TooltipTrigger>
                <TooltipContent>
                  <Link href={redirectUrl}>{redirectUrl}</Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return <DataTableRowActions row={row} />;
      },
      maxSize: 30,
    },
  ];
}
