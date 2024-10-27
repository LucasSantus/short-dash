import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { redirect } from "next/navigation";
import { Footer } from "./_components/layout/footer";
import { Sidebar } from "./_components/layout/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<LayoutProps>) {
  const { isAuthenticated, user } = await getServerAuthSession();

  if (!isAuthenticated) redirect("/sign-in");

  return (
    <SidebarProvider>
      <Sidebar user={user} />

      <SidebarInset>
        {children}

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
