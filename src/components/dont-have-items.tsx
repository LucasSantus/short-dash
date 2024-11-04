"use client";

import type { PropsWithChildren } from "react";

interface DontHaveItemsProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function DontHaveItems({ title, description, children }: DontHaveItemsProps): JSX.Element {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-bold text-2xl tracking-tight">{title}</span>
        <span className="text-muted-foreground text-sm">{description}</span>
        <div>{children}</div>
      </div>
    </div>
  );
}
