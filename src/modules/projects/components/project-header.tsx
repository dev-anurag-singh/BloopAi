import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  EditIcon,
  Moon,
  Sun,
  SunMoonIcon,
} from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggler } from "@/components/theme-toggler";

interface Props {
  projectId: string;
}
export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();

  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  return (
    <header className="flex items-center justify-between gap-2 p-4 border-b bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3 max-w-[calc(100%-40px)]">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Bloop" width={18} height={18} />
        </Link>
        <span className="text-sm font-medium truncate">{project.name}</span>
      </div>
      <ThemeToggler />
    </header>
  );
};
