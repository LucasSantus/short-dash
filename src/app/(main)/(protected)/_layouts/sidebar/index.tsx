"use client";

import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { Menu } from "../menu";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !sidebar.isOpen ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            !sidebar.isOpen ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="mr-1 h-6 w-6" />
            <h1
              className={cn(
                "whitespace-nowrap text-lg font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                !sidebar.isOpen
                  ? "hidden -translate-x-96 opacity-0"
                  : "translate-x-0 opacity-100",
              )}
            >
              Credentials
            </h1>
          </Link>
        </Button>

        <Menu isOpen={sidebar.isOpen} />
      </div>
    </aside>
  );
}
