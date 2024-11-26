import { Button } from "@/components/ui/button";
import { MultiSelectOptions } from "@/components/ui/multi-select";
import { SheetTrigger } from "@/components/ui/sheet";
import { getMonthName } from "@/utils/get-month-name";
import { CalendarIcon, LinkIcon, SlidersHorizontalIcon } from "lucide-react";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { useDashboardFilters } from "../../_hooks/use-dashboard-filters";

interface DashboardFilteredTriggerProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  linkOptions: MultiSelectOptions;
  type: "calendar" | "link";
}

export function DashboardFilteredTrigger({ setIsOpen, linkOptions, type }: DashboardFilteredTriggerProps): JSX.Element {
  const linkIdDefault = linkOptions[0]?.value ?? undefined;

  const { filters, setFilters } = useDashboardFilters();

  useEffect(() => {
    if (linkIdDefault)
      setFilters({
        linkId: linkIdDefault,
      });
  }, [linkIdDefault]);

  const monthName = getMonthName(filters.month);

  const linkName = linkOptions?.find(({ value }) => value === linkIdDefault);

  return (
    <div className="space-x-2">
      {type === "calendar" && (
        <Fragment>
          <Button variant="outline" icon={<CalendarIcon />} onClick={() => setIsOpen(true)} className="capitalize">
            {monthName}, {filters.year}
          </Button>

          <SheetTrigger asChild>
            <Button variant="outline" size="icon" icon={<SlidersHorizontalIcon />} />
          </SheetTrigger>
        </Fragment>
      )}

      {linkName && type === "link" && (
        <SheetTrigger asChild>
          <Button variant="outline" icon={<LinkIcon />}>
            {linkName.label}
          </Button>
        </SheetTrigger>
      )}
    </div>
  );
}
