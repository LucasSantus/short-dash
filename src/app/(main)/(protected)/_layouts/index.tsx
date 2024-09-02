"use client";

import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";
import { Footer } from "./footer";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <Fragment>
      <main
        className={cn(
          "flex min-h-[calc(100vh_-_56px)] flex-col bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
        )}
      >
        {children}
      </main>

      <Footer />
    </Fragment>
  );
}
