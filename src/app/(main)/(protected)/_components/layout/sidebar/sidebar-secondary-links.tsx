"use client";

import {
  SidebarGroupContent as SidebarGroupContentShacn,
  SidebarGroup as SidebarGroupShacn,
  SidebarMenuButton as SidebarMenuButtonShacn,
  SidebarMenuItem as SidebarMenuItemShacn,
  SidebarMenu as SidebarMenuShacn,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SidebarSecondary } from ".";

interface SidebarSecondaryLinksProps {
  links: Array<SidebarSecondary>;
}

export function SidebarSecondaryLinks({ links }: SidebarSecondaryLinksProps): JSX.Element | null {
  if (links.length > 0)
    return (
      <SidebarGroupShacn className="mt-auto">
        <SidebarGroupContentShacn>
          <SidebarMenuShacn>
            {links.map(({ label, icon: Icon, path }) => (
              <SidebarMenuItemShacn key={label}>
                <SidebarMenuButtonShacn asChild size="sm">
                  <Link href={path}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButtonShacn>
              </SidebarMenuItemShacn>
            ))}
          </SidebarMenuShacn>
        </SidebarGroupContentShacn>
      </SidebarGroupShacn>
    );

  return null;
}
