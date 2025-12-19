"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Toggle
        variant="outline"
        className="group size-9 border-transparent data-[state=on]:bg-transparent data-[state=on]:hover:bg-background/10 text-background hover:bg-background/10 hover:text-background dark:text-background dark:hover:bg-background/10 dark:hover:text-background"
        pressed={false}
        onPressedChange={() => {}}
        aria-label="Toggle theme"
        disabled
      >
        <Sun size={16} strokeWidth={2} className="shrink-0" aria-hidden="true" />
      </Toggle>
    );
  }

  const isDark = theme === "dark";

  return (
    <Toggle
      variant="outline"
      className="group relative size-9 border-transparent data-[state=on]:bg-transparent data-[state=on]:hover:bg-background/10 text-background hover:bg-background/10 hover:text-background dark:text-background dark:hover:bg-background/10 dark:hover:text-background"
      pressed={isDark}
      onPressedChange={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Moon
        size={16}
        strokeWidth={2}
        className="shrink-0 scale-0 opacity-0 transition-all duration-300 group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 group-hover:-rotate-12"
        aria-hidden="true"
      />
      <Sun
        size={16}
        strokeWidth={2}
        className="absolute shrink-0 scale-100 opacity-100 transition-all duration-300 group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0 group-hover:rotate-12"
        aria-hidden="true"
      />
    </Toggle>
  );
}

