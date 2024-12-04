"use client";

import { KEY_PROVIDER_SELECTED } from "@/constants/globals";
import { RiGoogleFill } from "@remixicon/react";
import { Loader2Icon } from "lucide-react";
import type { BuiltInProviderType } from "next-auth/providers/index";
import { type LiteralUnion, signIn } from "next-auth/react";
import { ReactNode, useTransition } from "react";
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

  const [isPendingRedirect, startRedirectTransition] = useTransition();

  async function onHandleSelectedProvider(providerType: AuthProviderType) {
    startRedirectTransition(() => signIn(providerType).then(() => setProviderSelectedOnStorage(providerType)));
  }

  return (
    <div className="grid space-y-2 py-4">
      <AuthButton
        providerType="google"
        label="Google"
        onClick={() => onHandleSelectedProvider("google")}
        disabled={isPendingRedirect}
        isProviderWasSelectedAtLastLogin={providerSelectedOnStorage === "google"}
        className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 dark:bg-transparent dark:text-white dark:hover:bg-gray-500/10"
        icon={
          <span className="pointer-events-none me-2 flex-1">
            {isPendingRedirect ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <RiGoogleFill className="size-5 opacity-60" aria-hidden="true" />
            )}
          </span>
        }
      >
        Login with Google
      </AuthButton>

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
