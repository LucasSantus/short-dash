/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types/data-table";
import type { Prisma } from "@prisma/client";
import { useMemo } from "react";
import { type HistoricTableColumns, getHistoricLabelColumn, getHistoricTableColumns } from "./table-columns";

interface HistoricTableProps {
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

export function HistoricTable({ data, pageCount, totalCount }: HistoricTableProps): JSX.Element {
  const columns = getHistoricTableColumns();

  const filterFields: Array<DataTableFilterField<HistoricTableColumns>> = [
    // {
    //   label: "Nome",
    //   value: "title",
    //   placeholder: "Buscar...",
    // },
    // {
    //   label: "Status",
    //   value: "status",
    //   options: Object.keys(linkStatusDescription).map((item) => {
    //     const enumStatus = item as LinkStatus;
    //     return {
    //       label: linkStatusDescription[enumStatus],
    //       value: enumStatus,
    //       icon: getLinkStatusIcon(enumStatus),
    //     };
    //   }),
    // },
  ];

  const dataMemoized = useMemo((): HistoricTableColumns[] => {
    return data?.map(({ id, isAnonymous, url, createdAt, user }) => {
      const userName = !isAnonymous && user && user?.name ? user.name : "-";

      return {
        id,
        userName,
        isAnonymousAccess: isAnonymous,
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        dateTimeOfAccess: createdAt,
      };
    });
  }, [data]);

  const { table } = useDataTable({
    data: dataMemoized,
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
      <DataTableToolbar table={table} filterFields={filterFields} getLabelColumns={getHistoricLabelColumn} />
    </DataTable>
  );
}
