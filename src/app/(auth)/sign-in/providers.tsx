"use client";

import { GoogleIcon } from "@/components/icons/google";
import { KEY_PROVIDER_SELECTED } from "@/constants/globals";
import type { BuiltInProviderType } from "next-auth/providers/index";
import { type LiteralUnion, signIn } from "next-auth/react";
import { ReactNode, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AuthButton } from "../_components/auth-button";

export type AuthProviderType = LiteralUnion<BuiltInProviderType>;

interface SignInProviderProps {
  children: ReactNode;
}

export function SignInProviders({ children }: SignInProviderProps): JSX.Element {
  const [providerSelectedOnStorage, setProviderSelectedOnStorage] = useLocalStorage<AuthProviderType | null>(
    KEY_PROVIDER_SELECTED,
    null
  );

  const [isRedirect, setIsRedirect] = useState<boolean>(false);

  async function onHandleSelectedProvider(providerType: AuthProviderType) {
    setIsRedirect(true);

    await signIn(providerType).then(() => setProviderSelectedOnStorage(providerType));

    setIsRedirect(false);
  }

  return (
    <div className="grid space-y-2">
      <AuthButton
        providerType="google"
        label="Google"
        onClick={() => onHandleSelectedProvider("google")}
        variant="outline"
        icon={<GoogleIcon />}
        isLoading={isRedirect}
        isProviderWasSelectedAtLastLogin={providerSelectedOnStorage === "google"}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-border border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">OU CONTINUAR COM</span>
        </div>
      </div>

      {children}
    </div>
  );
}
