"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const router = useRouter();

  const { mutate: createMessage, isPending } = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: data => {
        router.push(`/projects/${data.id}`);
      },
      onError: error => {
        toast.error(error.message);
      },
    })
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="space-y-6">
            <Textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="What would you like to create today?"
              className="min-h-[120px] resize-none text-base leading-relaxed border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
            />
            <Button
              onClick={() => createMessage({ prompt: value })}
              disabled={isPending}
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
