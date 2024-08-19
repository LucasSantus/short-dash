"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LockIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { CategoryBlockStatusDialog } from "./category-block-dialog";

interface CategoryBlockStatusActionProps {
  categoryId: string;
}

export function CategoryBlockStatusAction({ categoryId }: CategoryBlockStatusActionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <DropdownMenuItem
        onSelect={event => {
          event.preventDefault();

          setIsOpen(true);
        }}
        className="flex gap-2 items-center"
      >
        <LockIcon className="size-4" />
        Bloquear
      </DropdownMenuItem>

      <CategoryBlockStatusDialog categoryId={categoryId} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Fragment>
  );
}
