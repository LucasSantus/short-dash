"use client";

import { Button } from "@/components/ui/button";
import { PROVIDER_KEY_LOCAL_STORAGE } from "@/constants/globals";
import { ComponentProps, Fragment } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AuthProviderType } from "../sign-in/providers";

interface AuthButtonProps extends ComponentProps<typeof Button> {
  providerType: AuthProviderType;
  title: string;
}

export function AuthButton({ providerType, title, ...rest }: AuthButtonProps): JSX.Element {
  const [providerSelectedOnStorage] = useLocalStorage<AuthProviderType>(PROVIDER_KEY_LOCAL_STORAGE, "");

  return (
    <Fragment>
      <Button variant="outline" {...rest}>
        {title}
      </Button>

      {providerSelectedOnStorage === providerType && (
        <span className="text-xs text-muted-foreground">Iniciou sessão com o {title} da última vez</span>
      )}
    </Fragment>
  );
}
