import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { MessageCard } from "./message-card";
import { MessageForm } from "./message-form";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Fragment } from "@/generated/prisma";
import { MessageLoading } from "./message-loading";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}

export const MessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) => {
  const trpc = useTRPC();
  const scrollToRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({ projectId }, { refetchInterval: 5000 })
  );

  // useEffect(() => {
  //   const lastAssistantMessage = messages.findLast(
  //     message => message.role === "ASSISTANT"
  //   );

  //   if (lastAssistantMessage) {
  //     setActiveFragment(lastAssistantMessage.fragment);
  //   }
  // }, [messages, setActiveFragment]);

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView();
    }
  }, []);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "USER";

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ScrollArea className="flex-1 min-h-0">
        <div className="pt-4 px-4 space-y-4 pb-6">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <MessageCard
                message={message}
                isActiveFragment={activeFragment?.id === message.fragment?.id}
                onFragmentClick={() => setActiveFragment(message.fragment)}
              />
            </motion.div>
          ))}
        </div>
        {isLastMessageUser && <MessageLoading />}
        <div ref={scrollToRef} />
      </ScrollArea>
      <div className="relative p-4 pt-0">
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};
