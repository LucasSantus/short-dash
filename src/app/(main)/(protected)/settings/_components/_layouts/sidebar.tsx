"use client";

import { Bounce } from "@/components/framer-motion/animation/bounce";
import { Presence } from "@/components/framer-motion/presence";
import { buttonVariants } from "@/components/ui/button";
import { TRANSITION_DURATION } from "@/constants/globals";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarSettingItems } from "../../_constants/sidebar-items";

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 flex-col md:flex-row lg:flex-col lg:space-x-0 lg:space-y-1">
      <Presence>
        {sidebarSettingItems.map(({ title, href, icon }, index) => {
          const delay = TRANSITION_DURATION + index * 0.3;

          return (
            <Bounce key={href} time={{ delay }}>
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex justify-start gap-2 border hover:bg-muted focus:opacity-50",
                  pathname === href && "bg-muted/70 hover:bg-muted"
                )}
              >
                {icon}
                {title}
              </Link>
            </Bounce>
          );
        })}
      </Presence>
    </nav>
  );
}
