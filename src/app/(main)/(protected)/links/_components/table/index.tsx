/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types/data-table";
import { type LinkStatus, linkStatusDescription } from "../../_types/links";
import { CreateCategoryDialog } from "./form/create-link-dialog";
import { type LinkTableColumns, getLinkLabelColumn, getLinkStatusIcon, getLinkTableColumns } from "./table-columns";

interface LinkTableProps {
  data: Array<LinkTableColumns>;
  pageCount: number;
  totalCount: number;
}

export function LinkTable({ data, pageCount, totalCount }: LinkTableProps): JSX.Element {
  const columns = getLinkTableColumns();

  const filterFields: Array<DataTableFilterField<LinkTableColumns>> = [
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
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [
        {
          desc: true,
          id: "updatedAt",
        },
      ],
    },
    enableSorting: false,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <DataTable table={table} totalCount={totalCount}>
      <DataTableToolbar table={table} filterFields={filterFields} getLabelColumns={getLinkLabelColumn}>
        <CreateCategoryDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
