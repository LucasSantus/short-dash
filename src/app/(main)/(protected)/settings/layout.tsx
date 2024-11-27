import { getServerAuthSession } from "@/utils/get-server-auth-session";
import { permanentRedirect } from "next/navigation";
import { ReactNode } from "react";
import { SettingsSidebar } from "./_components/layout/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { isAuthenticated, account } = await getServerAuthSession();

  if (!isAuthenticated) permanentRedirect("/sign-in");

  return (
    <div className="container mx-auto flex flex-1 flex-col p-10">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0">
        <aside className="lg:w-1/6">
          <SettingsSidebar account={account} />
        </aside>

        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
