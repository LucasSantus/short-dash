"use client";

import { trpc } from "@/trpc/client";

export function CLientLinks(): JSX.Element {
  const { data, isLoading, isError, error } = trpc.hello.useQuery({
    text: "dsadasd",
  });

  if (isLoading) return <>CAREGANDO...</>;

  if (isError) {
    if (error instanceof Error) {
      return <>{error.message}</>;
    }
  }

  return <>{data?.greeting}</>;
}
