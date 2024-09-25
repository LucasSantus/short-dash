"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UserCheckIcon, UserXIcon } from "lucide-react";
import { DataTableRowActions } from "./table-row-actions";

export type HistoricTableColumns = {
  id: string;
  userName?: string;
  linkName: string;
  isAnonymousAccess: boolean;
  originalUrl: string;
  dateTimeOfAccess: Date;
};

export const getHistoricLabelColumn: Record<keyof HistoricTableColumns, string> = {
  id: "ID",
  userName: "Nome de Usuário",
  linkName: "Url Acessada",
  isAnonymousAccess: "Anônimato",
  originalUrl: "Url Original",
  dateTimeOfAccess: "Data e Hora do Acesso",
};

export function getHistoricColumns(): Array<ColumnDef<HistoricTableColumns>> {
  return [
    {
      accessorKey: "userName",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getHistoricLabelColumn.userName} />,
      cell: ({ row }) => {
        const userName = row.original.userName ?? "-";

        return <div className="w-full min-w-48 max-w-52 truncate">{userName}</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "linkName",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getHistoricLabelColumn.linkName} />,
      cell: ({ row }) => {
        const linkName = row.original.linkName;

        return <span>{linkName}</span>;
      },
    },
    {
      accessorKey: "originalUrl",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getHistoricLabelColumn.originalUrl} />,
      cell: ({ row }) => {
        const originalUrl = row.original.originalUrl;

        return <div className="w-full max-w-72 truncate text-muted-foreground">{originalUrl}</div>;
      },
    },
    {
      accessorKey: "dateTimeOfAccess",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getHistoricLabelColumn.dateTimeOfAccess} />,
      cell: ({ row }) => {
        const dateTimeOfAccess = row.original.dateTimeOfAccess;

        const dateTimeOfAccessFormmated = format(dateTimeOfAccess, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
          locale: ptBR,
        });

        return <span className="text-muted-foreground">{dateTimeOfAccessFormmated}</span>;
      },
    },
    {
      accessorKey: "isAnonymousAccess",
      header: ({}) => <></>,
      cell: ({ row }) => {
        const isAnonymousAccess = row.original.isAnonymousAccess;

        return (
          <div className="w-full flex items-center space-x-2 min-w-28">
            {isAnonymousAccess ? (
              <div className="flex items-center text-red-500/70">
                <UserXIcon className="size-4" />
                <span className="ml-2">Usuário Anônimo</span>
              </div>
            ) : (
              <div className="flex items-center text-green-500/70">
                <UserCheckIcon className="size-4" />
                <span className="ml-2">Usuário Logado</span>
              </div>
            )}
          </div>
        );
      },
      size: 40,
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
