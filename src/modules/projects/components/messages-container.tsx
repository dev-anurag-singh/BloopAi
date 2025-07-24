import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  projectId: string;
}

export const MessagesContainer = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const scrollToRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      message => message.role === "ASSISTANT"
    );

    if (lastAssistantMessage) {
      // TODO SET ACTIVE FRAGMENT
    }
  }, [messages]);

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ScrollArea className="flex-1 min-h-0">
        <div className="pt-2 px-4 space-y-4 pb-6">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <MessageCard
                message={message}
                isActiveFragment={false}
                onFragmentClick={() => {}}
              />
            </motion.div>
          ))}
        </div>
        <div ref={scrollToRef} />
      </ScrollArea>
      <div className="relative p-4 pt-0">
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};
