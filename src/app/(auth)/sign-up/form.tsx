"use client";

import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { type SignUpFormData, signUpFormSchema } from "@/validation/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignUpForm() {
  const { mutateAsync, isPending } = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
    },
  });

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: SignUpFormData) {
    try {
      await mutateAsync(values);
    } catch (error) {
      let errorMessage = "Ocorreu um problema!";

      if (error instanceof TRPCClientError) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <div className="grid gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o Nome:" {...field} isLoading={isPending} />
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
                  <Input placeholder="Digite o e-mail:" {...field} isLoading={isPending} />
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
                  <InputPassword placeholder="Digite a senha:" {...field} isLoading={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            aria-label="Submit for create new user"
            isLoading={isPending}
            icon={<SaveIcon className="size-4" />}
            className="mt-2"
          >
            Salvar
          </Button>
        </form>
      </div>
    </Form>
  );
}
