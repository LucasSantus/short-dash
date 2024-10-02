import { UserDropdownMenu } from "@/app/(protected)/(main)/_components/_layouts/user-dropdown-menu";
import { Bounce } from "@/components/framer-motion/animation/bounce";
import { TRANSITION_DURATION } from "@/constants/globals";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { dropdownSettingItems } from "../../_constants/dropdown-items";
import { headerSettingItems } from "../../_constants/header-items";
import { SheetMenuSettings } from "./sheet-menu";

export function HeaderSettings(): JSX.Element {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* TODO: ADICIONAR LOGO DO SHARK */}

        {headerSettingItems.map(({ href, title, isActive }, index) => {
          const delay = TRANSITION_DURATION + index * 0.3;

          return (
            <Link
              href={href}
              className={cn(
                "transition-colors hover:text-foreground",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              key={title}
            >
              <Bounce
                as="span"
                time={{
                  delay,
                }}
              >
                {title}
              </Bounce>
            </Link>
          );
        })}
      </nav>

      <SheetMenuSettings />

      <div className="flex w-full items-center gap-4 ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto">
          <UserDropdownMenu menuItems={dropdownSettingItems} />
        </div>
      </div>
    </header>
  );
}
