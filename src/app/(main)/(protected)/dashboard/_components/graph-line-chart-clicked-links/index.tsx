"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { trpc } from "@/trpc/client";
import { parseAsString, useQueryStates } from "nuqs";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { GraphLineFilters } from "./graph-line-filters";

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

export function GraphLineChartClickedLinks(): JSX.Element {
  const [filters] = useQueryStates({
    linkId: parseAsString.withDefault(""),
  });

  const { data, isLoading, isError } = trpc.link.clickedLinkGraphOverview.useQuery({
    search: {
      linkId: filters.linkId,
      createdAt: {
        from: new Date("2024-01-01"),
        to: new Date("2024-12-01"),
      },
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks</CardTitle>
        </div>
        <div className="flex items-center p-3 gap-2">
          <GraphLineFilters />
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading ? (
          <>Opa</>
        ) : isError && !data ? (
          <>Erro</>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
