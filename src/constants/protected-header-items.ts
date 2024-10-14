import { SidebarItemsData } from "@/types/sidebar-items-type";
import { SettingsIcon } from "lucide-react";

export const protectedHeaderItems: Array<SidebarItemsData> = [
  {
    title: "Configurações",
    href: "/settings/account",
    icon: SettingsIcon,
    provider: "all",
  },
];
