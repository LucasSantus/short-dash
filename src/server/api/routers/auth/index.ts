import { createTRPCRouter } from "@/server/api/trpc";
import { changePasswordMutationRoute } from "./change-password-mutation";
import { forgetPasswordMutationRoute } from "./forget-password-mutation";
import { resetPasswordMutationRoute } from "./reset-password-mutation";
import { signInMutationRoute } from "./sign-in-mutation";
import { signUpMutationRoute } from "./sign-up-mutation";

export const authRoute = createTRPCRouter({
  // QUERIES

  // MUTATIONS
  signInMutation: signInMutationRoute,
  signUpMutation: signUpMutationRoute,
  resetPasswordMutation: resetPasswordMutationRoute,
  forgetPasswordMutation: forgetPasswordMutationRoute,
  changePasswordMutation: changePasswordMutationRoute,
});
