"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { getApiErrorMessage } from "@/utils/get-api-error-message";
import { ProfileFormData, profileFormSchema } from "@/validation/settings/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, SaveIcon, User2Icon } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DeactiveAccountAlertDialog } from "./_components/deactive-account-alert-dialog";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    values: {
      name: user.name ?? "",
      email: user.email ?? "",
    },
  });

  const { mutate, isPending } = trpc.user.updateProfile.useMutation({
    onSuccess: async (_, variables) => {
      toast.success("Usuário alterado com sucesso!");

      await update(variables);

      router.refresh();
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error, "Ocorreu uma falha ao tentar alterar a senha do usuário!");

      toast.error(errorMessage);
    },
  });

  async function onSubmit(values: ProfileFormData) {
    mutate(values);
  }

  const isLoading = isPending;

  const { handleSubmit, control } = form;

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
                  disabled={isLoading}
                  startComponent={<User2Icon />}
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
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o e-mail:"
                  startComponent={<MailIcon />}
                  readOnly
                  className="cursor-not-allowed opacity-70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-2">
          <Button
            type="submit"
            aria-label="Submit for update user data"
            isLoading={isLoading}
            icon={<SaveIcon />}
            size="sm"
          >
            Salvar
          </Button>

          <DeactiveAccountAlertDialog />
        </div>
      </form>
    </Form>
  );
}
