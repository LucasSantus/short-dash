import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="absolute -right-[16px] top-[12px] z-20 hidden lg:block">
      <Button
        onClick={() => setIsOpen?.()}
        className="size-8 rounded-md"
        variant="outline"
        size="icon"
        icon={
          <ChevronLeft
            className={cn(
              "size-4 transition-transform duration-500 ease-in-out",
              !isOpen ? "rotate-180" : "rotate-0",
            )}
          />
        }
      />
    </div>
  );
}
