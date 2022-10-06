// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { protectedExampleRouter } from "./protected-example-router";
import { projectRouter } from "./project";
import { commentRouter } from "./comment";
import { voteRouter } from "./vote";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge("project.", projectRouter)
  .merge("comment.", commentRouter)
  .merge("vote.", voteRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
