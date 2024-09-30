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
  events: Array<
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

export function EventTable({ events, pageCount, totalCount }: LinkTableProps): JSX.Element {
  const columns = getEventColumns();

  const filterFields: Array<DataTableFilterField<EventTableColumns>> = [
    {
      label: "Nome",
      value: "username",
      placeholder: "Pesquise por nome de usuário...",
    },
  ];

  const data = useMemo((): EventTableColumns[] => {
    return events?.map(({ id, isAnonymous, createdAt, link, user }) => ({
      id,
      isAnonymousAccess: isAnonymous,
      username: user?.name ?? undefined,
      code: link.code,
      linkName: link.title,
      dateTimeOfAccess: createdAt,
      originalUrl: link.originalUrl,
    }));
  }, [events]);

  const { table } = useDataTable({
    data,
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
