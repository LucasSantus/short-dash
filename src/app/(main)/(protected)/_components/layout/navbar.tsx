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
import { menuOptions } from "@/constants/menu-options";
import { cn } from "@/lib/utils";
import type { ServerAuthSession } from "@/utils/get-server-auth-session";
import { LoaderIcon, LogOutIcon, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { SheetMenu } from "./sheet-menu";

interface NavbarProps {
  session: ServerAuthSession;
}

export function Navbar({ session: { isAuthenticated, user } }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPendingLogout, startLogoutTransition] = useTransition();

  function onHandleLogout() {
    startLogoutTransition(() => signOut());
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-background">
      <div className="mx-4 flex h-14 items-center justify-between sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {menuOptions.map(({ options }) =>
              options.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "transition-colors",
                    pathname.includes(href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              ))
            )}
          </nav>
          <SheetMenu />
        </div>

        {isAuthenticated && (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage className="cursor-pointer select-none" src={user.image ?? ""} />
                <AvatarFallback className="cursor-pointer">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end">
              <DropdownMenuLabel>
                <p className="truncate">{user.name ?? "Minha Conta"}</p>
                <p className="truncate text-muted-foreground">{user.email}</p>
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
                onClick={(event) => {
                  event.preventDefault();

                  onHandleLogout();
                }}
                className="space-x-2"
                icon={isPendingLogout ? <LoaderIcon className="size-4" /> : <LogOutIcon className="size-4" />}
                disabled={isPendingLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
