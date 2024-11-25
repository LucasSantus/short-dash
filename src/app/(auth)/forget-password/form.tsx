"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { ForgetPasswordFormData, forgetPasswordFormSchema } from "@/validation/auth/forget-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ForgetPasswordFormProps {}

export function ForgetPasswordForm({}: ForgetPasswordFormProps) {
  const router = useRouter();
  const [isRedirectPending, startRedirectTransition] = useTransition();

  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordFormSchema),
  });

  const { mutate, isPending } = trpc.auth.forgetPassword.useMutation({
    onSuccess: () => {
      toast.success("E-mail enviado com sucesso!");
      startRedirectTransition(() => router.push("/forget-password/success"));
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(
        error,
        "Não foi possível iniciar o processo de recuperação da conta. Por favor, tente novamente mais tarde."
      );

      toast.error(errorMessage);
    },
  });

  async function onSubmit(values: ForgetPasswordFormData) {
    mutate(values);
  }

  const isLoading = isPending || isRedirectPending;

  const { handleSubmit, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite o e-mail:" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" aria-label="forget password of user" isLoading={isLoading} icon={<SendIcon />}>
          Enviar E-mail
        </Button>
      </form>
    </Form>
  );
}
