import { createTRPCRouter } from "@/server/api/trpc";
import { getUserPerNameQueryRoute } from "./user-per-name-query";

export const userRoute = createTRPCRouter({
  // QUERIES
  getUserPerNameQuery: getUserPerNameQueryRoute,

  // MUTATIONS
});
