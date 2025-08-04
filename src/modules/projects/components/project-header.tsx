import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ThemeToggler } from "@/components/theme-toggler";
import { Logo } from "@/components/logo";

interface Props {
  projectId: string;
}
export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();

  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  return (
    <header className="flex items-center justify-between gap-2 p-2 px-4 border-b ">
      <div className="flex items-center gap-3 max-w-[calc(100%-40px)]">
        <Link href={"/"}>
          <Logo size="sm" onlyIcon />
        </Link>
        <span className="text-sm font-medium truncate">{project.name}</span>
      </div>
      <ThemeToggler />
    </header>
  );
};
