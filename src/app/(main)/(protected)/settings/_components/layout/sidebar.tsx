"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../../_constants/sidebar-items";

interface SettingsSidebarProps {}

export function SettingsSidebar({}: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {sidebarItems.map(({ title, href, icon: Icon, provider }) => {
        return (
          <Button
            key={title + href}
            variant="ghost"
            className={cn(
              "flex justify-start gap-2 border hover:bg-muted focus:opacity-50",
              pathname.includes(href) && "bg-muted/70 hover:bg-muted"
            )}
            icon={<Icon />}
          >
            <Link href={href}>{title}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
