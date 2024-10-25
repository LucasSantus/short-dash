"use client";

import { useEventFilters } from "@/app/(main)/(protected)/events/_hooks/use-event-filters";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DontHaveItems } from "@/components/dont-have-items";
import QueryFailed from "@/components/query-failed";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";
import { EventTable } from "./_components/table";
import { getEventColumns } from "./_components/table/table-columns";

export function EventList(): JSX.Element {
  const columns = getEventColumns();
  const router = useRouter();
  const [isPendingRedirect, startTransitionRedirect] = useTransition();

  const { filters } = useEventFilters();

  const createdAt =
    filters.createdAtFrom && filters.createdAtTo
      ? {
          from: filters.createdAtFrom,
          to: filters.createdAtTo,
        }
      : undefined;

  const {
    data: events,
    isLoading,
    isFetching,
    refetch,
    isError,
    error,
  } = trpc.event.list.useQuery({
    pagination: {
      page: filters.page,
      pageSize: filters.pageSize,
    },
    search: {
      linkIds: filters.linkIds,
      username: filters.username ?? undefined,
      createdAt,
    },
  });

  if (isLoading)
    return <DataTableSkeleton columnCount={columns.length} rowCount={filters.pageSize} searchableColumnCount={1} />;

  if (isError || !events) return <QueryFailed refetch={refetch} isFetching={isFetching} error={error} />;

  if (
    !events.data.length &&
    !filters.linkIds?.length &&
    !filters.username &&
    !filters.createdAtFrom &&
    !filters.createdAtTo
  )
    return (
      <DontHaveItems
        title="Você não tem eventos registrados no momento."
        description="Os eventos são gerados automáticamente baseado no acesso aos seus links registrados."
      >
        <Button
          size="sm"
          onClick={() => startTransitionRedirect(() => router.push("/links"))}
          isLoading={isPendingRedirect}
        >
          Ir para Links
        </Button>
      </DontHaveItems>
    );

  return (
    <EventTable
      events={events.data}
      pageCount={events.pagination.pageCount}
      totalCount={events.pagination.totalCount}
    />
  );
}
