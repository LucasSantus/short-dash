"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const createLinkSchema = z.object({
  name: z.string(),
  path: z.string(),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;

interface LinkFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<CreateLinkSchema>;
  onSubmit: (data: CreateLinkSchema) => void;
}

export function LinkForm({ form, onSubmit, children }: LinkFormProps) {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={control}
          name="name"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Insira o Título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="path"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Insira a Url" {...field} />
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
