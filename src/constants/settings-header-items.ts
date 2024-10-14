import { SidebarItemsData } from "@/types/sidebar-items-type";
import { LayoutDashboardIcon, SettingsIcon } from "lucide-react";

export const settingsHeaderItems: Array<SidebarItemsData> = [
  {
    title: "Voltar para Dashboard",
    href: "/",
    icon: LayoutDashboardIcon,
    provider: "all",
  },
  {
    title: "Configurações",
    href: "/settings/account",
    icon: SettingsIcon,
    provider: "all",
  },
];
