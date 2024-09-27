import { createTRPCRouter } from "@/server/api/trpc";
import { eventListQuery } from "./list";

export const eventRoute = createTRPCRouter({
  // QUERIES
  list: eventListQuery,

  // MUTATIONS
});
