"use client";

import { logOut } from "@/actions/auth/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter as SidebarFooterShacn,
  SidebarMenuButton as SidebarMenuButtonShacn,
  SidebarMenuItem as SidebarMenuItemShacn,
  SidebarMenu as SidebarMenuShacn,
} from "@/components/ui/sidebar";
import { protectedHeaderItems } from "@/constants/protected-header-items";
import { ChevronsUpDown, LoaderIcon, LogOutIcon, UserIcon } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "nextjs-toploader/app";
import { useState, useTransition } from "react";

interface SidebarFooterProps {
  user: User;
}

export function SidebarFooter({ user }: SidebarFooterProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPendingLogout, startLogoutTransition] = useTransition();
  const router = useRouter();

  function onHandleLogout() {
    startLogoutTransition(() => logOut());
  }

  return (
    <SidebarFooterShacn>
      <SidebarMenuShacn>
        <SidebarMenuItemShacn>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButtonShacn
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="size-8 rounded-md">
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback className="rounded-md">
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name ?? "Minha Conta"}</span>
                  <span className="truncate text-muted-foreground text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButtonShacn>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-md">
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback className="rounded-md">
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name ?? "Minha Conta"}</span>
                    <span className="truncate text-muted-foreground text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {protectedHeaderItems.map(({ href, icon: Icon, title }) => (
                  <DropdownMenuItem className="space-x-2" onClick={() => router.push(href)} key={href}>
                    <Icon />
                    <span>{title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(event) => {
                  event.preventDefault();

                  onHandleLogout();
                }}
                className="space-x-2"
                icon={isPendingLogout ? <LoaderIcon /> : <LogOutIcon />}
                disabled={isPendingLogout}
              >
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItemShacn>
      </SidebarMenuShacn>
    </SidebarFooterShacn>
  );
}
