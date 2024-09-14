import { createTRPCRouter } from "@/server/api/trpc";
import { createLinkMutationRoute } from "./create";
import { deleteLinkMutationRoute, deleteMultipleLinksMutationRoute } from "./delete";
import { linksQueryRoute } from "./list";
import { redirectUrlByCodeMutationRoute } from "./redirect-url-by-code";
import { updateLinkMutationRoute } from "./update";
import { updateLinkStatusMutationRoute, updateStatusMultipleLinkMutationRoute } from "./update-status";

export const linkRoute = createTRPCRouter({
  // QUERIES
  list: linksQueryRoute,

  // MUTATIONS
  create: createLinkMutationRoute,

  update: updateLinkMutationRoute,

  delete: deleteLinkMutationRoute,
  deleteMultiple: deleteMultipleLinksMutationRoute,

  updateStatus: updateLinkStatusMutationRoute,
  updateMultipleStatus: updateStatusMultipleLinkMutationRoute,

  redirectUrlByCode: redirectUrlByCodeMutationRoute,
});
