"use client";

import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { MultiSelect, MultiSelectOptions } from "@/components/ui/multi-select";
import { Fragment } from "react";
import { DateRange } from "react-day-picker";
import { useGraphClickedLinkFilters } from "../../_hooks/use-graph-clicked-link-filters";

interface GraphLineChartClickedFiltersProps {
  data: MultiSelectOptions;
}

export function GraphLineChartClickedFilters({ data }: GraphLineChartClickedFiltersProps): JSX.Element {
  const linkId = data.length ? data[0]!.value : "";

  const { filters, setFilters } = useGraphClickedLinkFilters(linkId);

  const date: DateRange =
    filters.createdAtFrom && filters.createdAtTo
      ? {
          from: filters.createdAtFrom,
          to: filters.createdAtTo,
        }
      : {
          from: new Date(),
        };

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
          options={data}
          maxCount={1}
          showSelectedAll={false}
          modalPopover
          multiple={false}
          disabled={!data.length}
        />
      </div>
      <div>
        <CalendarDatePicker
          date={date}
          onDateSelect={(value) => {
            setFilters({
              createdAtFrom: value.from,
              createdAtTo: value.to,
            });
          }}
          variant="outline"
          className="w-full justify-start"
          disabled={!data.length}
        />
      </div>
    </Fragment>
  );
}
