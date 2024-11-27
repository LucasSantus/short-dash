import { SidebarItem } from "@/types/sidebar-item";
import { KeyRoundIcon, PaletteIcon, UserSquareIcon } from "lucide-react";

export const sidebarItems: Array<SidebarItem> = [
  {
    title: "Conta",
    href: "/settings/account",
    icon: UserSquareIcon,
    provider: "all",
  },
  {
    title: "Senha",
    href: "/settings/password",
    icon: KeyRoundIcon,
    provider: "credentials",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
    icon: PaletteIcon,
    provider: "all",
  },
];
