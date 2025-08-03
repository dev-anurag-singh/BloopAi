import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="relative z-10 px-4 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <nav className="flex items-center space-x-4">
          <ThemeToggler className="h-9" />
          <Button>Sign In</Button>
        </nav>
      </div>
    </header>
  );
};
