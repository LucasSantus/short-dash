"use client";

import { authenticate } from "@/actions/auth/authenticate";
import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { KEY_PROVIDER_SELECTED } from "@/constants/globals";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { type SignInFormData, signInFormSchema } from "@/validation/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LogInIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { AuthLink } from "../_components/auth-link";
import { AuthProviderType } from "./providers";

export function SignInForm() {
  const router = useRouter();
  const [isRedirectPending, startRedirectTransition] = useTransition();
  const [_, setProviderSelectedOnStorage] = useLocalStorage<AuthProviderType | null>(KEY_PROVIDER_SELECTED, null);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SignInFormData) => {
      await authenticate(values);
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(
        error,
        "Ocorreu um problema ao tentar autenticar na plataforma, tente novamente mais tarde!"
      );

      toast.error(errorMessage);
    },
    onSuccess: () => {
      setProviderSelectedOnStorage("credentials");

      startRedirectTransition(() => router.push("/dashboard"));
    },
  });

  async function onSubmit(values: SignInFormData) {
    mutate(values);
  }

  const isLoading = isRedirectPending || isPending;

  const { handleSubmit, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite o e-mail:" disabled={isLoading} {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Digite a senha:" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <AuthLink title="Esqueci minha senha" href="/forget-password" />
        </div>

        <Button
          type="submit"
          aria-label="log-in in system"
          isLoading={isLoading}
          icon={<LogInIcon className="size-4" />}
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
}
