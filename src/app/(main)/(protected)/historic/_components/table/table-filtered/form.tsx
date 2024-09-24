import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const historicFilteredSchema = z.object({
  linkIds: z.array(z.string()),
});

type HistoricFilteredSchema = z.infer<typeof historicFilteredSchema>;

interface HistoricTableFilteredFormProps extends PropsWithChildren {}

export function HistoricTableFilteredForm({ children }: HistoricTableFilteredFormProps): JSX.Element {
  const form = useForm<HistoricFilteredSchema>({
    resolver: zodResolver(historicFilteredSchema),
  });

  function onSubmit(values: HistoricFilteredSchema) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid gap-4 py-4">
        <FormField
          control={form.control}
          name="linkIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Links</FormLabel>
              <FormControl>
                <MultiSelect defaultValue={field.value} onValueChange={() => {}} options={[]} />
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
