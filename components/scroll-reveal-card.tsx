"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollRevealCard({ children, className = "", delay = 0 }: ScrollRevealCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    const element = containerRef.current;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      delay,
    });

    timelineRef.current = tl;

    // Store the ScrollTrigger instance from the timeline
    if (tl.scrollTrigger) {
      scrollTriggerRef.current = tl.scrollTrigger;
    }

    // Animate to final state
    tl.to(element, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
    });

    return () => {
      // Cleanup: kill timeline and ScrollTrigger
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      // Fallback: kill all ScrollTriggers associated with this component
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.vars?.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

