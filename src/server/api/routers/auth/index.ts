import { createTRPCRouter } from "@/server/api/trpc";
import { changePasswordRoute } from "./change-password";
import { forgetPasswordRoute } from "./forget-password";
import { resetPasswordRoute } from "./reset-password";
import { signInRoute } from "./sign-in";
import { signUpRoute } from "./sign-up";

export const authRoute = createTRPCRouter({
  signIn: signInRoute,
  signUp: signUpRoute,
  resetPassword: resetPasswordRoute,
  forgetPassword: forgetPasswordRoute,
  changePassword: changePasswordRoute,
});
