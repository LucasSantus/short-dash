import { Fragment } from "react";
import { AuthLink } from "./auth-link";

interface AuthFooterProps {
  text: string;
  link: {
    title: string;
    path: string;
  };
}

export function AuthFooter({ text, link }: AuthFooterProps): JSX.Element {
  return (
    <Fragment>
      <div className="mt-1 flex items-center justify-center gap-1">
        <span className="text-muted-foreground text-sm">{text}</span>

        <AuthLink title={link.title} href={link.path} />
      </div>
    </Fragment>
  );
}
