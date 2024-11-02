"use client";

import { GoogleIcon } from "@/components/icons/google";
import { KEY_PROVIDER_SELECTED } from "@/constants/globals";
import { MailIcon } from "lucide-react";
import type { BuiltInProviderType } from "next-auth/providers/index";
import { type LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { useState, useTransition } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AuthButton } from "../_components/auth-button";

export type AuthProviderType = LiteralUnion<BuiltInProviderType>;

export function SignInProviders(): JSX.Element {
  const router = useRouter();
  const [isPendingRedirectCredentials, startTransitionRedirectCredentials] = useTransition();
  const [providerSelectedOnStorage, setProviderSelectedOnStorage] = useLocalStorage<AuthProviderType | null>(
    KEY_PROVIDER_SELECTED,
    null
  );

  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  async function onHandleSelectedProvider(providerType: AuthProviderType) {
    if (providerType === "credentials") {
      startTransitionRedirectCredentials(() => {
        router.push("/sign-in/credentials");
      });
    } else {
      setIsRedirect(true);

      await signIn(providerType).then(() => {
        setProviderSelectedOnStorage(providerType);
      });

      setIsRedirect(false);
    }
  }

  return (
    <div className="grid space-y-2 pt-2">
      <AuthButton
        providerType="google"
        label="Google"
        onClick={() => onHandleSelectedProvider("google")}
        variant="outline"
        icon={<GoogleIcon />}
        isLoading={isRedirect}
        disabled={isPendingRedirectCredentials}
        isProviderWasSelectedAtLastLogin={providerSelectedOnStorage === "google"}
      />

      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">OU CONTINUAR COM</span>
        </div>
      </div>

      <AuthButton
        providerType="credentials"
        label="E-mail"
        onClick={() => onHandleSelectedProvider("credentials")}
        variant="outline"
        icon={<MailIcon className="size-4" />}
        isLoading={isPendingRedirectCredentials}
        disabled={isRedirect}
        isProviderWasSelectedAtLastLogin={providerSelectedOnStorage === "credentials"}
      />
    </div>
  );
}
