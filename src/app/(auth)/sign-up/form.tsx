"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface SearchFormProps {}

import { InputPassword } from "@/components/input-password";
import { useHelperSubmit } from "@/hooks/use-helper-submit";
import { SignUpFormData, signUpFormSchema } from "@/validation/auth/sign-up";
import { useState } from "react";
import { authSignUpServer } from "./sign-up.action";

export function SignUpForm({}: SearchFormProps) {
  const [isRedirectingToProviders, setIsRedirectingToProviders] =
    useState<boolean>(false);

  const { showToastBeforeSubmit } = useHelperSubmit();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignUpFormData) {
    await showToastBeforeSubmit({
      urlToRedirect: "/sign-in",
      message: {
        loading: "Registrando novo usuário...",
        success: "Usuário registrado com sucesso!",
      },
      callback: async () => await authSignUpServer(values),
    });
  }

  const isDisabled = isSubmitting || isRedirectingToProviders;

  return (
    <Form {...form}>
      <div className="grid gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-2">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primeiro Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o Primeiro Nome:"
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o sobrenome:"
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o e-mail:"
                    disabled={isDisabled}
                    {...field}
                  />
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
                  <InputPassword
                    placeholder="Digite a senha:"
                    disabled={isDisabled}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            aria-label="Submit for create new user"
            // isLoading={isSubmitting}
            disabled={isDisabled}
            // icon={<SaveIcon className="size-4" />}
          >
            Salvar
          </Button>
        </form>

        {/* <AuthenticationProviders
          isDisabled={isDisabled}
          isRedirecting={isRedirectingToProviders}
          setIsRedirecting={setIsRedirectingToProviders}
        /> */}
      </div>
    </Form>
  );
}
