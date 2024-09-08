import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { TRPCContext } from "./context";

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

/**
 * create trpc routers
 */
export const createTRPCRouter = t.router;

/**
 * wrapper with merge routers
 */
export const mergeRouters = t.mergeRouters;

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
  const {
    ctx: { isAuthenticated, user },
  } = opts;

  if (!isAuthenticated) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
  }

  return opts.next({
    ctx: {
      user,
      userId: user.id,
    },
  });
});
