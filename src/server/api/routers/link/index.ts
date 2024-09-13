import { createTRPCRouter } from "@/server/api/trpc";
import { createLinkMutationRoute } from "./create-link-mutation";
import { deleteLinkMutationRoute } from "./delete-link-mutation";
import { linksQueryRoute } from "./links-query";
import { redirectUrlByCodeMutationRoute } from "./redirect-url-by-code-mutation";
import { updateLinkMutationRoute } from "./update-link-mutation";

export const linkRoute = createTRPCRouter({
  // QUERIES
  getLinksQuery: linksQueryRoute,

  // MUTATIONS
  createLinkMutation: createLinkMutationRoute,
  updateLinkMutation: updateLinkMutationRoute,
  deleteLinkMutation: deleteLinkMutationRoute,
  redirectUrlByCodeMutation: redirectUrlByCodeMutationRoute,
});
