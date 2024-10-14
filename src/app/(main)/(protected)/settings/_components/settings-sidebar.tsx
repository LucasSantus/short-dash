"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarItemsData } from "@/types/sidebar-items-type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsSidebarProps {
  items: Array<SidebarItemsData>;
}

export function SettingsSidebar({ items }: SettingsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1")}>
      <div>
        {items.map(({ title, href, icon: Icon }, index) => {
          return (
            <div key={index}>
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex justify-start gap-2 border hover:bg-muted focus:opacity-50",
                  pathname === href && "bg-muted/70 hover:bg-muted"
                )}
              >
                <Icon className="size-4" />

                {title}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
