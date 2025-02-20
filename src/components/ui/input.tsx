import * as React from "react";

import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading, startComponent, endComponent, ...props }, ref) => {
    const classes =
      "absolute bottom-0 top-0 z-10 flex h-full w-10 items-center justify-center [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            { "pl-12": !!startComponent },
            { "pr-12": !!endComponent }
          )}
          ref={ref}
          {...props}
        />

        {!!startComponent && (
          <div className={cn("left-0 rounded-l-md border border-input bg-background", classes)}>{startComponent}</div>
        )}

        {isLoading ? (
          <div className={cn("right-0", classes)}>
            <LoaderIcon className="size-5 animate-spin" />
          </div>
        ) : (
          !!endComponent && (
            <div className={cn("right-0 rounded-r-md border-input border-y border-r bg-background", classes)}>
              {endComponent}
            </div>
          )
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
