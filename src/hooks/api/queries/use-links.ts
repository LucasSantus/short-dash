/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  getLinks,
  GetLinksSchema,
} from "@/app/(main)/(protected)/links/_actions/get-links";
import { QueryKeys } from "@/constants/query-keys";
import { requestDelay } from "@/utils/delay-graphql-request";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface LinksVariables extends GetLinksSchema {}

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
    queryFn: async () =>
      await requestDelay<LinksResponse>(async () => {
        return await getLinks({
          pagination: {
            page: variables.pagination.page,
            pageSize: variables.pagination.pageSize,
          },
          search: variables.search,
          orderBy: variables.orderBy,
        });
      }),
    ...options,
  });
}
