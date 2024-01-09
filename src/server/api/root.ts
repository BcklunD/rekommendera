import { postRouter } from "rekommendera/server/api/routers/post";
import { createTRPCRouter } from "rekommendera/server/api/trpc";
import { chatgptRouter } from "./routers/chatgpt";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  chatgpt: chatgptRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
