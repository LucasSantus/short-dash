"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types/data-table";
import { Prisma } from "@prisma/client";
import { useMemo } from "react";
import { type EventTableColumns, getEventColumns, getEventLabelColumn } from "./table-columns";
import { EventTableFiltered } from "./table-filtered";

interface LinkTableProps {
  data: Array<
    Prisma.EventGetPayload<{
      include: {
        link: true;
        user: true;
      };
    }>
  >;
  pageCount: number;
  totalCount: number;
}

export function EventTable({ data, pageCount, totalCount }: LinkTableProps): JSX.Element {
  const columns = getEventColumns();

  const filterFields: Array<DataTableFilterField<EventTableColumns>> = [
    {
      label: "Nome",
      value: "userName",
      placeholder: "Buscar...",
    },
  ];

  const historic = useMemo((): EventTableColumns[] => {
    return data?.map(({ id, isAnonymous, createdAt, link, user }) => ({
      id,
      isAnonymousAccess: isAnonymous,
      userName: user?.name ?? undefined,
      linkName: link.title,
      dateTimeOfAccess: createdAt,
      originalUrl: link.originalUrl,
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
        getLabelColumns={getEventLabelColumn}
        filterOptions={<EventTableFiltered />}
      />
    </DataTable>
  );
}
