import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { AlertDialogActionType } from "@/types/dialog-action";
import { OctagonAlertIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface AlertDialogActionLayoutProps
  extends Omit<AlertDialogActionType, "onHandleClick" | "isLoading">,
    PropsWithChildren {}

export function AlertDialogActionLayout({
  isOpen,
  setIsOpen,
  messages,
  children,
}: AlertDialogActionLayoutProps): JSX.Element {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {isOpen && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{messages.title}</AlertDialogTitle>
            <AlertDialogDescription>{messages.description}</AlertDialogDescription>
          </AlertDialogHeader>

          <Alert variant="destructive">
            <OctagonAlertIcon className="size-4" />
            <AlertTitle>{messages.alert.title ?? "Atenção:"} </AlertTitle>
            <AlertDescription>{messages.alert.description}</AlertDescription>
          </Alert>

          <AlertDialogFooter className="gap-2 pt-2 sm:space-x-0">{children}</AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
