import { env } from "rekommendera/env";
import {
  createTRPCRouter,
  publicProcedure,
} from "rekommendera/server/api/trpc";
import OpenAI from "openai";
import { z } from "zod";
const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const chatgptRouter = createTRPCRouter({
  hello: publicProcedure
  .query(async () => {
    return {
      greeting: "test",
    };
  }),
  askChatgpt: publicProcedure
  .input(z.object({ text: z.string() }))
  .mutation(async ({ input }) => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: input.text }],
      model: "gpt-3.5-turbo",
    });
    return {
      response: completion.choices[0],
      created: completion.created,
    };
  }),

})