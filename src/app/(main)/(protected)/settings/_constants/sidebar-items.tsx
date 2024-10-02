import type { MenuGroupItem } from "@/types/menu-group-item";
import { KeyRoundIcon, PaletteIcon, SettingsIcon } from "lucide-react";

export const sidebarSettingItems: MenuGroupItem[] = [
  {
    title: "Conta",
    href: "/settings/account",
    icon: <SettingsIcon className="size-4" />,
  },
  {
    title: "Mudar Senha",
    href: "/settings/change-password",
    icon: <KeyRoundIcon className="size-4" />,
  },
  {
    title: "Temas",
    href: "/settings/themes",
    icon: <PaletteIcon className="size-4" />,
  },
];
