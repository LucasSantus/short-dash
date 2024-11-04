import {
  SidebarHeader as SidebarHeaderShadcn,
  SidebarMenuButton as SidebarMenuButtonShadcn,
  SidebarMenuItem as SidebarMenuItemShadcn,
  SidebarMenu as SidebarMenuShadcn,
} from "@/components/ui/sidebar";
import { application } from "@/config/metadata";
import { LinkIcon } from "lucide-react";

export function SidebarHeader(): JSX.Element {
  return (
    <SidebarHeaderShadcn>
      <SidebarMenuShadcn>
        <SidebarMenuItemShadcn>
          <SidebarMenuButtonShadcn size="lg">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LinkIcon className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">{application.name}</span>
              <span>{application.version}</span>
            </div>
          </SidebarMenuButtonShadcn>
        </SidebarMenuItemShadcn>
      </SidebarMenuShadcn>
    </SidebarHeaderShadcn>
  );
}
