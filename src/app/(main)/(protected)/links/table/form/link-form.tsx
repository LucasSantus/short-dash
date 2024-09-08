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
import { Textarea } from "@/components/ui/textarea";
import { LinkSchema } from "@/validation/main/link";
import { LinkIcon } from "lucide-react";
import * as React from "react";
import { type UseFormReturn } from "react-hook-form";

interface LinkFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<LinkSchema>;
  onSubmit: (data: LinkSchema) => void;
}

export function LinkForm({ form, onSubmit, children }: LinkFormProps) {
  const { control } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={control}
          name="title"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Insira o Descrição"
                  {...field}
                  className="min-h-28 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="originalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url de Redirecionamento</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira a Url de Redirecionamento"
                  startComponent={<LinkIcon className="size-4" />}
                  {...field}
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
