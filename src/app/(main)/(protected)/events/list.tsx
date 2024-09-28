"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import QueryFailed from "@/components/query-failed";
import { useEventFilters } from "@/hooks/filters/use-event-filters";
import { trpc } from "@/trpc/client";
import { EventTable } from "./_components/table";
import { getEventColumns } from "./_components/table/table-columns";

export function EventList(): JSX.Element {
  const columns = getEventColumns();

  const { filters } = useEventFilters();

  const {
    data: events,
    isLoading,
    isError,
    refetch,
  } = trpc.event.list.useQuery({
    pagination: {
      page: filters.page,
      pageSize: filters.pageSize,
    },
    search: {
      linkIds: filters.linkIds,

      username: filters.username ?? undefined,
      createdAt: {
        from: filters.createdAtFrom ?? undefined,
        to: filters.createdAtTo ?? undefined,
      },
    },
  });

  if (isLoading)
    return <DataTableSkeleton columnCount={columns.length} rowCount={filters.pageSize} searchableColumnCount={1} />;

  if (isError || !events) return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  // if (!events.data.length && !filters.linkIds.length && !userName && !date)
  //   return (
  //     <DontHaveItems
  //       title="Você não tem eventos registrados no momento."
  //       description="Os eventos são gerados automáticamente baseado no acesso aos seus links registrados."
  //     >
  //       <Link href="/links">
  //         <Button size="sm">Ir para Links</Button>
  //       </Link>
  //     </DontHaveItems>
  //   );

  return (
    <EventTable
      events={events.data}
      pageCount={events.pagination.pageCount}
      totalCount={events.pagination.totalCount}
    />
  );
}
