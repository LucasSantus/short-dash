import type { LucideIcon } from "lucide-react";
import { Fragment, type PropsWithChildren } from "react";

interface AuthLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function AuthLayout({ title, description, icon: Icon, children }: AuthLayoutProps): JSX.Element {
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-start gap-2 text-center">
        <div className="flex items-start gap-2">
          <Icon className="size-6" />
          <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
        </div>

        <span className="text-justify text-muted-foreground text-sm">{description}</span>
      </div>

      {children}
    </Fragment>
  );
}
