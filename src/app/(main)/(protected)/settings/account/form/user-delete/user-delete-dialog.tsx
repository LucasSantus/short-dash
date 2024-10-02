import { AlertDialogDeleteAction } from "@/components/alert-dialog-action/delete-dialog";
import { messages } from "@/constants/messages";
import { excludedUserMutation } from "@/graphql/mutations/excluded-user";
import { useLogoutMutation } from "@/hooks/graphql/mutations/use-logout";
import { graphQLClient } from "@/lib/graphql-request/client";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface UserDeleteDialogProps {
  userId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function UserDeleteDialog({ userId, isOpen, setIsOpen }: UserDeleteDialogProps): JSX.Element {
  const { mutateAsync: logoutFn } = useLogoutMutation();

  const { mutateAsync: excludedMeFn, isPending: isExcludedMePending } = useMutation({
    mutationFn: async () => {
      await graphQLClient.request(excludedUserMutation, {
        id: userId,
      });
    },
    onSuccess: async () => await logoutFn(),
    onError: (error) => {
      console.error(error);
      toast.error(messages.globals.ERROR_DATA_HAS_BEEN_UPDATED);
    },
  });

  return (
    <AlertDialogDeleteAction
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isLoading={isExcludedMePending}
      onHandleClick={() => excludedMeFn()}
      messages={{
        title: "Confirmação de Exclusão de Conta",
        description: "Tem certeza de que deseja excluir permanentemente sua conta?",
        alert: {
          description: "Após essa ação, sua conta será excluída permanentemente e você perderá o acesso à plataforma.",
        },
      }}
    />
  );
}
