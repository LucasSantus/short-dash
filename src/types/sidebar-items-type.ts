import { LucideIcon } from "lucide-react";

export interface SidebarItemsData {
  title: string;
  href: string;
  icon: LucideIcon;
  provider: "all" | "credentials";
}
