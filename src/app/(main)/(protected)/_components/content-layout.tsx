import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
}

export async function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="p-3">
        <SidebarTrigger />
      </div>

      <div className="container mx-auto flex flex-1 flex-col px-5">
        <span className="py-3 text-muted-foreground text-xl">{title}</span>

        {children}
      </div>
    </div>
  );
}
