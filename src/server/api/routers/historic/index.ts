import { createTRPCRouter } from "@/server/api/trpc";
import { historicPerLinkQueryRoute } from "./historic-per-link";

export const historicRoute = createTRPCRouter({
  // QUERIES
  list: historicPerLinkQueryRoute,

  // MUTATIONS
});
