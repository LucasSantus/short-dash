"use client";

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
import { signOut } from "next-auth/react";
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
    startLogoutTransition(() => signOut());
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
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name ?? "Minha Conta"}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
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
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image ?? ""} />
                    <AvatarFallback className="rounded-lg">
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name ?? "Minha Conta"}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {protectedHeaderItems.map(({ href, icon: Icon, title }) => (
                  <DropdownMenuItem className="space-x-2" onClick={() => router.push(href)} key={href}>
                    <Icon className="size-4" />
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
                icon={isPendingLogout ? <LoaderIcon className="size-4" /> : <LogOutIcon className="size-4" />}
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
