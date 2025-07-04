import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

export default function ChangeThemeBtn({
  className,
  fromDashboard = false,
}: {
  className?: ClassValue;
  fromDashboard?: boolean;
}) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "ml-1 size-10 rounded-full hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring transition",
        className,
        {
          "ml-0 size-5  ": fromDashboard,
        }
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-white" />
      ) : (
        <Moon className="h-5 w-5 text-blue-600" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
