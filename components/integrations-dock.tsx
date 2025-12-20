"use client";

import { useState } from "react";
import Image from "next/image";

interface Integration {
  name: string;
  icon: string; // Path to logo image
}

const integrations: Integration[] = [
  { name: "LinkedIn", icon: "/integrations/linkedin.svg" },
  { name: "Slack", icon: "/integrations/slack.svg" },
  { name: "Notion", icon: "/integrations/notion.svg" },
  { name: "Google Calendar", icon: "/integrations/google-calendar.svg" },
  { name: "Zoom", icon: "/integrations/zoom.svg" },
  { name: "Gmail", icon: "/integrations/gmail.svg" },
  { name: "Greenhouse", icon: "/integrations/greenhouse.svg" },
  { name: "Workday", icon: "/integrations/workday.svg" },
];

export function IntegrationsDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  return (
    <div className="flex items-end justify-center gap-4 sm:gap-6 md:gap-8 pb-4">
      {integrations.map((integration, index) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex !== null 
          ? Math.abs(index - hoveredIndex) 
          : null;
        
        // Calculate scale based on hover state and distance (Apple Dock effect)
        let scale = 1;
        if (isHovered) {
          scale = 1.5;
        } else if (distance !== null && distance <= 3) {
          // Nearby icons scale slightly (wave effect)
          const proximity = 1 - distance / 3;
          scale = 1 + (0.15 * proximity);
        }

        return (
          <div
            key={integration.name}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: `scale(${scale}) translateY(${isHovered ? '-8px' : '0px'})`,
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: isHovered ? 10 : 1,
            }}
          >
            {/* Tooltip on hover - above the icon */}
            {isHovered && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg animate-in fade-in-0 slide-in-from-top-1 duration-200">
                {integration.name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-foreground" />
              </div>
            )}

            {/* Icon container */}
            <div
              className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-xl bg-muted border border-border transition-all duration-300 hover:border-foreground/20 overflow-hidden p-2 sm:p-3 md:p-4"
              style={{
                boxShadow: isHovered
                  ? "0 12px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                  : "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Logo with error handling */}
              {imageErrors.has(index) ? (
                <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg bg-muted-foreground/20" />
              ) : (
                <Image
                  src={integration.icon}
                  alt={integration.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                  onError={() => setImageErrors((prev) => new Set(prev).add(index))}
                  unoptimized
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

