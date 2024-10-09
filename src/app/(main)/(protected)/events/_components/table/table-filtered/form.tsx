import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { useEventFilters } from "@/hooks/filters/use-event-filters";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const eventFilteredSchema = z.object({
  linkIds: z.array(z.string()),
  createdAt: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

export type EventFilteredSchema = z.infer<typeof eventFilteredSchema>;

interface EventTableFilteredFormProps extends PropsWithChildren {
  onSubmit(values: EventFilteredSchema): void;
}

export function EventTableFilteredForm({ onSubmit, children }: EventTableFilteredFormProps): JSX.Element {
  const { data: allLinks, isLoading: isLoadingAllLinks } = trpc.link.allLinkListOptions.useQuery();

  const { filters } = useEventFilters();

  const form = useForm<EventFilteredSchema>({
    resolver: zodResolver(eventFilteredSchema),
    defaultValues: {
      linkIds: filters.linkIds ?? [],
      // createdAt: filters.createdAt,
      // filters?.createdAt?.from && filters?.createdAt?.to
      //   ? {
      //       from: new Date(filters.createdAt.from),
      //       to: new Date(filters.createdAt.to),
      //     }
      //   : undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

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
                  onDateSelect={field.onChange}
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
