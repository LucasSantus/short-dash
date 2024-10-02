"use client";

import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { messages } from "@/constants/messages";
import type { ChangePassword } from "@/validation/update/change-password";
import { updateMeSchema } from "@/validation/update/me";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ChangePasswordForm(): JSX.Element {
  const router = useRouter();

  const form = useForm<ChangePassword>({
    resolver: zodResolver(updateMeSchema),
  });

  const { mutateAsync: changePasswordFn, isPending: isChangePasswordPending } = useMutation({
    mutationFn: async ({}: ChangePassword) => {
      // await graphQLClient.request(updateUserMutation, {
      //   id: user.id,
      //   input: {
      //     name: values.name,
      //     cpf: values.cpf,
      //     roles,
      //   },
      // });
    },
    onSuccess: async () => {
      toast.success(messages.globals.DATA_HAS_BEEN_UPDATED);

      await router.push("/dashboard");
    },
    onError: (error) => {
      console.error(error);
      toast.error(messages.globals.ERROR_DATA_HAS_BEEN_UPDATED);
    },
  });

  function onHandleSubmit(values: ChangePassword) {
    changePasswordFn(values);
  }

  const { control } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={control}
          disabled={isChangePasswordPending}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Insira o Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          disabled={isChangePasswordPending}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Insira o Nova Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          disabled={isChangePasswordPending}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmação de Nova Senha</FormLabel>
              <FormControl>
                <InputPassword placeholder="Insira a Confirmação de Nova Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CardFooter className="p-0 justify-end gap-2">
          <Button icon={<SaveIcon className="size-4" />} isLoading={isChangePasswordPending}>
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
