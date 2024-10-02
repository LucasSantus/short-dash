import { Button } from "@/components/ui/button";
import type { AlertDialogActionType } from "@/types/dialog-action";
import { TrashIcon, XIcon } from "lucide-react";
import { AlertDialogActionLayout } from ".";
import { AlertDialogCancel } from "../ui/alert-dialog";

interface AlertDeleteDialogProps extends AlertDialogActionType {}

export function AlertDialogDeleteAction({
  isOpen,
  isLoading,
  setIsOpen,
  onHandleClick,
  messages,
}: AlertDeleteDialogProps): JSX.Element {
  return (
    <AlertDialogActionLayout isOpen={isOpen} messages={messages} setIsOpen={setIsOpen}>
      <AlertDialogCancel asChild>
        <Button type="button" variant="secondary" icon={<XIcon className="size-4" />} disabled={isLoading}>
          Cancelar
        </Button>
      </AlertDialogCancel>

      <Button
        variant="destructive"
        isLoading={isLoading}
        onClick={onHandleClick}
        icon={<TrashIcon className="size-4" />}
      >
        Deletar
      </Button>
    </AlertDialogActionLayout>
  );
}
