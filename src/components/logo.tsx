import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface Props {
  onlyIcon?: boolean;
  size?: "sm" | "lg";
}
export const Logo = ({ onlyIcon = false, size = "lg" }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(
          "w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center",
          { "w-6 h-6 rounded-sm": size === "sm" }
        )}
      >
        <Zap
          className={cn("w-5 h-5 text-white", { "w-4 h-4": size === "sm" })}
        />
      </div>
      {!onlyIcon && (
        <span className={`font-bold text-xl dark:text-white text-gray-900`}>
          Bloop
        </span>
      )}
    </div>
  );
};
