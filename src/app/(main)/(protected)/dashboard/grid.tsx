import { DollarSign } from "lucide-react";
import { CardItem } from "./_components/card-item";
import { GraphAreaChartClicked } from "./_components/graph-area-chart-clicked";
import { GraphClickedWeek } from "./_components/graph-clicked-week";
import { MostClickedLinks } from "./_components/most-clicked-links";

interface DashboardGridProps {}

export function DashboardGrid({}: DashboardGridProps): JSX.Element {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 md:p-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CardItem title="Links Criados" icon={DollarSign} content="$45,231.89" summary="+20.1% from last month" />
        <CardItem title="Links Ativos" icon={DollarSign} content="$45,231.89" summary="+20.1% from last month" />
        <CardItem title="Links Inativos" icon={DollarSign} content="$45,231.89" summary="+20.1% from last month" />
        <CardItem title="Total de Clicks" icon={DollarSign} content="$45,231.89" summary="+20.1% from last month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2">
          <GraphAreaChartClicked />
        </div>
        <div className="lg:col-span-1 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <MostClickedLinks />

          <GraphClickedWeek />
        </div>
      </div>
    </div>
  );
}
