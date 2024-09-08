"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Url } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckIcon, CircleIcon, XIcon } from "lucide-react";
import { LinkStatus, linkStatusDescription } from "../_types/links";
import { DataTableRowActions } from "./table-row-actions";

export type LinkTableColumns = Url;

export function getLinkStatusIcon(status: LinkStatus) {
  const statusIcons = {
    [LinkStatus.active]: CheckIcon,
    [LinkStatus.inactive]: XIcon,
  };

  return statusIcons[status] || CircleIcon;
}

export const getLinkLabelColumn: Record<keyof LinkTableColumns, string> = {
  id: "ID",
  title: "Nome",
  description: "Descrição",
  code: "Código",
  numberOfVisitors: "Número de Visitantes",
  originalUrl: "Redirecionamento",
  shortUrl: "Url Gerada",
  status: "Status",
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
      cell: ({ row }) => {
        const title = row.original.title;

        return <div className="max-w-44 truncate">{title}</div>;
      },
      enableHiding: false,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.description}
        />
      ),
      cell: ({ row }) => {
        const description = row.original.description;

        const descriptionFormatted = description
          ? description.substring(0, 70)
          : "-";

        return (
          <div className="w-52 text-muted-foreground">
            {descriptionFormatted.length >= 60
              ? descriptionFormatted.concat("...")
              : descriptionFormatted}
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
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.createdAt}
        />
      ),
      cell: ({ row }) => {
        const createdAt = row.original.createdAt as Date;

        const createdAtFormmated = format(createdAt, "dd/MM/yyyy");

        return (
          <span className="text-muted-foreground">{createdAtFormmated}</span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.status}
        />
      ),
      cell: ({ row }) => {
        const statusEnum = LinkStatus[row.original.status];

        if (!statusEnum) return null;

        const status = linkStatusDescription[statusEnum];
        const Icon = getLinkStatusIcon(statusEnum);

        return (
          <div className="flex items-center">
            <Icon
              className="mr-2 size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="capitalize">{status}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "numberOfVisitors",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={getLinkLabelColumn.numberOfVisitors}
        />
      ),
      cell: ({ row }) => {
        const numberOfVisitors = row.original.numberOfVisitors;

        return (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{numberOfVisitors}</span>
            <span className="text-muted-foreground">Visitante(s)</span>
          </div>
        );
      },
    },

    // {
    //   accessorKey: "originalUrl",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title={getLinkLabelColumn.originalUrl}
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     const redirectUrl: string = row.getValue("originalUrl");

    //     return (
    //       <div className="max-w-60 truncate">
    //         <TooltipProvider>
    //           <Tooltip>
    //             <TooltipTrigger asChild>
    //               <Link
    //                 href={redirectUrl}
    //                 target="_blank"
    //                 className="text-blue-500 underline hover:text-blue-700"
    //               >
    //                 {redirectUrl}
    //               </Link>
    //             </TooltipTrigger>
    //             <TooltipContent>
    //               <Link href={redirectUrl} target="_blank">
    //                 {redirectUrl}
    //               </Link>
    //             </TooltipContent>
    //           </Tooltip>
    //         </TooltipProvider>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "shortUrl",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title={getLinkLabelColumn.shortUrl}
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     const shortUrl: string = row.getValue("shortUrl");

    //     return (
    //       <div className="max-w-60 truncate">
    //         <TooltipProvider>
    //           <Tooltip>
    //             <TooltipTrigger asChild>
    //               <Link
    //                 href={shortUrl}
    //                 target="_blank"
    //                 className="text-blue-500 underline hover:text-blue-700"
    //               >
    //                 {shortUrl}
    //               </Link>
    //             </TooltipTrigger>
    //             <TooltipContent>
    //               <Link href={shortUrl} target="_blank">
    //                 {shortUrl}
    //               </Link>
    //             </TooltipContent>
    //           </Tooltip>
    //         </TooltipProvider>
    //       </div>
    //     );
    //   },
    // },

    {
      id: "actions",
      cell: function Cell({ row }) {
        return <DataTableRowActions row={row} />;
      },
      maxSize: 30,
    },
  ];
}
