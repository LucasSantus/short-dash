import {
  SidebarHeader as SidebarHeaderShadcn,
  SidebarMenuButton as SidebarMenuButtonShadcn,
  SidebarMenuItem as SidebarMenuItemShadcn,
  SidebarMenu as SidebarMenuShadcn,
} from "@/components/ui/sidebar";
import { LinkIcon } from "lucide-react";

export function SidebarHeader(): JSX.Element {
  return (
    <SidebarHeaderShadcn>
      <SidebarMenuShadcn>
        <SidebarMenuItemShadcn>
          <SidebarMenuButtonShadcn size="lg">
            <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <LinkIcon className="size-5" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Short Dash</span>
              <span>v0.0.1</span>
            </div>
          </SidebarMenuButtonShadcn>
        </SidebarMenuItemShadcn>
      </SidebarMenuShadcn>
    </SidebarHeaderShadcn>
  );
}
