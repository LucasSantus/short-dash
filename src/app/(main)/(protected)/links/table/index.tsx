/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableFilterField } from "@/types/data-table";
import { Url } from "@prisma/client";
import { useMemo } from "react";
import { LinkStatus, linkStatusDescription } from "../_types/links";
import { CreateCategoryDialog } from "./form/create-link-dialog";
import {
  getLinkLabelColumn,
  getLinkStatusIcon,
  getLinkTableColumns,
  LinkTableColumns,
} from "./table-columns";

interface LinkTableProps {
  links: Url[];
  pageCount: number;
}

export function LinkTable({ links, pageCount }: LinkTableProps): JSX.Element {
  const columns = useMemo(() => getLinkTableColumns(), []);

  const filterFields: DataTableFilterField<LinkTableColumns>[] = [
    {
      label: "Nome",
      value: "title",
      placeholder: "Buscar...",
    },
    {
      label: "Status",
      value: "status",
      options: Object.keys(linkStatusDescription).map((item) => {
        const enumStatus = item as LinkStatus;

        return {
          label: linkStatusDescription[enumStatus],
          value: enumStatus,
          icon: getLinkStatusIcon(enumStatus),
        };
      }),
    },
  ];

  const { table } = useDataTable({
    data: links,
    columns,
    pageCount,
    filterFields,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar
        table={table}
        filterFields={filterFields}
        getLabelColumns={getLinkLabelColumn}
      >
        <CreateCategoryDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
