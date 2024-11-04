import { CardsOverview } from "./_components/cards-overview";
import { GraphLineChartClickedLinks } from "./_components/graph-line-chart-clicked-links";
import { TableMostClickedLinks } from "./_components/table-most-clicked-links";

interface DashboardGridProps {}

export function DashboardGrid({}: DashboardGridProps): JSX.Element {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CardsOverview />
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-12">
        <div className="grid justify-items-stretch lg:col-span-8">
          <GraphLineChartClickedLinks />
        </div>
        <div className="grid justify-items-stretch lg:col-span-4">
          <TableMostClickedLinks />
        </div>
      </div>
    </div>
  );
}
