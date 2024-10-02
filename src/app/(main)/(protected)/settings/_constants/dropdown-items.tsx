import type { MenuGroupItem } from "@/types/menu-group-item";
import { LayoutGridIcon, SettingsIcon } from "lucide-react";

export const dropdownSettingItems: MenuGroupItem[] = [
  {
    title: "Voltar para Dashboard",
    href: "/dashboard",
    icon: <LayoutGridIcon className="size-4" />,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: <SettingsIcon className="size-4" />,
  },
];
