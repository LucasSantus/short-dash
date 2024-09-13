"use client";

import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignInFormData, signInFormSchema } from "@/validation/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthLink } from "../_components/auth-link";
import { AuthProviders } from "../_components/auth-providers";

export function SignInForm() {
  const router = useRouter();

  const [isRedirectingToProviders, setIsRedirectingToProviders] = useState<boolean>(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit({ email, password }: SignInFormData) {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!!response && response.error) {
        toast.error(response.error);
      }

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const isDisabled = isSubmitting || isRedirectingToProviders;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-2">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o e-mail:" disabled={isDisabled} {...field} />
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
                  <InputPassword placeholder="Digite a senha:" disabled={isDisabled} {...field} />
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
            isLoading={isSubmitting}
            disabled={isDisabled}
            icon={<LogInIcon className="size-4" />}
          >
            Entrar
          </Button>
        </div>
      </form>

      <AuthProviders
        isDisabled={isDisabled}
        isRedirecting={isRedirectingToProviders}
        setIsRedirecting={setIsRedirectingToProviders}
      />
    </Form>
  );
}
