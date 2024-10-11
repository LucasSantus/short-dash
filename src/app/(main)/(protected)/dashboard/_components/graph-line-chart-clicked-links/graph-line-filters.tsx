"use client";

import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { trpc } from "@/trpc/client";
import { parseAsString, useQueryStates } from "nuqs";
import { Fragment } from "react";

export function GraphLineFilters(): JSX.Element {
  const { data: allLinks, isLoading: isLoadingAllLinks } = trpc.link.allLinkListOptions.useQuery();

  const [filters, setFilters] = useQueryStates({
    linkId: parseAsString.withDefault(allLinks?.data ? allLinks.data.at(0)!.value : ""),
  });

  return (
    <Fragment>
      <div className="w-48">
        <MultiSelect
          placeholder="Selecione um Link"
          defaultValue={[filters.linkId]}
          onValueChange={(value) =>
            setFilters({
              linkId: value.at(0),
            })
          }
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
    </Fragment>
  );
}
