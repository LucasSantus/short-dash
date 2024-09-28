import { LinkStatus } from "@prisma/client";
import { CheckIcon, LucideIcon, XIcon } from "lucide-react";

export const linkStatusDescription: Record<
  LinkStatus,
  {
    label: string;
    icon: LucideIcon;
    color: {
      textColor: string;
    };
  }
> = {
  Active: {
    label: "Ativo",
    icon: CheckIcon,
    color: {
      textColor: "text-green-500",
    },
  },
  Inactive: {
    label: "Inativo",
    icon: XIcon,
    color: {
      textColor: "text-gray-400",
    },
  },
};
