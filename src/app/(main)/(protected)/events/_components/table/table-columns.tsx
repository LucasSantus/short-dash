"use client";

import { CopyButton } from "@/components/copy-button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateUrl } from "@/utils/generate-url";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CornerDownRightIcon, UserCheckIcon, UserXIcon } from "lucide-react";

export type EventTableColumns = {
  id: string;
  username?: string;
  linkName: string;
  code: string;
  isAnonymousAccess: boolean;
  originalUrl: string;
  dateTimeOfAccess: Date;
};

export const getEventLabelColumn: Record<keyof EventTableColumns, string> = {
  id: "ID",
  username: "Usuário",
  linkName: "Link",
  code: "Código",
  isAnonymousAccess: "Anônimato",
  originalUrl: "Url Original",
  dateTimeOfAccess: "Data e Hora do Acesso",
};

export function getEventColumns(): Array<ColumnDef<EventTableColumns>> {
  return [
    {
      accessorKey: "username",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getEventLabelColumn.username} />,
      cell: ({ row }) => {
        const username = row.original.username ?? "-";

        return <div className="w-full min-w-48 max-w-52 truncate">{username}</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "linkName",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getEventLabelColumn.linkName} />,
      cell: ({ row }) => {
        const linkName = row.original.linkName;

        return <span>{linkName}</span>;
      },
    },
    {
      accessorKey: "originalUrl",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getEventLabelColumn.originalUrl} />,
      cell: ({ row }) => {
        const { originalUrl, code } = row.original;

        const shortUrl = generateUrl(code);

        return (
          <div className="flex max-w-full flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between">
              <span className="font-bold text-muted-foreground lowercase">{shortUrl}</span>

              <CopyButton text={shortUrl} textCopySuccess="Url copiada com sucesso!"  />
            </div>
            <span className="flex items-center gap-1 text-muted-foreground/70">
              <CornerDownRightIcon className="size-3" />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="max-w-80 truncate">{originalUrl}</TooltipTrigger>
                  <TooltipContent>
                    <p>{originalUrl}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "dateTimeOfAccess",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getEventLabelColumn.dateTimeOfAccess} />,
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
          <div className="flex w-full min-w-28 items-center space-x-2">
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
  ];
}
