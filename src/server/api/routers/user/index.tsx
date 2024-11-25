import { createTRPCRouter } from "@/server/api/trpc";
import { deactivateMutation } from "./deactivate";
import { updateProfileMutation } from "./update-profile";

export const userRoute = createTRPCRouter({
  // QUERIES

  // MUTATIONS
  updateProfile: updateProfileMutation,
  deactivate: deactivateMutation,
});
