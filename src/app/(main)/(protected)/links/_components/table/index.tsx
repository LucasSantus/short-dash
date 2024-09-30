"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types/data-table";
import { Prisma } from "@prisma/client";
import { useMemo } from "react";
import { linkStatusDescription } from "../../_constants/status";
import { type LinkStatus } from "../../_types/links";
import { CreateCategoryDialog } from "./form/create-link-dialog";
import { type LinkTableColumns, getLinkColumns, getLinkLabelColumn } from "./table-columns";
import { LinkTableFloatingBar } from "./table-floating-bar";

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
      placeholder: "Pesquise pelo título do link...",
    },
    {
      label: "Status",
      value: "status",
      options: Object.keys(linkStatusDescription).map((item) => {
        const enumStatus = item as LinkStatus;

        const { label, icon } = linkStatusDescription[enumStatus];

        return {
          label,
          icon,
          value: enumStatus,
        };
      }),
    },
  ];

  const data = useMemo((): LinkTableColumns[] => {
    return links?.map((link) => {
      const { events, ...rest } = link;

      const lastClickOnEvent = events.at(0)?.createdAt as Date;

      return {
        ...rest,
        lastClickOnEvent,
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
      <DataTableToolbar table={table} filterFields={filterFields} getLabelColumns={getLinkLabelColumn}>
        <CreateCategoryDialog />
      </DataTableToolbar>
    </DataTable>
  );
}
