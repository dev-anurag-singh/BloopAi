import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { ChevronRightIcon, Code2Icon } from "lucide-react";

type Message = inferRouterOutputs<AppRouter>["messages"]["getMany"][number];

interface Props {
  message: Message;
  isActiveFragment: boolean;
  onFragmentClick: () => void;
}

export const MessageCard = ({
  message,
  isActiveFragment,
  onFragmentClick,
}: Props) => {
  const { content, role, fragment, createdAt, type } = message;

  if (role === "ASSISTANT") {
    return (
      <div
        className={cn("flex flex-col group", {
          "text-red-700 dark:text-red-500": type === "ERROR",
        })}
      >
        <div className="flex items-center gap-2 mb-2">
          <Image
            src="/logo.svg"
            alt="BloopAi"
            width={18}
            height={18}
            className="shrink-0"
          />
          <span className="text-sm font-medium">Bloop</span>
          <span className="text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
          </span>
        </div>
        <div className="pl-8.5 flex flex-col gap-y-4">
          <span>{content}</span>
          {fragment && type === "RESULT" && (
            <button
              className={cn(
                "flex items-start text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary transition-colors",
                {
                  "bg-black text-white hover:bg-black": isActiveFragment,
                }
              )}
              onClick={onFragmentClick}
            >
              <Code2Icon className="size-4 mt-0.5" />
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium">{fragment.title}</span>
                <span className="text-sm">Preview</span>
              </div>
              <div className="flex items-center justify-center">
                <ChevronRightIcon className="size-4" />
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end pb-4 pr-2 pl-10">
      <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
        {content}
      </Card>
    </div>
  );
};
