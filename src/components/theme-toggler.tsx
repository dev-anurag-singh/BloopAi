"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggler({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            size={"sm"}
            className={cn("p-2!", className)}
          >
            <Moon className="hidden text-foreground  dark:inline-block" />
            <Sun className="text-foreground  dark:hidden" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="p-2" align="start">
          <p className="text-xs">Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
