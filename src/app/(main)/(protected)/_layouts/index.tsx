"use client";

import { useSidebarToggle } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  if (!sidebar) return null;

  return (
    <Fragment>
      <Sidebar />

      <main
        className={cn(
          "flex min-h-[calc(100vh_-_56px)] flex-col bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          !sidebar.isOpen ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        {children}
      </main>

      <footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in-out",
          !sidebar.isOpen ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Footer />
      </footer>
    </Fragment>
  );
}
