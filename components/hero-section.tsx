"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { WaitlistTrigger } from "@/components/waitlist-trigger";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";

interface HeroSectionProps {
  onWaitlistClick?: () => void;
}

export function HeroSection({ onWaitlistClick }: HeroSectionProps) {
  const { language } = useLanguage();
  const t = (key: keyof typeof import("@/lib/translations").translations.EN) => getTranslation(language, key);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // Calculate parallax offset for images based on mouse position
  const getParallaxOffset = (baseX: number, baseY: number, intensity: number = 0.3) => {
    const offsetX = (mousePosition.x - 50) * intensity;
    const offsetY = (mousePosition.y - 50) * intensity;
    return {
      x: baseX + offsetX,
      y: baseY + offsetY,
    };
  };

  // Image positions based on Figma design - using viewport-based positioning
  // Positions are calculated as percentages from the design (1440px width reference)
  const imagePositions = [
    { baseX: 3, baseY: 58, width: 197, height: 259, intensity: 0.12 }, // Left bottom
    { baseX: -9, baseY: 11, width: 334, height: 259, intensity: 0.15 }, // Left top (partially off-screen)
    { baseX: 21, baseY: -13, width: 261, height: 259, intensity: 0.13 }, // Center top (partially off-screen)
    { baseX: 57, baseY: -12, width: 443, height: 234, intensity: 0.14 }, // Right top (partially off-screen)
    { baseX: 85, baseY: 23, width: 268, height: 323, intensity: 0.12 }, // Right middle
    { baseX: 79, baseY: 70, width: 268, height: 199, intensity: 0.11 }, // Right bottom
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
            {t("heroTitle")}
            <span
              className="inline-flex items-start ml-6 mr-1"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <span
                className="inline-flex items-center justify-center bg-foreground rounded-md aspect-square w-11 h-11 sm:w-14 sm:h-14 -translate-y-1"
                style={{
                  transform: isLogoHovered
                    ? "scale(1.15) rotate(5deg) translateY(-4px)"
                    : "scale(1) rotate(0deg) translateY(-4px)",
                  transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <Image
                  src="/Logo/plenio-logotype.svg"
                  alt="Plenio"
                  width={60}
                  height={24}
                  className="h-5 w-auto sm:h-6 sm:w-auto brightness-0 invert dark:brightness-0 dark:invert-0"
                  priority
                />
              </span>
            </span>
            {t("heroSubtitle")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {t("heroDescription")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-4">
            <Button size="lg" variant="outline" asChild className="group relative overflow-hidden">
              <Link href="#features-list">
                <span className="relative inline-block overflow-hidden">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-full">
                    {t("learnMore")}
                  </span>
                  <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-y-full group-hover:translate-y-0">
                    {t("learnMore")}
                  </span>
                </span>
              </Link>
            </Button>
            <WaitlistTrigger size="lg" onClick={onWaitlistClick || (() => {})} showIcon={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

