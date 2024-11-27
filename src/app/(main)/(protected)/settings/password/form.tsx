"use client";

import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trpc } from "@/trpc/client";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { ChangePasswordFormData, changePasswordFormSchema } from "@/validation/auth/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileFormProps {
  email: string;
}

export function ChangePasswordForm({ email }: ProfileFormProps) {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    values: {
      email,
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = trpc.auth.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");

      form.reset();
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, "Ocorreu uma falha ao tentar alterar a senha do usuário!");

      toast.error(errorMessage);
    },
  });

  async function onSubmit(values: ChangePasswordFormData) {
    mutate(values);
  }

  const isLoading = isPending;

  const { handleSubmit, control } = form;

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
                <InputPassword placeholder="Digite a senha antiga:" disabled={isLoading} {...field} />
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
                <InputPassword placeholder="Digite a nova senha:" disabled={isLoading} {...field} />
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
                <InputPassword placeholder="Digite a confirmação de nova senha:" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          aria-label="Submit for update user data"
          isLoading={isLoading}
          icon={<SaveIcon />}
          size="sm"
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
