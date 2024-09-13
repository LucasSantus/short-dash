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
        <span className="text-2xl font-bold tracking-tight">{title}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
        <div>{children}</div>
      </div>
    </div>
  );
}
