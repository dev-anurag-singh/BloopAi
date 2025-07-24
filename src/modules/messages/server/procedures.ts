import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, { message: "Project ID is required" }),
      })
    )
    .query(async ({ input }) => {
      const messages = await prisma.message.findMany({
        where: {
          projectId: input.projectId,
        },
        include: { fragment: true },
        orderBy: {
          createdAt: "asc",
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
        projectId: z.string().min(1, { message: "Project ID is required" }),
      })
    )
    .mutation(async ({ input }) => {
      // Check if Project exists
      const project = await prisma.project.findUnique({
        where: { id: input.projectId },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found.",
        });
      }

      // Save prompt in DB
      const createdMessage = await prisma.message.create({
        data: {
          content: input.prompt,
          role: "USER",
          type: "RESULT",
          projectId: input.projectId,
        },
      });

      //  Start Inngest background Job
      await inngest.send({
        name: "app/generate.requested",
        data: {
          value: input.prompt,
          projectId: input.projectId,
        },
      });

      return createdMessage;
    }),
});
