import { createTRPCRouter } from "@/server/api/trpc";
import { changePasswordMutation } from "./change-password";
import { forgetPasswordMutation } from "./forget-password";
import { resetPasswordMutation } from "./reset-password";
import { signUpMutation } from "./sign-up";
import { verifyTokenQuery } from "./verify-token";

export const authRoute = createTRPCRouter({
  // QUERIES
  verifyToken: verifyTokenQuery,

  // MUTATIONS
  signUp: signUpMutation,
  resetPassword: resetPasswordMutation,
  forgetPassword: forgetPasswordMutation,
  changePassword: changePasswordMutation,
});
