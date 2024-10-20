import { createTRPCRouter } from "@/server/api/trpc";
import { changePasswordMutation } from "./change-password";
import { forgetPasswordMutation } from "./forget-password";
import { resetPasswordMutation } from "./reset-password";
import { signUpMutation } from "./sign-up";

export const authRoute = createTRPCRouter({
  // QUERIES

  // MUTATIONS
  signUp: signUpMutation,
  resetPassword: resetPasswordMutation,
  forgetPassword: forgetPasswordMutation,
  changePassword: changePasswordMutation,
});
