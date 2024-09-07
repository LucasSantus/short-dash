import { z } from "zod";
import {
  createLinkRouterSchema,
  createNewLink,
} from "../actions/link/create-link";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  createLink: baseProcedure
    .input(createLinkRouterSchema)
    .mutation(({ input }) => createNewLink(input)),
  login: baseProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation((opts) => {
      return {
        user: {
          name: opts.input.name,
          role: "ADMIN",
        },
      };
    }),
});

export type AppRouter = typeof appRouter;
