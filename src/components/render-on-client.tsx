"use client";

import { Fragment, PropsWithChildren, useEffect, useState } from "react";

type RenderOnClientProps = PropsWithChildren;

export function RenderOnClient({ children }: RenderOnClientProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <Fragment>{isClient ? children : null}</Fragment>;
}
