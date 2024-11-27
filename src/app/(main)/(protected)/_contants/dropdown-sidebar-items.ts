import { SidebarItem } from "@/types/sidebar-item";
import { SettingsIcon } from "lucide-react";

export const dropdownSidebarItems: Array<SidebarItem> = [
  {
    title: "Configurações",
    href: "/settings/account",
    icon: SettingsIcon,
    provider: "all",
  },
];
