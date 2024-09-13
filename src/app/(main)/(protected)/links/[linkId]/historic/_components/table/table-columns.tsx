"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type HistoricTableColumns = {
  id: string;
  userName: string;
  isAnonymousAccess: boolean;
  originalUrl: string;
  shortUrl: string;
  dateTimeOfAccess: Date;
};

export const getHistoricLabelColumn: Record<keyof HistoricTableColumns, string> = {
  id: "ID",
  userName: "Usuario",
  isAnonymousAccess: "ID",
  originalUrl: "ID",
  shortUrl: "ID",
  dateTimeOfAccess: "ID",
};

export function getHistoricTableColumns(): Array<ColumnDef<HistoricTableColumns>> {
  return [
    {
      accessorKey: "isAnonymousAccess",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={getHistoricLabelColumn.isAnonymousAccess} className="pl-2" />
      ),
      cell: ({ row }) => {
        const isAnonymousAccess = row.original.isAnonymousAccess;

        if (isAnonymousAccess) {
          return <div className="max-w-44 truncate">Sim</div>;
        }

        return <div className="max-w-44 truncate">Nao</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "userName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={getHistoricLabelColumn.userName} className="pl-2" />
      ),
      cell: ({ row }) => {
        const userName = row.original.userName;

        return <div className="max-w-44 truncate">{userName}</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "originalUrl",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getHistoricLabelColumn.originalUrl} />,
      cell: ({ row }) => {
        const originalUrl = row.original.originalUrl;

        return <div className="w-52 text-muted-foreground">{originalUrl}</div>;
      },
    },
    {
      accessorKey: "shortUrl",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getHistoricLabelColumn.shortUrl} />,
      cell: ({ row }) => {
        const shortUrl = row.original.shortUrl;

        return <div className="w-52 text-muted-foreground">{shortUrl}</div>;
      },
    },
    {
      accessorKey: "dateTimeOfAccess",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getHistoricLabelColumn.dateTimeOfAccess} />,
      cell: ({ row }) => {
        const dateTimeOfAccess = row.original.dateTimeOfAccess;

        const dateTimeOfAccessFormmated = format(dateTimeOfAccess, "dd/MM/yyyy");

        return <span className="text-muted-foreground">{dateTimeOfAccessFormmated}</span>;
      },
    },
  ];
}
