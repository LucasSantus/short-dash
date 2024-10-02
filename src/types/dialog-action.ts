import type { Dispatch, SetStateAction } from "react";

export type AlertDialogActionType = {
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onHandleClick: () => void;
  messages: {
    title: string;
    description: string;
    alert: {
      title?: string;
      description: string;
    };
  };
};
