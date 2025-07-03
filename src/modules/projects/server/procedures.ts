import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateTitleFromPrompt } from "../util/generateTitle";

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
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
      // Generate title using AI
      const name = await generateTitleFromPrompt(input.prompt);

      // Save prompt in DB
      const createdProject = await prisma.project.create({
        data: {
          name: name,
          messages: {
            create: {
              content: input.prompt,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });

      //  Start Inngest background Job
      await inngest.send({
        name: "app/generate.requested",
        data: {
          value: input.prompt,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
});
