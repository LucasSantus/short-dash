"use client";

import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MultiSelect } from "@/components/ui/multi-select";
import { trpc } from "@/trpc/client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartData = [
  { date: "2024-04-01", title: "Youtube", clicks: 150 },
  { date: "2024-04-02", title: "Facebook", clicks: 100 },
  { date: "2024-04-03", title: "Instagram", clicks: 200 },
  { date: "2024-04-04", title: "Linkedin", clicks: 120 },
  { date: "2024-04-05", title: "Twitter", clicks: 180 },
  { date: "2024-04-06", title: "TikTok", clicks: 250 },
  { date: "2024-04-07", title: "WhatsApp", clicks: 190 },
  { date: "2024-04-08", title: "Snapchat", clicks: 160 },
  { date: "2024-04-09", title: "Pinterest", clicks: 130 },
  { date: "2024-04-10", title: "Reddit", clicks: 170 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  title: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function GraphLineChartClickedLinks(): JSX.Element {
  const { data: allLinks, isLoading: isLoadingAllLinks } = trpc.link.allLinkListOptions.useQuery();

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks</CardTitle>
        </div>
        <div className="flex items-center p-3 gap-2">
          <div className="min-w-44">
            <MultiSelect
              placeholder="Selecione um Link"
              defaultValue={[]}
              onValueChange={() => {}}
              options={allLinks?.data ?? []}
              maxCount={1}
              showSelectedAll={false}
              modalPopover
              isLoading={isLoadingAllLinks}
              multiple={false}
            />
          </div>
          <div>
            <CalendarDatePicker
              date={{
                from: new Date(),
              }}
              onDateSelect={() => {}}
              variant="outline"
              className="w-full justify-start"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
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
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-40"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line dataKey="title" type="monotone" stroke={"#F4f4f4"} strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
