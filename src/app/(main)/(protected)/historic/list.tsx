"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DontHaveItems } from "@/components/dont-have-items";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { EventTable } from "./_components/table";
import { getEventColumns } from "./_components/table/table-columns";
import { useHistoricFilters } from "./_hooks/use-historic-filters";

export function HistoricList(): JSX.Element {
  const columns = getEventColumns();

  const {
    filters: { page, per_page, userName, linkIds },
  } = useHistoricFilters();

  const {
    data: events,
    isLoading,
    isError,
    refetch,
  } = trpc.event.list.useQuery({
    pagination: {
      page,
      pageSize: per_page,
    },
    search: {
      userName,
      linkIds,
    },
  });

  if (isLoading)
    return <DataTableSkeleton columnCount={columns.length} rowCount={per_page} searchableColumnCount={1} />;

  if (isError || !events) return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  if (!userName && !linkIds && !events.data.length)
    return (
      <DontHaveItems
        title="Você não tem históricos registrados no momento."
        description="É necessário acessar os links para começar a gerenciar seus históricos."
      />
    );

  return (
    <EventTable data={events.data} pageCount={events.pagination.pageCount} totalCount={events.pagination.totalCount} />
  );
}
