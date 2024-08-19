"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { LinkResponse } from "@/hooks/api/queries/use-links";
import { type ColumnDef } from "@tanstack/react-table";
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
      id: "actions",
      cell: function Cell({ row }) {
        return <DataTableRowActions row={row} />;
      },
      maxSize: 30,
    },
  ];
}
