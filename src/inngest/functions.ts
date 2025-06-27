import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";

export const writeContents = inngest.createFunction(
  { id: "write-contents" },
  { event: "app/ticket.created" },
  async ({ event }) => {
    // Create a new agent with a system prompt (you can add optional tools, too)
    const writer = createAgent({
      name: "writer",
      system:
        "You are an expert writer.  You write readable, concise, simple content.",
      model: openai({ model: "gpt-4o" }),
    });

    // Run the agent with an input.  This automatically uses steps
    // to call your AI model.
    const { output } = await writer.run(`Write a tweet on ${event.data.value}`);

    return { output };
  }
);
