"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { Url } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckIcon, CircleIcon, XIcon } from "lucide-react";
import { LinkStatus, linkStatusDescription } from "../../_types/links";
import { DataTableRowActions } from "./table-row-actions";

export type LinkTableColumns = Url;

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
  expiresAt: "Expira em",
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
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.title} />,
      cell: ({ row }) => {
        const title = row.original.title;

        return <div className="max-w-44 truncate">{title}</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.description} />,
      cell: ({ row }) => {
        const description = row.original.description;

        const descriptionFormatted = description ? description.substring(0, 70) : "-";

        return (
          <div className="w-52 text-muted-foreground">
            {descriptionFormatted.length >= 60 ? descriptionFormatted.concat("...") : descriptionFormatted}
          </div>
        );
      },
    },
    {
      accessorKey: "code",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.code} />,
      cell: ({ row }) => <span>{row.getValue("code")}</span>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.status} />,
      cell: ({ row }) => {
        const statusEnum = LinkStatus[row.original.status];

        if (!statusEnum) return null;

        const status = linkStatusDescription[statusEnum];
        const Icon = getLinkStatusIcon(statusEnum);

        return (
          <div className="flex items-center">
            <Icon className="mr-2 size-4 text-muted-foreground" aria-hidden="true" />
            <span className="capitalize">{status}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "amountOfAccesses",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.amountOfAccesses} />,
      cell: ({ row }) => {
        const amountOfAccesses = row.original.amountOfAccesses;

        return (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{amountOfAccesses}</span>
            <span className="text-muted-foreground">Acesso(s)</span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title={getLinkLabelColumn.createdAt} />,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt as Date;

        const createdAtFormmated = format(createdAt, "dd/MM/yyyy");

        return <span className="text-muted-foreground">{createdAtFormmated}</span>;
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
