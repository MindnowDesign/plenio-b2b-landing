"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedIconProps {
  children: React.ReactElement<SVGElement>;
  delay?: number;
}

export function AnimatedIcon({ children, delay = 0 }: AnimatedIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!iconRef.current || !svgRef.current) return;

    const svg = svgRef.current;
    const paths = svg.querySelectorAll("path, circle, line, polyline, polygon, rect");

    if (paths.length === 0) {
      // If no paths found, show icon immediately
      gsap.set(svg, { opacity: 1 });
      return;
    }

    // Set initial state - paths are invisible
    paths.forEach((path) => {
      const element = path as SVGPathElement;
      const length = element.getTotalLength?.() || 0;
      if (length > 0) {
        gsap.set(element, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });
      } else {
        gsap.set(element, { opacity: 0, scale: 0 });
      }
    });

    // Animate on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: iconRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      delay,
    });

    paths.forEach((path) => {
      const element = path as SVGPathElement;
      const length = element.getTotalLength?.() || 0;
      if (length > 0) {
        tl.to(
          element,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "<0.05"
        );
      } else {
        tl.to(
          element,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "<0.05"
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === iconRef.current) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  if (!React.isValidElement(children)) {
    return (
      <div className="flex h-6 w-6 items-center justify-center">
        <div className="h-6 w-6 rounded bg-muted" />
      </div>
    );
  }

  const existingClassName = (children.props as any)?.className || "";

  return (
    <div ref={iconRef} className="flex h-6 w-6 items-center justify-center">
      {React.cloneElement(children as React.ReactElement<any>, {
        ref: svgRef,
        className: `${existingClassName} h-6 w-6 text-white dark:text-foreground`.trim(),
        strokeWidth: 1.5,
      } as any)}
    </div>
  );
}

