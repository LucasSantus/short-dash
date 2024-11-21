"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from "date-fns";
import { toDate } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const calendarDatePickerVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md font-medium text-foreground text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-background hover:bg-accent hover:text-accent-foreground",
        link: "text-background text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CalendarDatePickerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof calendarDatePickerVariants> {
  id?: string;
  className?: string;
  date?: DateRange;
  closeOnSelect?: boolean;
  numberOfMonths?: 1 | 2;
  yearsRange?: number;
  onDateSelect: (range: { from: Date; to: Date }) => void;
  align?: "center" | "end" | "start" | undefined;
  isLoading?: boolean;
  disabled?: boolean;
}

export const CalendarDatePicker = React.forwardRef<HTMLButtonElement, CalendarDatePickerProps>(
  (
    {
      id = "calendar-date-picker",
      className,
      date,
      closeOnSelect = false,
      numberOfMonths = 2,
      yearsRange = 30,
      onDateSelect,
      variant,
      align = "end",
      disabled = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [selectedRange, setSelectedRange] = React.useState<string | null>(null);
    const [monthFrom, setMonthFrom] = React.useState<Date | undefined>(date?.from);
    const [yearFrom, setYearFrom] = React.useState<number | undefined>(date?.from?.getFullYear());
    const [monthTo, setMonthTo] = React.useState<Date | undefined>(numberOfMonths === 2 ? date?.to : date?.from);
    const [yearTo, setYearTo] = React.useState<number | undefined>(
      numberOfMonths === 2 ? date?.to?.getFullYear() : date?.from?.getFullYear()
    );

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleClose = () => setIsPopoverOpen(false);

    const handleTogglePopover = () => setIsPopoverOpen((prev) => !prev);

    const selectDateRange = (from: Date, to: Date, range: string) => {
      const startDate = startOfDay(toDate(from, { timeZone }));
      const endDate = numberOfMonths === 2 ? endOfDay(toDate(to, { timeZone })) : startDate;
      onDateSelect({ from: startDate, to: endDate });
      setSelectedRange(range);
      setMonthFrom(from);
      setYearFrom(from.getFullYear());
      setMonthTo(to);
      setYearTo(to.getFullYear());
      closeOnSelect && setIsPopoverOpen(false);
    };

    const handleDateSelect = (range: DateRange | undefined) => {
      if (range) {
        let from = startOfDay(toDate(range.from as Date, { timeZone }));
        let to = range.to ? endOfDay(toDate(range.to, { timeZone })) : from;
        if (numberOfMonths === 1) {
          if (range.from !== date?.from) {
            to = from;
          } else {
            from = startOfDay(toDate(range.to as Date, { timeZone }));
          }
        }
        onDateSelect({ from, to });
        setMonthFrom(from);
        setYearFrom(from.getFullYear());
        setMonthTo(to);
        setYearTo(to.getFullYear());
      }
      setSelectedRange(null);
    };

    const handleMonthChange = (newMonthIndex: number, part: string) => {
      setSelectedRange(null);

      if (part === "from") {
        if (yearFrom !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
          const newMonth = new Date(yearFrom, newMonthIndex, 1);
          const from =
            numberOfMonths === 2
              ? startOfMonth(toDate(newMonth, { timeZone }))
              : date?.from
                ? new Date(date.from.getFullYear(), newMonth.getMonth(), date.from.getDate())
                : newMonth;
          const to =
            numberOfMonths === 2
              ? date?.to
                ? endOfDay(toDate(date.to, { timeZone }))
                : endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setMonthFrom(newMonth);
            setMonthTo(date?.to);
          }
        }
      } else {
        if (yearTo !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
          const newMonth = new Date(yearTo, newMonthIndex, 1);
          const from = date?.from
            ? startOfDay(toDate(date.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to = numberOfMonths === 2 ? endOfMonth(toDate(newMonth, { timeZone })) : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setMonthTo(newMonth);
            setMonthFrom(date?.from);
          }
        }
      }
    };

    const handleYearChange = (newYear: number, part: string) => {
      setSelectedRange(null);

      if (part === "from") {
        if (years.includes(newYear)) {
          const newMonth = monthFrom
            ? new Date(newYear, monthFrom ? monthFrom.getMonth() : 0, 1)
            : new Date(newYear, 0, 1);
          const from =
            numberOfMonths === 2
              ? startOfMonth(toDate(newMonth, { timeZone }))
              : date?.from
                ? new Date(newYear, newMonth.getMonth(), date.from.getDate())
                : newMonth;
          const to =
            numberOfMonths === 2
              ? date?.to
                ? endOfDay(toDate(date.to, { timeZone }))
                : endOfMonth(toDate(newMonth, { timeZone }))
              : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setYearFrom(newYear);
            setMonthFrom(newMonth);
            setYearTo(date?.to?.getFullYear());
            setMonthTo(date?.to);
          }
        }
      } else {
        if (years.includes(newYear)) {
          const newMonth = monthTo ? new Date(newYear, monthTo.getMonth(), 1) : new Date(newYear, 0, 1);
          const from = date?.from
            ? startOfDay(toDate(date.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to = numberOfMonths === 2 ? endOfMonth(toDate(newMonth, { timeZone })) : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setYearTo(newYear);
            setMonthTo(newMonth);
            setYearFrom(date?.from?.getFullYear());
            setMonthFrom(date?.from);
          }
        }
      }
    };

    const today = new Date();

    const years = Array.from({ length: yearsRange + 1 }, (_, i) => today.getFullYear() - yearsRange / 2 + i);

    const dateRanges = [
      { label: "Hoje", start: today, end: today },
      { label: "Ontem", start: subDays(today, 1), end: subDays(today, 1) },
      {
        label: "Esta Semana",
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      },
      {
        label: "Última Semana",
        start: subDays(startOfWeek(today, { weekStartsOn: 1 }), 7),
        end: subDays(endOfWeek(today, { weekStartsOn: 1 }), 7),
      },
      { label: "Últimos 7 dias", start: subDays(today, 6), end: today },
      {
        label: "Este Mês",
        start: startOfMonth(today),
        end: endOfMonth(today),
      },
      {
        label: "Último Mês",
        start: startOfMonth(subDays(today, today.getDate())),
        end: endOfMonth(subDays(today, today.getDate())),
      },
      { label: "Este Ano", start: startOfYear(today), end: endOfYear(today) },
      {
        label: "Último Ano",
        start: startOfYear(subDays(today, 365)),
        end: endOfYear(subDays(today, 365)),
      },
    ];

    const handleWheel = (event: React.WheelEvent) => {
      event.preventDefault();
      setSelectedRange(null);
    };

    React.useEffect(() => {
      const firstDayElement = document.getElementById(`firstDay-${id}`);
      const firstMonthElement = document.getElementById(`firstMonth-${id}`);
      const firstYearElement = document.getElementById(`firstYear-${id}`);
      const secondDayElement = document.getElementById(`secondDay-${id}`);
      const secondMonthElement = document.getElementById(`secondMonth-${id}`);
      const secondYearElement = document.getElementById(`secondYear-${id}`);

      const elements = [
        firstDayElement,
        firstMonthElement,
        firstYearElement,
        secondDayElement,
        secondMonthElement,
        secondYearElement,
      ];

      const addPassiveEventListener = (element: HTMLElement | null) => {
        if (element) {
          element.addEventListener("wheel", handleWheel as unknown as EventListener, {
            passive: false,
          });
        }
      };

      elements.forEach(addPassiveEventListener);

      return () => {
        elements.forEach((element) => {
          if (element) {
            element.removeEventListener("wheel", handleWheel as unknown as EventListener);
          }
        });
      };
    }, [date]);

    const isDisabled = isLoading || disabled;

    return (
      <>
        <style>
          {`
            .date-part {
              touch-action: none;
            }
          `}
        </style>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              ref={ref}
              {...props}
              variant="outline"
              onClick={handleTogglePopover}
              disabled={isDisabled}
              isLoading={isLoading}
              icon={<CalendarIcon className="mr-2 size-4" />}
              suppressHydrationWarning
              className={cn("!justify-start !gap-1 w-auto", calendarDatePickerVariants({ variant, className }))}
            >
              {date?.from ? (
                date.to ? (
                  <React.Fragment>
                    <span>{format(date.from, "dd MMM, yyyy")}</span>

                    {numberOfMonths === 2 && (
                      <React.Fragment>
                        {" - "}
                        <span>{format(date.to, "dd MMM, yyyy")}</span>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                  <span>{format(date.from, "dd MMM, yyyy")}</span>
                )
              ) : (
                <span>Selecione uma Data</span>
              )}
            </Button>
          </PopoverTrigger>
          {isPopoverOpen && (
            <PopoverContent
              className="w-auto"
              align={align}
              avoidCollisions={false}
              onInteractOutside={handleClose}
              onEscapeKeyDown={handleClose}
              style={{
                maxHeight: "var(--radix-popover-content-available-height)",
                overflowY: "auto",
              }}
            >
              <div className="flex">
                {numberOfMonths === 2 && (
                  <div className="hidden flex-col gap-1 border-foreground/10 border-r pr-4 text-left md:flex">
                    {dateRanges.map(({ label, start, end }) => (
                      <Button
                        key={label}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "justify-start hover:bg-primary/70 hover:text-foreground",
                          selectedRange === label && "bg-primary text-foreground hover:bg-primary/60"
                        )}
                        onClick={() => {
                          selectDateRange(start, end, label);
                          setMonthFrom(start);
                          setYearFrom(start.getFullYear());
                          setMonthTo(end);
                          setYearTo(end.getFullYear());
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="ml-3 flex gap-2">
                      <Select
                        onValueChange={(value) => {
                          handleMonthChange(months.indexOf(value), "from");
                          setSelectedRange(null);
                        }}
                        value={monthFrom ? months[monthFrom.getMonth()] : undefined}
                      >
                        <SelectTrigger className="hidden w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month, idx) => (
                            <SelectItem key={idx} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={(value) => {
                          handleYearChange(Number(value), "from");
                          setSelectedRange(null);
                        }}
                        value={yearFrom ? yearFrom.toString() : undefined}
                      >
                        <SelectTrigger className="hidden w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year, idx) => (
                            <SelectItem key={idx} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {numberOfMonths === 2 && (
                      <div className="flex gap-2">
                        <Select
                          onValueChange={(value) => {
                            handleMonthChange(months.indexOf(value), "to");
                            setSelectedRange(null);
                          }}
                          value={monthTo ? months[monthTo.getMonth()] : undefined}
                        >
                          <SelectTrigger className="hidden w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month, idx) => (
                              <SelectItem key={idx} value={month}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          onValueChange={(value) => {
                            handleYearChange(Number(value), "to");
                            setSelectedRange(null);
                          }}
                          value={yearTo ? yearTo.toString() : undefined}
                        >
                          <SelectTrigger className="hidden w-[122px] font-medium hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 sm:flex">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year, idx) => (
                              <SelectItem key={idx} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <Calendar
                      mode="range"
                      defaultMonth={monthFrom}
                      month={monthFrom}
                      onMonthChange={setMonthFrom}
                      selected={date}
                      onSelect={handleDateSelect}
                      numberOfMonths={numberOfMonths}
                      showOutsideDays={false}
                      className={className}
                      locale={ptBR}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </>
    );
  }
);

CalendarDatePicker.displayName = "CalendarDatePicker";
