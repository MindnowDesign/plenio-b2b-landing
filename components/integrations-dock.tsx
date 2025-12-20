"use client";

import { useState, useCallback, memo } from "react";
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

export const IntegrationsDock = memo(function IntegrationsDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  return (
    <div className="grid grid-cols-4 md:flex md:flex-row items-center justify-center gap-x-4 gap-y-4 sm:gap-x-5 sm:gap-y-5 md:gap-5 mb-4 max-w-[400px] mx-auto md:max-w-none">
      {integrations.map((integration, index) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex !== null 
          ? Math.abs(index - hoveredIndex) 
          : null;
        
        // Calculate scale based on hover state and distance (Apple Dock effect)
        let scale = 1;
        if (isHovered) {
          scale = 1.25;
        } else if (distance !== null && distance <= 3) {
          // Nearby icons scale slightly (wave effect)
          const proximity = 1 - distance / 3;
          scale = 1 + (0.1 * proximity);
        }

        return (
          <div
            key={integration.name}
            className="relative flex flex-col items-center justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: `scale(${scale}) translateY(${isHovered ? '-8px' : '0px'})`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
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

            {/* Logo with error handling */}
            {imageErrors.has(index) ? (
              <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-lg bg-muted-foreground/20" />
            ) : (
              <Image
                src={integration.icon}
                alt={integration.name}
                width={80}
                height={80}
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                onError={() => handleImageError(index)}
                unoptimized
              />
            )}
          </div>
        );
      })}
    </div>
  );
});

