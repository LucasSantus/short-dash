"use client";

import { useQuery } from "@tanstack/react-query";
import { getLinks } from "./_actions/get-links";

export function ListLinks(): JSX.Element {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await getLinks();

      return response?.data;
    },
  });

  if (isLoading) return <>Carregando...</>;

  if (isError && !data) return <>Deu ruim</>;

  return <div>{data?.map((item) => <>{item.name}</>)}</div>;
}
