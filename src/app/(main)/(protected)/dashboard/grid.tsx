import { CardsOverview } from "./_components/cards-overview";
import { GraphLineChartClickedLinks } from "./_components/graph-line-chart-clicked-links";
import { TableMostClickedLinks } from "./_components/table-most-clicked-links";

interface DashboardGridProps {}

export function DashboardGrid({}: DashboardGridProps): JSX.Element {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 md:p-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CardsOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
        <div className="lg:col-span-8 grid justify-items-stretch">
          <GraphLineChartClickedLinks />
        </div>
        <div className="lg:col-span-4 grid justify-items-stretch">
          <TableMostClickedLinks />
        </div>
      </div>
    </div>
  );
}
