import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { Fragment, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({
  children,
}: Readonly<AuthLayoutProps>) {
  const { isAuthenticated } = await getSession();
  if (isAuthenticated) redirect("/");

  return <Fragment>{children}</Fragment>;
}
