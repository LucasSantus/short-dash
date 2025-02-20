"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { messages } from "@/constants/messages";
import { AppearanceFormData, appearanceFormSchema } from "@/validation/settings/appearance";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();

  const form = useForm<AppearanceFormData>({
    resolver: zodResolver(appearanceFormSchema),
    values: {
      theme: (theme as "light" | "dark") ?? "dark",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  function onSubmit(data: AppearanceFormData) {
    setTheme(data.theme);

    toast.success(messages.globals.data.updated);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Tema</FormLabel>
              <FormDescription>Selecione o tema para o sistema.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-1 gap-8 pt-2 sm:grid-cols-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="cursor-pointer items-center rounded-md border-2 border-muted p-1 transition-colors delay-150 duration-1 ease-in hover:border-accent hover:opacity-90">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-medium">Claro</span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1 transition-colors delay-150 duration-100 ease-in hover:bg-accent hover:text-accent-foreground hover:opacity-90">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-medium">Escuro</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          aria-label="Submit for update user data"
          isLoading={isSubmitting}
          icon={<SaveIcon />}
          size="sm"
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
