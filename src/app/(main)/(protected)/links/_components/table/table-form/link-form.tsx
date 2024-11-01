"use client";

import { DetailView, DetailViewContent, DetailViewTrigger } from "@/components/detail-view";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { LinkSchema } from "@/validation/main/link";
import { LinkIcon } from "lucide-react";
import type * as React from "react";
import type { UseFormReturn } from "react-hook-form";

interface LinkFormProps extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<LinkSchema>;
  onSubmit: (data: LinkSchema) => void;
  isPending: boolean;
  children: React.ReactNode;
}

export function LinkForm({ form, onSubmit, isPending, children }: LinkFormProps) {
  const { control } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
        <FormField
          control={control}
          name="title"
          disabled={isPending}
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
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Insira o Descrição" {...field} className="min-h-28 resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="originalUrl"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <DetailView>
                  <DetailViewTrigger>Url de Redirecionamento</DetailViewTrigger>

                  <DetailViewContent>
                    A URL para a qual os usuários serão redirecionados ao acessarem o link encurtado.
                  </DetailViewContent>
                </DetailView>
              </FormLabel>
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
