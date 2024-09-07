/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTableFilterField } from "@/types/data-table";
import { useMemo } from "react";
import { CreateCategoryDialog } from "./form/create-link-dialog";
import {
  getLinkLabelColumn,
  getLinkTableColumns,
  LinkTableColumns,
} from "./table-columns";

interface LinkTableProps {}

export function LinkTable({}: LinkTableProps): JSX.Element {
  const columns = useMemo(() => getLinkTableColumns(), []);

  const filterFields: DataTableFilterField<LinkTableColumns>[] = [
    {
      label: "Nome",
      value: "title",
      placeholder: "Buscar...",
    },
  ];

  const { table } = useDataTable({
    data: [],
    columns,
    pageCount: 10,
    filterFields,
    enableSorting: false,
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
