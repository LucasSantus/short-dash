"use client";

import { Button } from "@/components/ui/button";
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Account } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "../../_constants/sidebar-items";

interface SettingsSidebarProps {
  account: Account;
}

export function SettingsSidebar({ account }: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
      {sidebarItems.map(({ title, href, icon: Icon, provider }) => {
        if (provider === "all" || provider === account.provider)
          return (
            <Link href={href} key={title + href}>
              <Button
                variant="ghost"
                className={cn(
                  sidebarMenuButtonVariants({
                    variant: "outline",
                  }),
                  pathname.includes(href) && "bg-muted/70 hover:bg-muted"
                )}
                icon={<Icon />}
              >
                {title}
              </Button>
            </Link>
          );
      })}
    </nav>
  );
}
