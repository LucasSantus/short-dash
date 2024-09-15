import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

interface HistoricFiltersSheetProps {}

export function HistoricFiltersSheet({}: HistoricFiltersSheetProps): JSX.Element {
  return (
    <div>
      <Button size="sm" icon={<FilterIcon className="size-4" />}>
        Aplicar Filtros
      </Button>
    </div>
  );
}
