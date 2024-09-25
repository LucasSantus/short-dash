import { createTRPCRouter } from "@/server/api/trpc";
import { historicPerLinkQuery } from "./list";

export const historicRoute = createTRPCRouter({
  // QUERIES
  list: historicPerLinkQuery,

  // MUTATIONS
});
