"use client";

import QueryFailed from "@/components/query-failed";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { Fragment } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useGraphClickedLinkFilters } from "../../_hooks/use-graph-clicked-link-filters";

const chartConfig = {
  title: {
    label: "Título",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface GraphLineChartClickedProps {}

export function GraphLineChartClicked({}: GraphLineChartClickedProps): JSX.Element {
  const { filters } = useGraphClickedLinkFilters();

  const createdAt =
    filters.createdAtFrom && filters.createdAtTo
      ? {
          from: filters.createdAtFrom,
          to: filters.createdAtTo,
        }
      : undefined;

  const {
    data: overview,
    isLoading,
    isFetching,
    refetch,
    isError,
    error,
  } = trpc.link.clickedLinkGraphOverview.useQuery({
    search: {
      linkId: filters.linkId,
      createdAt,
    },
  });

  if (isLoading)
    return (
      <div className="aspect-auto w-full h-72 flex-1">
        <Skeleton className="w-full h-full" />
      </div>
    );

  if (isError && !overview) return <QueryFailed refetch={refetch} isFetching={isFetching} error={error} />;

  return (
    <Fragment>
      {overview && overview.data.length > 0 ? (
        <ChartContainer config={chartConfig} className="aspect-auto w-full h-72 flex-1">
          <LineChart
            accessibilityLayer
            data={overview.data ?? []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-40"
                  nameKey="clicks"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line dataKey="clicks" type="monotone" stroke={chartConfig.clicks.color} strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      ) : (
        <div className="aspect-auto w-full h-72 flex-1">
          <div className="w-full h-full flex justify-center items-center">
            <span className="text-muted-foreground">{messages.globals.data.noData}</span>
          </div>
        </div>
      )}
    </Fragment>
  );
}
