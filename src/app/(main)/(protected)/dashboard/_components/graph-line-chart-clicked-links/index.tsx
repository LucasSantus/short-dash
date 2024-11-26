"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DashboardFiltered } from "../dashboard-filtered";
import { GraphLineChartClicked } from "./graph-line-chart-clicked";

export function GraphLineChartClickedLinks(): JSX.Element {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Clicks</CardTitle>
        </div>
        <div className="flex items-center gap-2 p-3">
          <DashboardFiltered type="link" />
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <GraphLineChartClicked />
      </CardContent>
    </Card>
  );
}
