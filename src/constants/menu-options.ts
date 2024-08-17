import { LayoutDashboardIcon, LinkIcon } from "lucide-react";

type MenuOption = {
  href: string;
  label: string;
  icon: any;
};

type Group = {
  label?: string;
  options: MenuOption[];
};

export const menuOptions: Group[] = [
  {
    options: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    label: "Gerenciamento",
    options: [
      {
        href: "/links",
        label: "Links",
        icon: LinkIcon,
      },
    ],
  },
];
