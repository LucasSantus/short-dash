"use client";

import QueryFailed from "@/components/query-failed";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { messages } from "@/constants/messages";
import { trpc } from "@/trpc/client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useDashboardFilters } from "../../_hooks/use-dashboard-filters";

const chartConfig = {
  title: {
    label: "Título",
    color: "hsl(var(--secondary))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface GraphLineChartClickedProps {}

export function GraphLineChartClicked({}: GraphLineChartClickedProps): JSX.Element {
  const { filters } = useDashboardFilters();

  const {
    data: overview,
    isLoading,
    isFetching,
    refetch,
    isError,
    error,
  } = trpc.link.clickedLinkGraphOverview.useQuery(
    {
      search: {
        linkId: filters.linkId,
        month: filters.month,
        year: filters.year,
      },
    },
    {
      enabled: Boolean(filters.linkId),
    }
  );

  if (isLoading)
    return (
      <div className="aspect-auto h-72 w-full flex-1">
        <Skeleton className="h-full w-full" />
      </div>
    );

  if (isError && !overview) return <QueryFailed refetch={refetch} isFetching={isFetching} error={error} />;

  if (overview && overview.data.length > 0)
    return (
      <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full flex-1">
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
    );

  return (
    <div className="aspect-auto h-72 w-full flex-1">
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-muted-foreground">{messages.globals.data.noData}</span>
      </div>
    </div>
  );
}
