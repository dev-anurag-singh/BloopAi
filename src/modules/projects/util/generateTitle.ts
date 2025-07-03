// lib/generateTitle.ts
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateTitleFromPrompt(prompt: string) {
  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Given a prompt to generate an app, return a short, clear, 3–5 word project title. No punctuation or quotes.",
      },
      {
        role: "user",
        content: `Prompt: ${prompt}`,
      },
    ],
  });

  return res.choices[0].message?.content?.trim() || "Untitled Project";
}
