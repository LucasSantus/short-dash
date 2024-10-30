import { createTRPCRouter } from "@/server/api/trpc";
import { allLinkListOptionsQuery } from "./all-link-options";
import { clickedLinkGraphOverviewQuery } from "./clicked-link-graph-overview";
import { createLinkMutation } from "./create";
import { deleteMultipleLinksMutationRoute } from "./delete";
import { linksQuery } from "./list";
import { mostClickedLinksQuery } from "./most-clickeds";
import { overviewQuery } from "./overview";
import { redirectUrlByCodeMutation as refetchingMutation } from "./refetching";
import { updateLinkMutation } from "./update";
import { updateStatusMultipleLinkMutationRoute } from "./update-status";

export const linkRoute = createTRPCRouter({
  // QUERIES
  list: linksQuery,
  allLinkListOptions: allLinkListOptionsQuery,
  mostClickeds: mostClickedLinksQuery,
  overview: overviewQuery,
  clickedLinkGraphOverview: clickedLinkGraphOverviewQuery,

  // MUTATIONS
  create: createLinkMutation,
  update: updateLinkMutation,
  deleteMultiple: deleteMultipleLinksMutationRoute,
  updateMultipleStatus: updateStatusMultipleLinkMutationRoute,
  refetching: refetchingMutation,
});
