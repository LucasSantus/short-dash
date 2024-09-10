import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { redirect } from "next/navigation";
import ProtectedLayout from "./_layouts";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<LayoutProps>) {
  const { isAuthenticated } = await getServerAuthSession();
  if (!isAuthenticated) redirect("/sign-in");

  return <ProtectedLayout>{children}</ProtectedLayout>;
}
