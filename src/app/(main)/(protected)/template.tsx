import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { Fragment } from "react";

interface ProtectedTemplateProps {
  children: React.ReactNode;
}

export default async function ProtectedTemplate({
  children,
}: Readonly<ProtectedTemplateProps>) {
  const { isAuthenticated } = await getSession();
  if (!isAuthenticated) redirect("/sign-in");

  return <Fragment>{children}</Fragment>;
}
