import { messages } from "@/constants/messages";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ToastBeforeSubmitProps {
  message?: {
    loading?: string;
    success?: string;
  };
  callback: () => void;
  urlToRedirect?: string;
}

interface HelperSubmitResponse {
  isRedirecting: boolean;
  showToastBeforeSubmit: (props: ToastBeforeSubmitProps) => void;
}

export function useHelperSubmit(): HelperSubmitResponse {
  const router = useRouter();
  const [isRedirecting, startTransition] = useTransition();

  async function showToastBeforeSubmit({ message, callback, urlToRedirect }: ToastBeforeSubmitProps) {
    const toastId = toast.loading(message?.loading);

    try {
      await callback();

      toast.success(message?.success ?? messages.form.DATA_HAS_BEEN_UPDATED, {
        id: toastId,
        duration: 1500,
      });

      await new Promise((resolve) =>
        setTimeout(async () => {
          resolve(null);
        }, 1400)
      );

      startTransition(async () => {
        if (urlToRedirect) {
          router.push(urlToRedirect);
        } else {
          router.refresh();
        }
      });
    } catch (error) {
      console.error(error);

      toast.error("Ocorreu um erro inesperado!");
    }
  }

  return { isRedirecting, showToastBeforeSubmit };
}
