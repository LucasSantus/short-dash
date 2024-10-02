"use client";

import { InputMask } from "@/components/input-mask";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { messages } from "@/constants/messages";
import { updateUserMutation } from "@/graphql/mutations/update-user";
import { useMe } from "@/hooks/use-me";
import { graphQLClient } from "@/lib/graphql-request/client";
import type { User } from "@/types/User";
import { UserRole } from "@/types/user-role";
import { type UpdateMeSchema, updateMeSchema } from "@/validation/update/me";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserDeleteAction } from "./user-delete";

export function AccountForm(): JSX.Element {
  const { user, setUser } = useMe();
  const router = useRouter();

  const form = useForm<UpdateMeSchema>({
    resolver: zodResolver(updateMeSchema),
    defaultValues: {
      name: user?.name ?? "",
      cpf: user?.cpf ?? "",
      email: user?.email ?? "",
      roles: user?.roles?.map((item) => UserRole[item]) ?? ([UserRole.Admin] as UserRole[]),
    },
  });

  const { mutateAsync: updateMeFn, isPending: isUpdateMeFnPending } = useMutation({
    mutationFn: async (values: UpdateMeSchema) => {
      if (!user?.id) {
        toast.error(messages.globals.ERROR_DATA_HAS_BEEN_UPDATED);
        return;
      }

      const roles = values.roles.length > 0 ? values.roles : [UserRole.Admin];

      if (!roles.includes(UserRole.Admin)) roles.push(UserRole.Admin);

      await graphQLClient.request(updateUserMutation, {
        id: user.id,
        input: {
          name: values.name,
          cpf: values.cpf,
          roles,
        },
      });
    },
    onSuccess: async (_, variables) => {
      const updateUser: Omit<User, "status" | "email" | "id"> = {
        cpf: variables.cpf,
        name: variables.name,
        roles: variables.roles,
      };

      setUser((state) => {
        if (!state) return null;

        return {
          ...state,
          ...updateUser,
        };
      });

      toast.success(messages.globals.DATA_HAS_BEEN_UPDATED);

      await router.push("/dashboard");
    },
    onError: (error) => {
      console.error(error);
      toast.error(messages.globals.ERROR_DATA_HAS_BEEN_UPDATED);
    },
  });

  function onHandleSubmit(values: UpdateMeSchema) {
    updateMeFn(values);
  }

  const { control } = form;

  const roles = [
    {
      value: UserRole.Admin,
      label: "Administrador",
    },
    {
      value: UserRole.Affiliate,
      label: "Afiliado",
    },
    {
      value: UserRole.Producer,
      label: "Produtor",
    },
    {
      value: UserRole.Student,
      label: "Estudante",
    },
  ];

  const isDisabled = isUpdateMeFnPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex flex-col gap-4">
        <FormField
          control={control}
          disabled
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Insira o E-mail" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          disabled={isDisabled}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Insira o Nome Completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          disabled={isDisabled}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cpf</FormLabel>
              <FormControl>
                <InputMask format="###.###.###-##" placeholder="Insira o CPF" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funções</FormLabel>
              <FormControl>
                <MultiSelect
                  options={roles}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  variant="secondary"
                  placeholder="Selecione uma Função"
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CardFooter className="p-0 justify-end gap-2">
          {!!user?.id && <UserDeleteAction userId={user.id} isDisabled={isUpdateMeFnPending} />}

          <Button icon={<SaveIcon className="size-4" />} isLoading={isUpdateMeFnPending}>
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
