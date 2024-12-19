import { getUser } from "@/actions/queries/auth/get-user";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "./_components/layout/footer";
import { Sidebar } from "./_components/layout/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<LayoutProps>) {
  const { user } = await getUser();

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
