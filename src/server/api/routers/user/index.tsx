import { createTRPCRouter } from "@/server/api/trpc";
import { updateProfileMutation } from "./update-profile";

export const userRoute = createTRPCRouter({
  // QUERIES

  // MUTATIONS
  updateProfile: updateProfileMutation,
});
