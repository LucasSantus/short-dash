import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) redirect("/sign-in");

  return <Fragment>{children}</Fragment>;
}
