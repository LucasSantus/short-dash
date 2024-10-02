import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { headerSettingItems } from "../../_constants/header-items";

export function SheetMenuSettings(): JSX.Element {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">toggle sheet menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          {/* TODO: ADICIONAR LOGO DO SHARK */}

          {/* <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
            <Package2 className="size-6" />
            <span className="sr-only">SharkPlace</span>
          </Link> */}

          {headerSettingItems.map(({ href, title, isActive }) => (
            <Link
              href={href}
              className={cn(
                "transition-colors hover:text-foreground",
                isActive ? "hover:text-foreground" : "text-muted-foreground"
              )}
              key={title}
            >
              {title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
