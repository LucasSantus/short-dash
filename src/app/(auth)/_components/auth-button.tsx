"use client";

import { RenderOnClient } from "@/components/render-on-client";
import { Button } from "@/components/ui/button";
import { ComponentProps, Fragment } from "react";
import { AuthProviderType } from "../sign-in/providers";

interface AuthButtonProps extends ComponentProps<typeof Button> {
  providerType: AuthProviderType;
  label: string;
  isProviderWasSelectedAtLastLogin: boolean;
}

export function AuthButton({
  providerType,
  label,
  isProviderWasSelectedAtLastLogin,
  ...rest
}: AuthButtonProps): JSX.Element {
  return (
    <Fragment>
      <Button variant="outline" {...rest}>
        {label}
      </Button>

      <RenderOnClient>
        {isProviderWasSelectedAtLastLogin && (
          <span className="text-xs text-muted-foreground">Iniciou sessão com o {label} da última vez</span>
        )}
      </RenderOnClient>
    </Fragment>
  );
}
