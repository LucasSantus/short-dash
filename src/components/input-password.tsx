"use client";

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Input, type InputProps } from "./ui/input";

export interface InputPasswordProps extends InputProps {
  withStrength?: boolean;
}

export const checkStrength = (password: string) => {
  const requirements = [
    { regex: /.{8,}/, text: "Pelo menos 8 caracteres" },
    { regex: /[0-9]/, text: "Pelo menos 1 número" },
    { regex: /[a-z]/, text: "Pelo menos 1 letra minúscula" },
    { regex: /[A-Z]/, text: "Pelo menos 1 letra maiúscula" },
  ];

  return {
    strength: requirements.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    })),
    score: requirements.filter((req) => !req.regex.test(password)).map((req) => req.text),
  };
};

const getStrengthColor = (score: number) => {
  if (score === 0) return "bg-border";
  if (score <= 1) return "bg-red-500";
  if (score <= 2) return "bg-orange-500";
  if (score === 3) return "bg-amber-500";
  return "bg-emerald-500";
};

const getStrengthText = (score: number) => {
  if (score === 0) return "Digite uma senha";
  if (score <= 2) return "Senha fraca";
  if (score === 3) return "Senha média";

  return "Senha forte";
};

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ withStrength, disabled, value, ...rest }, ref) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const { strength } = checkStrength(value as string);

    const strengthScore = React.useMemo(() => {
      return strength.filter((req) => req.met).length;
    }, [strength]);

    return (
      <div>
        <div className="space-y-2">
          <div className="relative">
            <Input
              ref={ref}
              className="pe-9"
              placeholder="Password"
              type={isVisible ? "text" : "password"}
              aria-invalid={strengthScore < 4}
              aria-describedby="password-strength"
              endComponent={
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOffIcon strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <EyeIcon strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              }
              {...rest}
            />
          </div>
        </div>

        {withStrength && (
          <React.Fragment>
            <div
              className="mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-valuenow={strengthScore}
              aria-valuemin={0}
              aria-valuemax={4}
              aria-label="Password strength"
            >
              <div
                className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              />
            </div>

            <p id="password-strength" className="mb-2 font-medium text-foreground text-sm">
              {getStrengthText(strengthScore)}. Deve conter:
            </p>

            <ul className="space-y-1.5" aria-label="Password requirements">
              {strength.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  {req.met ? (
                    <CheckIcon size={16} className="text-emerald-500" aria-hidden="true" />
                  ) : (
                    <XIcon size={16} className="text-muted-foreground/80" aria-hidden="true" />
                  )}
                  <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                    {req.text}
                    <span className="sr-only">{req.met ? " - Requirement met" : " - Requirement not met"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
