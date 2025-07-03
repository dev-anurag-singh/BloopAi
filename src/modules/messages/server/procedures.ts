import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  }),
  create: baseProcedure
    .input(
      z.object({
        prompt: z
          .string()
          .min(1, { message: "Prompt is required" })
          .max(1000, { message: "Prompt is too long" }),
      })
    )
    .mutation(async ({ input }) => {
      // Save prompt in DB
      const createdMessage = await prisma.message.create({
        data: {
          content: input.prompt,
          role: "USER",
          type: "RESULT",
        },
      });

      //  Start Inngest background Job
      await inngest.send({
        name: "app/generate.requested",
        data: {
          value: input.prompt,
        },
      });

      return createdMessage;
    }),
});
