"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import { gsap } from "gsap";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const sunRef = React.useRef<SVGSVGElement>(null);
  const moonRef = React.useRef<SVGSVGElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const prevThemeRef = React.useRef<string | undefined>(theme);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle hover rotation
  React.useEffect(() => {
    if (!mounted || !buttonRef.current || !sunRef.current || !moonRef.current) return;

    const button = buttonRef.current;
    const isDark = theme === "dark";
    const visibleIcon = isDark ? moonRef.current : sunRef.current;

    const handleMouseEnter = () => {
      if (visibleIcon) {
        gsap.to(visibleIcon, {
          rotation: isDark ? -15 : 15,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (visibleIcon) {
        gsap.to(visibleIcon, {
          rotation: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted, theme]);

  React.useEffect(() => {
    if (!mounted || !sunRef.current || !moonRef.current) return;
    
    const isDark = theme === "dark";
    
    // Only animate if theme actually changed
    if (prevThemeRef.current && prevThemeRef.current !== theme) {
      const tl = gsap.timeline({ defaults: { duration: 0.15, ease: "power2.inOut" } });
      
      if (isDark) {
        // Transitioning to dark: Sun morphs to Moon
        tl.to(sunRef.current, {
          scale: 0,
          rotation: 180,
          opacity: 0,
        })
        .fromTo(
          moonRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
          },
          "<0.2" // Start slightly before sun finishes
        );
      } else {
        // Transitioning to light: Moon morphs to Sun
        tl.to(moonRef.current, {
          scale: 0,
          rotation: -180,
          opacity: 0,
        })
        .fromTo(
          sunRef.current,
          {
            scale: 0,
            rotation: 180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
          },
          "<0.2" // Start slightly before moon finishes
        );
      }
    } else {
      // Initial render - set initial states
      if (isDark) {
        gsap.set(sunRef.current, { scale: 0, opacity: 0, rotation: 0 });
        gsap.set(moonRef.current, { scale: 1, opacity: 1, rotation: 0 });
      } else {
        gsap.set(sunRef.current, { scale: 1, opacity: 1, rotation: 0 });
        gsap.set(moonRef.current, { scale: 0, opacity: 0, rotation: 0 });
      }
    }
    
    prevThemeRef.current = theme;
  }, [theme, mounted]);

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
      ref={buttonRef}
      variant="outline"
      className="group relative size-9 border-transparent data-[state=on]:bg-transparent data-[state=on]:hover:bg-background/10 text-background hover:bg-background/10 hover:text-background dark:text-background dark:hover:bg-background/10 dark:hover:text-background cursor-pointer"
      pressed={isDark}
      onPressedChange={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Moon
        ref={moonRef}
        size={16}
        strokeWidth={2}
        className="shrink-0"
        aria-hidden="true"
      />
      <Sun
        ref={sunRef}
        size={16}
        strokeWidth={2}
        className="absolute shrink-0"
        aria-hidden="true"
      />
    </Toggle>
  );
}

