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
import { AuthSession } from "@/lib/get-session";
import { LogOutIcon, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { SheetMenu } from "./sheet-menu";

interface NavbarProps {
  title: string;
  session: AuthSession;
}

export function Navbar({
  title,
  session: { isAuthenticated, user },
}: NavbarProps) {
  function onHandleLogout() {
    signOut();
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-background">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>

        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  className="cursor-pointer select-none"
                  src={user.image ?? ""}
                />
                <AvatarFallback className="cursor-pointer">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel className="truncate">
                {user.name ?? "Minha Conta"}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {/* {headerItems.map(({ href, icon, title }) => (
                  <DropdownMenuItem
                    key={href}
                    onClick={() => router.push(href)}
                    className="space-x-2"
                  >
                    {icon}
                    <span>{title}</span>
                  </DropdownMenuItem>
                ))} */}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onHandleLogout}
                className="space-x-2"
                // disabled={isRedirecting}
              >
                <LogOutIcon className="size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
