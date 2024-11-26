import { SidebarTrigger } from "@/components/ui/sidebar";
import { PropsWithChildren, ReactNode } from "react";

interface ContentLayoutProps extends PropsWithChildren {
  title: string;
  options?: ReactNode;
}

export async function ContentLayout({ title, children, options }: ContentLayoutProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="p-3">
        <SidebarTrigger />
      </div>

      <div className="container mx-auto flex flex-1 flex-col px-5">
        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground text-xl">{title}</span>

          {options}
        </div>

        {children}
      </div>
    </div>
  );
}
