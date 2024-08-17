"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export function List(): JSX.Element {
  const session = useSession();

  if (!session || !session.data || !session.data.user) return <>teste</>;

  return (
    <div>
      {/* <>{session?.data?.user}</> */}
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Deslogar
      </Button>
    </div>
  );
}
