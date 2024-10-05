"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileFormData, profileFormSchema } from "@/validation/settings/profile";
import { useQuery } from "@tanstack/react-query";
import { MailIcon, SaveIcon, User2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { DeleteAccount } from "./_components/delete-account";

interface ProfileFormProps {
  id: string;
}

export function ProfileForm({ id }: ProfileFormProps) {
  const { update } = useSession();

  const {
    data: profile,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: async () => {
      return {
        name: "",
        email: "",
      };
    },
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    values: {
      name: profile?.name ?? "",
      email: profile?.email ?? "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ProfileFormData) {
    // await showToastBeforeSubmit({
    //   callback: async () => {
    //     await updateProfileServer(values);
    //     await update(values);
    //   },
    // });
  }

  // if (isError) {
  //   if (error instanceof Error) toast.error(error.message)
  // }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome completo:"
                  isLoading={isLoading}
                  disabled={isSubmitting || isLoading}
                  startComponent={<User2Icon className="size-5" />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o e-mail:"
                  isLoading={isLoading}
                  startComponent={<MailIcon className="size-5" />}
                  readOnly
                  className="cursor-not-allowed opacity-70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-start gap-2">
          <Button
            type="submit"
            aria-label="Submit for update user data"
            isLoading={isSubmitting}
            icon={<SaveIcon className="size-4" />}
          >
            Salvar
          </Button>

          <DeleteAccount userId={id} />
        </div>
      </form>
    </Form>
  );
}
