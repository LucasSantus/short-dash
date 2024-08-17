import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { Fragment } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: Readonly<ProtectedLayoutProps>) {
  const { isAuthenticated } = await getSession();
  if (!isAuthenticated) redirect("/sign-in");

  return <Fragment>{children}</Fragment>;
}
