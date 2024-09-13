"use client";

import { type PropsWithChildren, useEffect, useState } from "react";

type RenderOnClientProps = PropsWithChildren;

export function RenderOnClient({ children }: RenderOnClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : null;
}
