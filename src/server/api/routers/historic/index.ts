import { createTRPCRouter } from "@/server/api/trpc";
import { historicPerLinkQueryRoute } from "./list";

export const historicRoute = createTRPCRouter({
  // QUERIES
  list: historicPerLinkQueryRoute,

  // MUTATIONS
});
