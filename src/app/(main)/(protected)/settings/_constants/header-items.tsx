import type { MenuGroupItem } from "@/types/menu-group-item";
import { BoxesIcon, HandshakeIcon, LayoutGridIcon, SettingsIcon } from "lucide-react";

interface HeaderSettingItem extends MenuGroupItem {
  isActive?: boolean;
}

export const headerSettingItems: HeaderSettingItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutGridIcon className="size-4" />,
  },
  {
    title: "Produtos",
    href: "/products",
    icon: <BoxesIcon className="size-4" />,
  },
  {
    title: "Afiliados",
    href: "/affiliates",
    icon: <HandshakeIcon className="size-4" />,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: <SettingsIcon className="size-4" />,
    isActive: true,
  },
];
