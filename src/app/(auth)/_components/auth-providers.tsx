"use client";

import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import type { BuiltInProviderType } from "next-auth/providers/index";
import { type LiteralUnion, signIn } from "next-auth/react";
import { type Dispatch, Fragment, type SetStateAction } from "react";

interface AuthProvidersProps {
  isDisabled: boolean;
  isRedirecting: boolean;
  setIsRedirecting: Dispatch<SetStateAction<boolean>>;
}

export function AuthProviders({ isDisabled, isRedirecting, setIsRedirecting }: AuthProvidersProps): JSX.Element {
  async function onHandleSelectedProvider(provider: LiteralUnion<BuiltInProviderType>) {
    setIsRedirecting(true);

    await signIn(provider);

    setIsRedirecting(false);
  }

  return (
    <Fragment>
      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">OU CONTINUAR COM</span>
        </div>
      </div>

      <Button
        isLoading={isRedirecting}
        onClick={() => onHandleSelectedProvider("google")}
        variant="outline"
        icon={<GoogleIcon />}
        disabled={isDisabled}
      >
        Google
      </Button>
    </Fragment>
  );
}
