"use client";

import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { DollarSign } from "lucide-react";
import { Fragment } from "react";
import { CardOverviewItem } from "./card-overview-item";
import { CardOverviewSkeleton } from "./card-overview-skeleton";

export function CardsOverview(): JSX.Element {
  const { data, isLoading, refetch, isError, isFetching, error } = trpc.link.overview.useQuery();

  if (isLoading) return <CardOverviewSkeleton />;

  if (isError || !data) return <QueryFailed refetch={refetch} isFetching={isFetching} error={error} />;

  return (
    <Fragment>
      <CardOverviewItem
        title="Links Criados"
        icon={DollarSign}
        content={data.totalLinksCreated}
        summary={`+${data.totalLinksCreatedThisMonth} links criados no último mês`}
      />
      <CardOverviewItem
        title="Total de Clicks"
        icon={DollarSign}
        content={data.totalClicks}
        summary={`+${data.totalClicksThisMonth} clicks no último mês`}
      />
    </Fragment>
  );
}
