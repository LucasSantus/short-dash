"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types/data-table";
import { Prisma } from "@prisma/client";
import { useMemo } from "react";
import { type HistoricTableColumns, getHistoricColumns, getHistoricLabelColumn } from "./table-columns";
import { HistoricTableFiltered } from "./table-filtered";

interface LinkTableProps {
  data: Array<
    Prisma.HistoricGetPayload<{
      include: {
        url: true;
        user: true;
      };
    }>
  >;
  pageCount: number;
  totalCount: number;
}

export function HistoricTable({ data, pageCount, totalCount }: LinkTableProps): JSX.Element {
  const columns = getHistoricColumns();

  const filterFields: Array<DataTableFilterField<HistoricTableColumns>> = [
    {
      label: "Nome",
      value: "userName",
      placeholder: "Buscar...",
    },
  ];

  const historic = useMemo((): HistoricTableColumns[] => {
    return data?.map(({ id, isAnonymous, createdAt, url, user }) => ({
      id,
      isAnonymousAccess: isAnonymous,
      userName: user?.name ?? undefined,
      linkName: url.title,
      dateTimeOfAccess: createdAt,
      originalUrl: url.originalUrl,
    }));
  }, [data]);

  const { table } = useDataTable({
    data: historic,
    columns,
    pageCount,
    filterFields,
    enableSorting: false,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <DataTable table={table} totalCount={totalCount}>
      <DataTableToolbar
        table={table}
        filterFields={filterFields}
        getLabelColumns={getHistoricLabelColumn}
        filterOptions={<HistoricTableFiltered />}
      />
    </DataTable>
  );
}
