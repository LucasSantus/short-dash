"use client";

import QueryFailed from "@/components/query-failed";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGraphClickedLinkFilters } from "@/hooks/filters/use-graph-clicked-link-filters";
import { trpc } from "@/trpc/client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  // const [filters] = useQueryStates({
  //   linkId: parseAsString.withDefault(""),
  // });

  const { filters } = useGraphClickedLinkFilters();

  const { data, isLoading, isFetching, refetch, isError, error } = trpc.link.clickedLinkGraphOverview.useQuery({
    search: {
      linkId: filters.linkId,
      createdAt: {
        from: new Date("2024-01-01"),
        to: new Date("2024-12-01"),
      },
    },
  });

  if (isLoading)
    return (
      <div className="aspect-auto w-full h-72 flex-1">
        <Skeleton className="w-full h-full" />
      </div>
    );

  if (isError && !data) return <QueryFailed refetch={refetch} isFetching={isFetching} error={error} />;

  return (
    <ChartContainer config={chartConfig} className="aspect-auto w-full h-72 flex-1">
      <LineChart
        accessibilityLayer
        data={data?.data ?? []}
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
}
