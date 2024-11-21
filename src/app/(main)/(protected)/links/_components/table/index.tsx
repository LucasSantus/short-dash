"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types/data-table";
import { Prisma } from "@prisma/client";
import { useMemo } from "react";
import { type LinkStatus } from "../../_types/links";
import { type LinkTableColumns, getLinkColumns, getLinkLabelColumns, getLinkStatusDescription } from "./table-columns";
import { LinkTableFloatingBar } from "./table-floating-bar";
import { CreateCategoryDialog } from "./table-form/create-link-dialog";
import { LinkTableRefetching } from "./table-refetching";

interface LinkTableProps {
  links: Array<
    Prisma.LinkGetPayload<{
      include: {
        events: true;
      };
    }>
  >;
  pageCount: number;
  totalCount: number;
}

export function LinkTable({ links, pageCount, totalCount }: LinkTableProps): JSX.Element {
  const columns = getLinkColumns();

  const filterFields: Array<DataTableFilterField<LinkTableColumns>> = [
    {
      label: "Nome",
      value: "title",
      placeholder: "Pesquise pelo título...",
    },
    {
      label: "Status",
      value: "status",
      options: Object.keys(getLinkStatusDescription).map((key) => {
        const status = key as LinkStatus;

        const { label, icon } = getLinkStatusDescription[status];

        return {
          label,
          icon,
          value: status,
        };
      }),
    },
  ];

  const data = useMemo((): LinkTableColumns[] => {
    return links?.map((link) => {
      const { events, clicks, ...rest } = link;

      const lastClickOnEvent = events?.at(0)?.createdAt ?? null;

      return {
        ...rest,
        lastClickOnEvent,
        amountOfAccesses: clicks,
      };
    });
  }, [links]);

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableSorting: false,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
  });

  return (
    <DataTable table={table} totalCount={totalCount} floatingBar={<LinkTableFloatingBar table={table} />}>
      <DataTableToolbar
        table={table}
        filterFields={filterFields}
        getLabelColumns={getLinkLabelColumns}
        options={<LinkTableRefetching />}
      >
        <CreateCategoryDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
