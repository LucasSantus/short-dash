import { createTRPCRouter } from "@/server/api/trpc";
import { changePasswordMutationRoute } from "./change-password";
import { forgetPasswordMutationRoute } from "./forget-password";
import { resetPasswordMutationRoute } from "./reset-password";
import { signInMutationRoute } from "./sign-in";
import { signUpMutationRoute } from "./sign-up";

export const authRoute = createTRPCRouter({
  // QUERIES

  // MUTATIONS
  signIn: signInMutationRoute,
  signUp: signUpMutationRoute,
  resetPassword: resetPasswordMutationRoute,
  forgetPassword: forgetPasswordMutationRoute,
  changePassword: changePasswordMutationRoute,
});
