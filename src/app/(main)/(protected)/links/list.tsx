"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { LinkStatus } from "./_types/links";
import { LinkTable } from "./table";

export function ListLinks(): JSX.Element {
  const [filters] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(10),

    title: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
  });

  const statuses = filters.status ? filters.status.split(".") : [];

  const { data, isLoading, isError, refetch } = trpc.link.getLinks.useQuery({
    pagination: {
      page: filters.page,
      pageSize: filters.per_page,
    },
    search: {
      title: filters.title,
    },
    statuses: statuses as LinkStatus[],
  });

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={5}
        rowCount={filters.per_page}
        searchableColumnCount={1}
        filterableColumnCount={1}
      />
    );

  if (isError || !data)
    return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  return <LinkTable links={data.links} pageCount={data.totalPages} />;
}
