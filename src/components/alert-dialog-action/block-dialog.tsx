import { Button } from "@/components/ui/button";
import type { AlertDialogActionType } from "@/types/dialog-action";
import { BanIcon, XIcon } from "lucide-react";
import { AlertDialogActionLayout } from ".";
import { AlertDialogCancel } from "../ui/alert-dialog";

interface AlertDialogBlockProps extends AlertDialogActionType {}

export function AlertDialogBlockAction({
  isOpen,
  isLoading,
  setIsOpen,
  onHandleClick,
  messages,
}: AlertDialogBlockProps): JSX.Element {
  return (
    <AlertDialogActionLayout isOpen={isOpen} messages={messages} setIsOpen={setIsOpen}>
      <AlertDialogCancel asChild>
        <Button type="button" variant="secondary" icon={<XIcon className="size-4" />} disabled={isLoading}>
          Cancelar
        </Button>
      </AlertDialogCancel>

      <Button isLoading={isLoading} onClick={onHandleClick} icon={<BanIcon className="size-4" />}>
        Bloquear
      </Button>
    </AlertDialogActionLayout>
  );
}
