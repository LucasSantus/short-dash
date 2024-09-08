import { mergeRouters } from "../init";
import { linksRouter } from "./links";

export const appRouter = mergeRouters(linksRouter);

export type AppRouter = typeof appRouter;
