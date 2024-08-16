import { Fragment, ReactNode } from "react";

interface AuthTemplateProps {
  children: ReactNode;
}

export default async function AuthTemplate({ children }: AuthTemplateProps) {
  // const session = await getSession();
  // if (session) redirect("/");

  return (
    <Fragment>
      <div className="flex h-screen flex-col items-center justify-start bg-background px-2 py-3 text-foreground sm:justify-center">
        <div className="flex w-full max-w-md rounded-lg border border-border bg-card p-4 shadow-md lg:p-8">
          <div className="flex w-full flex-col gap-2">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
