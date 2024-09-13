import { createTRPCRouter } from "@/server/api/trpc";
import { historicPerLinkQueryRoute } from "./historic-per-link-query";

export const historicRoute = createTRPCRouter({
  // QUERIES
  getHistoricPerLinkQuery: historicPerLinkQueryRoute,

  // MUTATIONS
});
