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

      <div className="container flex flex-1 flex-col mx-auto px-5">
        <span className="text-xl text-muted-foreground py-3">{title}</span>

        {children}
      </div>
    </div>
  );
}
