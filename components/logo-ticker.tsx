"use client";

import { useMemo, memo } from "react";
import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LogoTickerProps {
  logos?: Logo[];
}

// Logos from the Ticker folder
const defaultLogos: Logo[] = [
  { src: "/Ticker/logo-ticker-01.svg", alt: "Partner 1", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-02.svg", alt: "Partner 2", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-03.svg", alt: "Partner 3", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-04.svg", alt: "Partner 4", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-05.svg", alt: "Partner 5", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-06.svg", alt: "Partner 6", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-07.svg", alt: "Partner 7", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-08.svg", alt: "Partner 8", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-09.svg", alt: "Partner 9", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-10.svg", alt: "Partner 10", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-11.svg", alt: "Partner 11", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-12.svg", alt: "Partner 12", width: 120, height: 40 },
  { src: "/Ticker/logo-ticker-13.svg", alt: "Partner 13", width: 120, height: 40 },
];

export const LogoTicker = memo(function LogoTicker({ logos = defaultLogos }: LogoTickerProps) {
  // Duplicate logos multiple times for seamless infinite loop - memoized
  // We need at least 2 copies for seamless loop, using 4 for smoother animation
  const duplicatedLogos = useMemo(() => [...logos, ...logos, ...logos, ...logos], [logos]);

  return (
    <section className="relative overflow-hidden bg-background py-8 mt-8 mb-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mt-4 text-base text-muted-foreground">
            Trusted by 100+ forward thinking Swiss companies
          </p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-scroll mt-8">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="mx-8 flex shrink-0 items-center justify-center transition-all"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 120}
                height={logo.height || 40}
                className="h-auto max-h-10 w-auto object-contain grayscale opacity-60 brightness-0 dark:brightness-100 dark:opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

