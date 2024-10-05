"use client";

import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChangePasswordFormData, changePasswordFormSchema } from "@/validation/auth/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface ProfileFormProps {
  email: string;
}

export function ChangePasswordForm({ email }: ProfileFormProps) {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    values: {
      email: email ?? "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ChangePasswordFormData) {
    // await showToastBeforeSubmit({
    //   callback: async () => await authChangePasswordServer(values),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha Antiga</FormLabel>
              <FormControl>
                <InputPassword placeholder="Digite a senha antiga:" isLoading={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Digite a nova senha:" isLoading={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmação de Nova Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Digite a confirmação de nova senha:" isLoading={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          aria-label="Submit for update user data"
          isLoading={isSubmitting}
          icon={<SaveIcon className="size-4" />}
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
