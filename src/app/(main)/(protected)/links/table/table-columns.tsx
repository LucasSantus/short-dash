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
  title: "Nome",
  description: "Descrição",
  code: "Código",
  numberOfVisitors: "Número de Visitantes",
  originalUrl: "Url de Redirecionamento",
  shortUrl: "Url Gerada",
  ownerId: "Id do Dono",
  createdAt: "Criada em",
  updatedAt: "Atualizada em",
  expiresAt: "Expira em",
};

export function getLinkTableColumns(): ColumnDef<LinkTableColumns>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.title}
          className="pl-2"
        />
      ),
      cell: ({ row }) => <span>{row.getValue("title")}</span>,
      enableHiding: false,
    },
    {
      accessorKey: "originalUrl",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.originalUrl}
        />
      ),
      cell: ({ row }) => {
        const redirectUrl: string = row.getValue("path");

        return (
          <div className="max-w-60 truncate">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={redirectUrl}
                    target="_blank"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {redirectUrl}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <Link href={redirectUrl} target="_blank">
                    {redirectUrl}
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      accessorKey: "shortUrl",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.shortUrl}
        />
      ),
      cell: ({ row }) => {
        const shortUrl: string = row.getValue("shortUrl");

        return (
          <div className="max-w-60 truncate">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={shortUrl}
                    target="_blank"
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {shortUrl}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <Link href={shortUrl} target="_blank">
                    {shortUrl}
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
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
      id: "actions",
      cell: function Cell({ row }) {
        return <DataTableRowActions row={row} />;
      },
      maxSize: 30,
    },
  ];
}
