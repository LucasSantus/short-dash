/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  getLinks,
  GetLinksSchema,
} from "@/app/(main)/(protected)/links/_actions/get-links";
import { requestDelay } from "@/utils/delay-graphql-request";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface LinksVariables extends GetLinksSchema {}

export interface LinkResponse {
  id: string;
  name: string;
  path: string;
  code: string;
  numberOfVisitors: number;
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
    queryKey: ["links", variables],
    queryFn: async () =>
      await requestDelay<LinksResponse>(async () => {
        const response = await getLinks({
          pagination: {
            page: variables.pagination.page,
            pageSize: variables.pagination.pageSize,
          },
          search: variables.search,
          orderBy: variables.orderBy,
        });

        return response?.data as LinksResponse
      }),
    ...options,
  });
}
