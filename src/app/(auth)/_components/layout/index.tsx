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
        <div className="flex items-center justify-center gap-2">
          <Icon className="size-6" />
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        </div>

        <span className="text-sm text-muted-foreground">{description}</span>
      </div>

      {children}
    </Fragment>
  );
}
