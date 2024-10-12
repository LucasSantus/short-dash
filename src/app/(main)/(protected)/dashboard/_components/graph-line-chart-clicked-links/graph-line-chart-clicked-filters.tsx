"use client";

import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { MultiSelect, MultiSelectOptions } from "@/components/ui/multi-select";
import { useGraphClickedLinkFilters } from "@/hooks/filters/use-graph-clicked-link-filters";
import { Fragment } from "react";

interface GraphLineChartClickedFiltersProps {
  data: MultiSelectOptions;
}

export function GraphLineChartClickedFilters({ data }: GraphLineChartClickedFiltersProps): JSX.Element {
  // const [filters, setFilters] = useQueryStates({
  //   linkId: parseAsString.withDefault(data ? data.at(0)!.value : ""),
  // });

  const { filters, setFilters } = useGraphClickedLinkFilters({
    linkId: data ? data.at(0)!.value : "",
  });

  return (
    <Fragment>
      <div className="w-48">
        <MultiSelect
          placeholder="Selecione um Link"
          defaultValue={filters.linkId ? [filters.linkId] : []}
          onValueChange={(value) =>
            setFilters({
              linkId: value.at(0),
            })
          }
          options={data ?? []}
          maxCount={1}
          showSelectedAll={false}
          modalPopover
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
    </Fragment>
  );
}
