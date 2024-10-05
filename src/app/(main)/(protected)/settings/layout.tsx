import { SettingsSidebar } from "./_components/settings-sidebar";
import { sidebarItems } from "./_constants/sidebar-items";

interface GlobalSettingsLayoutProps {
  children: React.ReactNode;
}

export default async function GlobalSettingsLayout({ children }: GlobalSettingsLayoutProps) {
  return (
    <div className="space-y-4">
      <div className="container space-y-4">
        {/* <PageDescription title="Configurações" description="Gerencie as configurações da sua conta." /> */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebar items={sidebarItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
