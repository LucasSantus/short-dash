import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { menuOptions } from "@/constants/menu-options";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SheetMenu() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          {menuOptions.map(({ options }) => 
            options.map(({ label, href }) => 
              <Link
                key={label}
                href={href}
                className={
                  cn("transition-colors", pathname.includes(href) ? "text-foreground" : "text-muted-foreground hover:text-foreground")
                }
              >
                {label}
              </Link>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
