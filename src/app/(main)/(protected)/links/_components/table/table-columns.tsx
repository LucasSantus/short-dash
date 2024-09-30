"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { generateUrl } from "@/utils/generate-url";
import { $Enums } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckIcon, CircleIcon, CopyIcon, CornerDownRightIcon, MousePointerClickIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { linkStatusDescription } from "../../_constants/status";
import { LinkStatus } from "../../_types/links";
import { DataTableRowActions } from "./table-row-actions";

export type LinkTableColumns = {
  id: string;
  title: string;
  description: string | null;
  originalUrl: string;
  code: string;
  amountOfAccesses: number;
  status: $Enums.LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  lastClickOnEvent: Date | null;
  ownerId: string | null;
};

export function getLinkStatusIcon(status: LinkStatus) {
  const statusIcons = {
    [LinkStatus.Active]: CheckIcon,
    [LinkStatus.Inactive]: XIcon,
  };

  return statusIcons[status] || CircleIcon;
}

export const getLinkLabelColumn: Record<keyof LinkTableColumns, string> = {
  id: "ID",
  title: "Nome",
  description: "Descrição",
  code: "Código",
  amountOfAccesses: "Número de Acessos",
  originalUrl: "Redirecionamento",
  status: "Status",
  ownerId: "Id do Dono",
  createdAt: "Criada em",
  updatedAt: "Atualizada em",
  lastClickOnEvent: "Último Clique",
};

export function getLinkColumns(): Array<ColumnDef<LinkTableColumns>> {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="max-w-4">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-0.5"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="max-w-4">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        </div>
      ),
      size: 14,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.title} />,
      cell: ({ row }) => {
        const title = row.original.title;

        return <div className="max-w-44 min-w-16 w-full truncate text-start">{title ?? "-"}</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "originalUrl",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.originalUrl} />,
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
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.createdAt} />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt as Date;

        const createdAtFormmated = format(createdAt, "dd MMM, yyyy", {
          locale: ptBR,
        });

        return <span className="text-muted-foreground capitalize">{createdAtFormmated}</span>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.status} />,
      cell: ({ row }) => {
        const statusEnum = LinkStatus[row.original.status];

        if (!statusEnum) return null;

        const { label, icon: Icon, color } = linkStatusDescription[statusEnum];

        return (
          <div className="flex items-center">
            <Icon className={cn("mr-2 size-4", color.textColor)} aria-hidden="true" />
            <span className={cn("capitalize", color.textColor)}>{label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "amountOfAccesses",
      header: () => <></>,
      cell: ({ row }) => {
        const amountOfAccesses = row.original.amountOfAccesses;

        const lastClickOnEvent = row.original.lastClickOnEvent as Date;
        const formattedDateLastClickOnEvent = lastClickOnEvent
          ? format(lastClickOnEvent, "'Último clique em' dd 'de' MMMM", {
              locale: ptBR,
            })
          : null;

        return (
          <div className="flex items-center justify-center text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex gap-1.5 items-center border p-2 rounded-md">
                  <MousePointerClickIcon className="size-4" />
                  <span>{amountOfAccesses}</span>
                  <span>Click(s)</span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-1 flex flex-col gap-1">
                    <span>
                      <span className="font-bold">{amountOfAccesses}</span> Clicks
                    </span>
                    <span className="text-muted-foreground">{formattedDateLastClickOnEvent}</span>
                  </div>
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
