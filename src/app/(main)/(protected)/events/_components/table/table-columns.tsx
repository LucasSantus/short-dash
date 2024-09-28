"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { generateUrl } from "@/utils/generate-url";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CopyIcon, CornerDownRightIcon, UserCheckIcon, UserXIcon } from "lucide-react";
import { toast } from "sonner";
import { DataTableRowActions } from "./table-row-actions";

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

        async function handleCopyUrl() {
          try {
            await navigator.clipboard.writeText(shortUrl);
            toast.success("Url copiada com sucesso!");
          } catch {
            toast.error("Ocorreu uma falha ao tentar copiar a url!");
          }
        }

        return (
          <div className="flex flex-col items-start gap-2 max-w-full">
            <div className="flex justify-between items-center w-full">
              <span className="text-muted-foreground font-bold lowercase">{shortUrl}</span>

              <Button
                size="icon"
                variant="ghost"
                icon={<CopyIcon className="size-3.5" />}
                onClick={handleCopyUrl}
                className="size-7"
              />
            </div>
            <span className="text-muted-foreground/70 flex items-center gap-1">
              <CornerDownRightIcon className="size-3" />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="truncate max-w-80">{originalUrl}</TooltipTrigger>
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
