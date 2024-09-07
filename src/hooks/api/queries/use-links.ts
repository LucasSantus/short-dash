/* eslint-disable @typescript-eslint/no-empty-object-type */


import { QueryKeys } from "@/constants/query-keys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface LinksVariables {}

export interface LinkResponse {
  id: string;
  title: string;
  code: string;
  description: string | null;
  originalUrl: string;
  shortUrl: string;
  numberOfVisitors: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  expiresAt: Date | string | null;
  ownerId: string | null;
}

export interface LinksResponse {
  links: LinkResponse[];
  totalLinks: number;
  currentPage: number;
  totalPages: number;
}

export function useLinksQuery(
  variables: LinksVariables,
  options?: Omit<UseQueryOptions<LinksResponse>, "queryKey" | "queryFn">,
) {
  return useQuery<LinksResponse>({
    queryKey: [QueryKeys.Links, variables],
    queryFn: async () => {
      return [] as unknown as LinksResponse
    },
    ...options,
  });
}
