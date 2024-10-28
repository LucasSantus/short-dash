import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarItemsData } from "@/types/sidebar-items-type";
import Link from "next/link";

interface SettingsSidebarProps {
  items: Array<SidebarItemsData>;
}

export function SettingsSidebar({ items }: SettingsSidebarProps) {
  // const pathname = usePathname();

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map(({ title, href, icon: Icon }, index) => {
        return (
          <Link
            key={index}
            href={href}
            className={buttonVariants({
              variant: "ghost",
              className: cn(
                "flex justify-start gap-2 border hover:bg-muted focus:opacity-50"
                // pathname === href && "bg-muted/70 hover:bg-muted"
              ),
            })}
          >
            <Icon className="size-4" />

            {title}
          </Link>
        );
      })}
    </nav>
  );
}
