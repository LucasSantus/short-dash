"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Fragment, useState } from "react";
import { UserDeleteDialog } from "./user-delete-dialog";

interface UserDeleteActionProps {
  userId: string;
  isDisabled: boolean;
}

export function UserDeleteAction({ userId, isDisabled }: UserDeleteActionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <Button
        disabled={isDisabled}
        variant="destructive"
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        icon={<Trash2Icon className="size-4" />}
      >
        Deletar Conta
      </Button>

      <UserDeleteDialog userId={userId} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Fragment>
  );
}
