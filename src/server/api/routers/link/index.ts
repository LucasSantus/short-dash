import { createTRPCRouter } from "@/server/api/trpc";
import { allLinkOptionsQuery } from "./all-link-options";
import { createLinkMutation } from "./create";
import { deleteLinkMutation, deleteMultipleLinksMutationRoute } from "./delete";
import { linksQuery } from "./list";
import { redirectUrlByCodeMutation } from "./redirect-url-by-code";
import { updateLinkMutation } from "./update";
import { updateLinkStatusMutation, updateStatusMultipleLinkMutationRoute } from "./update-status";

export const linkRoute = createTRPCRouter({
  // QUERIES
  list: linksQuery,
  listOptions: allLinkOptionsQuery,

  // MUTATIONS
  create: createLinkMutation,

  update: updateLinkMutation,

  delete: deleteLinkMutation,
  deleteMultiple: deleteMultipleLinksMutationRoute,

  updateStatus: updateLinkStatusMutation,
  updateMultipleStatus: updateStatusMultipleLinkMutationRoute,

  redirectUrlByCode: redirectUrlByCodeMutation,
});
