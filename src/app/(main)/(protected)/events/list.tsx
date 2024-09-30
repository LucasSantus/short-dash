"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DontHaveItems } from "@/components/dont-have-items";
import QueryFailed from "@/components/query-failed";
import { Button } from "@/components/ui/button";
import { useEventFilters } from "@/hooks/filters/use-event-filters";
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
      createdAt: filters.createdAt
        ? {
            from: filters.createdAt?.from ?? undefined,
            to: filters.createdAt?.to ?? undefined,
          }
        : undefined,
    },
  });

  if (isLoading)
    return <DataTableSkeleton columnCount={columns.length} rowCount={filters.pageSize} searchableColumnCount={1} />;

  if (isError || !events) return <QueryFailed refetch={refetch} isLoading={isLoading} />;

  if (!events.data.length && !filters.linkIds?.length && !filters.username && !filters.createdAt)
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
