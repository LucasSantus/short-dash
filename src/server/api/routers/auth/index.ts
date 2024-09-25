import { createTRPCRouter } from "@/server/api/trpc";
import { changePasswordMutation } from "./change-password";
import { forgetPasswordMutation } from "./forget-password";
import { resetPasswordMutation } from "./reset-password";
import { signInMutation } from "./sign-in";
import { signUpMutation } from "./sign-up";

export const authRoute = createTRPCRouter({
  // QUERIES

  // MUTATIONS
  signIn: signInMutation,
  signUp: signUpMutation,
  resetPassword: resetPasswordMutation,
  forgetPassword: forgetPasswordMutation,
  changePassword: changePasswordMutation,
});
