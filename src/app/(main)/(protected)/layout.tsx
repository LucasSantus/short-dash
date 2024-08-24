import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import ProtectedLayout from "./_layouts";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<LayoutProps>) {
  const { isAuthenticated } = await getSession();
  if (!isAuthenticated) redirect("/sign-in");

  return <ProtectedLayout>{children}</ProtectedLayout>;
}
