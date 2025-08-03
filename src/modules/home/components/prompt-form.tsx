"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: "Message is required" })
    .max(10000, { message: "Message is too long" }),
});

const examples = [
  "Create a todo app with React and TypeScript",
  "Build a landing page for a SaaS startup",
  "Make a dashboard with charts and analytics",
  "Design a portfolio website with animations",
];

export const PromptForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const trpc = useTRPC();
  const router = useRouter();

  const { mutate: sendMessage, isPending } = useMutation(
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
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(values =>
            sendMessage({ prompt: values.prompt })
          )}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Describe the app you want to build..."
                  className={`w-full h-16 px-6 py-4 pr-16 md:text-lg rounded-2xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent border-gray-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm 
               dark:border-gray-700 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white dark:placeholder-gray-400
            `}
                />
              )}
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed h-10"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="w-6 h-6" />
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="mb-4">
        <p className={`mb-4 text-muted-foreground`}>Try these examples:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {examples.map((example, index) => (
            <Button
              key={index}
              variant={"outline"}
              className="rounded-full bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 shadow-sm hover:shadow-md dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600"
              onClick={() =>
                form.setValue("prompt", example, { shouldValidate: true })
              }
            >
              {example}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};
