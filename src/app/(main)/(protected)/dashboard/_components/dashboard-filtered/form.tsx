import { Button } from "@/components/ui/button";
import { months } from "@/components/ui/calendar-date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect, MultiSelectOptions } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetAlertFooter } from "@/components/ui/sheet";
import { getYearsPerRange } from "@/utils/get-range-years";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMonth, getYear } from "date-fns";
import { FilterIcon, XIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDashboardFilters } from "../../_hooks/use-dashboard-filters";

const dashboardFilteredSchema = z.object({
  year: z.coerce
    .number()
    .int()
    .min(1900, { message: "O ano deve ser maior ou igual a 1900." })
    .max(2100, { message: "O ano deve ser menor ou igual a 2100." }),
  month: z.coerce
    .number()
    .int()
    .min(1, { message: "O mês deve ser no mínimo 1 (Janeiro)." })
    .max(12, { message: "O mês deve ser no máximo 12 (Dezembro)." }),
  linkIds: z.array(z.string().optional()),
});

export type DashboardFilteredSchema = z.infer<typeof dashboardFilteredSchema>;

interface DashboardFilteredFormFormProps {
  linkOptions: MultiSelectOptions;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function DashboardFilteredForm({ linkOptions, setIsOpen }: DashboardFilteredFormFormProps): JSX.Element {
  const { filters, setFilters } = useDashboardFilters();

  const form = useForm<DashboardFilteredSchema>({
    resolver: zodResolver(dashboardFilteredSchema),
    defaultValues: {
      year: filters.year,
      month: filters.month,
      linkIds: filters.linkId ? [filters.linkId] : [],
    },
  });

  function onSubmit({ month, year, linkIds }: DashboardFilteredSchema) {
    const linkId = linkIds.at(0) ?? null;

    setFilters({
      month: Number(month),
      year: Number(year),
      linkId,
    });

    setIsOpen(false);
  }

  function onHandleRemoveFilters() {
    const today = new Date();

    const linkId = linkOptions[0]?.value ?? null;

    setFilters({
      year: getYear(today),
      month: getMonth(today) + 1,
      linkId,
    });

    setIsOpen(false);
  }

  const { handleSubmit, control } = form;

  const years = getYearsPerRange();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mês</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={`${index + 1}`}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="linkIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Links</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Selecione um Link"
                  defaultValue={field.value as string[]}
                  onValueChange={field.onChange}
                  options={linkOptions}
                  maxCount={1}
                  showSelectedAll={false}
                  modalPopover
                  multiple={false}
                  disabled={!linkOptions.length}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SheetAlertFooter message="Aplique os filtros antes de sair.">
          <Button
            type="button"
            variant="secondary"
            icon={<XIcon className="size-4" />}
            onClick={onHandleRemoveFilters}
            className="w-full"
          >
            Remover Filtros
          </Button>

          <Button icon={<FilterIcon className="size-4" />} className="w-full">
            Aplicar Filtros
          </Button>
        </SheetAlertFooter>
      </form>
    </Form>
  );
}
