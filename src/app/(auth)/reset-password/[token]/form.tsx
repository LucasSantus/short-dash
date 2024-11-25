"use client";

import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trpc } from "@/trpc/client";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { ResetPasswordFormData, resetPasswordFormSchema } from "@/validation/auth/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  email: string;
}

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isPendingRedirect, startRedirectTransition] = useTransition();

  const { mutate, isPending } = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      toast.success("Senha recuperada com sucesso!");

      startRedirectTransition(() => router.push("/sign-in"));
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, "Ocorreu uma falha ao tentar recuperar a senha do usuário!");

      toast.error(errorMessage);
    },
  });

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email,
    },
  });

  async function onSubmit(values: ResetPasswordFormData) {
    mutate(values);
  }

  const isLoading = isPendingRedirect || isPending;

  const { handleSubmit, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Digite a senha:" disabled={isLoading} {...field} />
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
              <FormLabel>Confirmação de Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Digite a confirmação de senha:" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" aria-label="reset password of user" isLoading={isLoading} icon={<SaveIcon />}>
          Salvar
        </Button>
      </form>
    </Form>
  );
}
