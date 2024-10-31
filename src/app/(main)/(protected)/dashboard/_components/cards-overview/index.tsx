"use client";

import { NumberTicker } from "@/components/number-ticker";
import QueryFailed from "@/components/query-failed";
import { trpc } from "@/trpc/client";
import { LinkIcon, MousePointerClickIcon } from "lucide-react";
import { Fragment } from "react";
import { CardOverviewItem } from "./card-overview-item";
import { CardOverviewSkeleton } from "./card-overview-skeleton";

export function CardsOverview(): JSX.Element {
  const { data, isLoading, refetch, isError, isFetching, error } = trpc.link.overview.useQuery();

  if (isLoading) return <CardOverviewSkeleton />;

  if (isError || !data) return <QueryFailed refetch={refetch} isFetching={isFetching} error={error} />;

  const totalLinksCreatedThisMonth =
    data.totalLinksCreatedThisMonth === 0
      ? "Não teve link criado no último mês"
      : data.totalLinksCreatedThisMonth === 1
        ? "+1 link criado no último mês"
        : `+${data.totalLinksCreatedThisMonth} links criados no último mês`;

  const totalClicksThisMonth =
    data.totalClicksThisMonth === 0
      ? "Não teve clicks no último mês"
      : data.totalClicksThisMonth === 1
        ? "+1 click no último mês"
        : `+${data.totalClicksThisMonth} clicks no último mês`;

  return (
    <Fragment>
      <CardOverviewItem
        title="Links Criados"
        icon={LinkIcon}
        content={<NumberTicker value={data.totalLinksCreated} className="text-2xl" />}
        summary={totalLinksCreatedThisMonth}
      />

      <CardOverviewItem
        title="Total de Clicks"
        icon={MousePointerClickIcon}
        content={<NumberTicker value={data.totalClicks} className="text-2xl" />}
        summary={totalClicksThisMonth}
      />
    </Fragment>
  );
}
