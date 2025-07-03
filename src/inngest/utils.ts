import { Sandbox } from "e2b";
import { AgentResult, Message, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
}

export function prettyPrintLastAssistantMessage(result: AgentResult) {
  const lastAssistantMessageIndex = result.output.findLastIndex(
    message => message.role === "assistant"
  );
  const message = result.output[lastAssistantMessageIndex] as
    | Message
    | undefined;
  if (message) {
    if (message.type === "tool_call") {
      console.log("Agent response > ", `tool call (${message.tools[0].name})`);
    } else if (message.type === "text" && message.content) {
      console.log("Agent response > ", message.content);
    }
  }
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantMessageIndex = result.output.findLastIndex(
    message => message.role === "assistant"
  );
  const message = result.output[lastAssistantMessageIndex] as
    | TextMessage
    | undefined;
  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map(c => c.text).join("")
    : undefined;
}
