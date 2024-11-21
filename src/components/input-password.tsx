"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";
import { Input, type InputProps } from "./ui/input";

export type InputPasswordProps = InputProps;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(({ disabled, ...rest }, ref) => {
  const [isShow, setIsShow] = React.useState<boolean>(true);

  function handleChangeType() {
    setIsShow((currentValue) => !currentValue);
  }

  return (
    <div className="relative">
      <Input
        ref={ref}
        {...rest}
        disabled={disabled}
        type={isShow ? "text" : "password"}
        endComponent={
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={handleChangeType}
            disabled={disabled}
            aria-disabled={disabled}
            aria-label="show and hide password"
            aria-labelledby="show and hide password"
            className="rounded-tl-none rounded-bl-none border border-y-1 border-l-0"
          >
            {isShow ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        }
      />
    </div>
  );
});
InputPassword.displayName = "InputPassword";

export { InputPassword };
