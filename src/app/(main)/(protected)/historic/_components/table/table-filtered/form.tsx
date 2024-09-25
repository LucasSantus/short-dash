import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useHistoricFilters } from "../../../_hooks/use-historic-filters";

const historicFilteredSchema = z.object({
  linkIds: z.array(z.string()),
  createdAt: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
});

type HistoricFilteredSchema = z.infer<typeof historicFilteredSchema>;

interface HistoricTableFilteredFormProps extends PropsWithChildren {}

export function HistoricTableFilteredForm({ children }: HistoricTableFilteredFormProps): JSX.Element {
  const { data: allLinks, isLoading: isLoadingAllLinks } = trpc.link.listOptions.useQuery();

  const { filters, setFilters } = useHistoricFilters();

  // TODO: PROBLEMA PARA RECUPERAR OS VALORES DA DATA NO SEARCH PARAM

  const form = useForm<HistoricFilteredSchema>({
    resolver: zodResolver(historicFilteredSchema),
    defaultValues: {
      linkIds: filters.linkIds,

      createdAt: {
        from: filters?.date?.createdAt?.from ? new Date(filters?.date?.createdAt?.from) : new Date(),
        to: filters?.date?.createdAt?.to ? new Date(filters?.date?.createdAt?.to) : undefined,
      },
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  function onSubmit({ createdAt, linkIds }: HistoricFilteredSchema) {
    setFilters({
      date: {
        createdAt,
      },
      linkIds,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={control}
          name="linkIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Links</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Selecione um Link"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  options={allLinks?.data ?? []}
                  maxCount={1}
                  isLoading={isLoadingAllLinks || isSubmitting}
                  modalPopover
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="createdAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Acesso</FormLabel>
              <FormControl>
                <CalendarDatePicker
                  date={field.value}
                  onDateSelect={({ from, to }) =>
                    setValue("createdAt", {
                      from,
                      to,
                    })
                  }
                  variant="outline"
                  className="w-full justify-start"
                  isLoading={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  );
}
