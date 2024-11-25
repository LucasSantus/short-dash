"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarContent as SidebarContentShacn,
  SidebarGroupLabel as SidebarGroupLabelShacn,
  SidebarGroup as SidebarGroupShacn,
  SidebarMenuAction as SidebarMenuActionShacn,
  SidebarMenuButton as SidebarMenuButtonShacn,
  SidebarMenuItem as SidebarMenuItemShacn,
  SidebarMenu as SidebarMenuShacn,
  SidebarMenuSubButton as SidebarMenuSubButtonShacn,
  SidebarMenuSubItem as SidebarMenuSubItemShacn,
  SidebarMenuSub as SidebarMenuSubShacn,
  Sidebar as SidebarShadcn,
} from "@/components/ui/sidebar";
import { ChevronRight, HistoryIcon, LayoutDashboardIcon, LinkIcon, LucideIcon } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";
import { SidebarSecondaryLinks } from "./sidebar-secondary-links";

export interface SidebarSubMenuOption {
  label: string;
  path: string;
}

export type SidebarMenuOption =
  | {
      type: "default";
      id: number;
      label: string;
      path: string;
      icon: LucideIcon;
    }
  | {
      type: "collapse";
      id: number;
      label: string;
      path: string;
      icon: LucideIcon;
      subItems: Array<SidebarSubMenuOption>;
    };

export interface SidebarMenuGroup {
  id: number;
  label?: string;
  options: SidebarMenuOption[];
}

export interface SidebarSecondary {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarItems {
  routes: Array<SidebarMenuGroup>;
  secondary: Array<SidebarSecondary>;
}

export const sidebarItems: SidebarItems = {
  routes: [
    {
      id: 0,
      label: "",
      options: [
        {
          id: 0,
          type: "default",
          label: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboardIcon,
        },
      ],
    },
    {
      id: 1,
      label: "Gerenciamento",
      options: [
        {
          id: 0,
          type: "default",
          label: "Links",
          path: "/links",
          icon: LinkIcon,
        },
        {
          id: 1,
          type: "default",
          path: "/events",
          label: "Eventos",
          icon: HistoryIcon,
        },
      ],
    },
  ],

  secondary: [
    // {
    //   label: "Support",
    //   path: "#",
    //   icon: LifeBuoy,
    // },
    // {
    //   label: "Feedback",
    //   path: "#",
    //   icon: Send,
    // },
  ],
};

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <SidebarShadcn variant="inset">
      <SidebarHeader />
      <SidebarContentShacn>
        <SidebarGroupShacn>
          {sidebarItems.routes.map(({ id, label, options }) => (
            <Fragment key={id}>
              {label && <SidebarGroupLabelShacn>{label}</SidebarGroupLabelShacn>}

              <SidebarMenuShacn>
                {options.map((option) => {
                  if (option.type === "default")
                    return (
                      <SidebarMenuItemShacn key={option.id}>
                        <SidebarMenuButtonShacn asChild isActive={pathname.includes(option.path)}>
                          <Link href={option.path}>
                            <option.icon className="size-4" />
                            <span>{option.label}</span>
                          </Link>
                        </SidebarMenuButtonShacn>
                      </SidebarMenuItemShacn>
                    );

                  if (option.type === "collapse") {
                    const isCollapseActive =
                      pathname.includes(option.path) || option.subItems.every(({ path }) => pathname.includes(path));

                    return (
                      <Collapsible key={option.label} asChild>
                        <SidebarMenuItemShacn>
                          <SidebarMenuButtonShacn asChild tooltip={option.label} isActive={isCollapseActive}>
                            <a href={option.path}>
                              <option.icon />
                              <span>{option.label}</span>
                            </a>
                          </SidebarMenuButtonShacn>

                          <CollapsibleTrigger asChild>
                            <SidebarMenuActionShacn className="data-[state=open]:rotate-90">
                              <ChevronRight />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuActionShacn>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSubShacn>
                              {option.subItems?.map((subItem) => (
                                <SidebarMenuSubItemShacn key={subItem.path}>
                                  <SidebarMenuSubButtonShacn asChild isActive={pathname.includes(subItem.path)}>
                                    <a href={subItem.path}>
                                      <span>{subItem.label}</span>
                                    </a>
                                  </SidebarMenuSubButtonShacn>
                                </SidebarMenuSubItemShacn>
                              ))}
                            </SidebarMenuSubShacn>
                          </CollapsibleContent>
                        </SidebarMenuItemShacn>
                      </Collapsible>
                    );
                  }

                  return null;
                })}
              </SidebarMenuShacn>
            </Fragment>
          ))}
        </SidebarGroupShacn>

        <SidebarSecondaryLinks links={sidebarItems.secondary} />
      </SidebarContentShacn>

      <SidebarFooter user={user} />
    </SidebarShadcn>
  );
}
