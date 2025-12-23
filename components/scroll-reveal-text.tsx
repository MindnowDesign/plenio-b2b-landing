"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollRevealText({ children, className = "", delay = 0 }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current || !textRef.current) return;
    
    // Use requestAnimationFrame to ensure DOM is updated by React
    requestAnimationFrame(() => {
      if (!textRef.current || !containerRef.current) return;
      const text = textRef.current;
      const originalHTML = text.innerHTML;
    
      // Split by <br> tags to get lines
      const lines = originalHTML.split(/<br\s*\/?>/i);
      
      // Rebuild with line wrappers
      text.innerHTML = "";
      
      lines.forEach((lineHTML, index) => {
        const lineDiv = document.createElement("div");
        lineDiv.style.display = "block";
        lineDiv.style.overflow = "hidden";
        
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.filter = "blur(10px)";
        span.innerHTML = lineHTML;
        
        lineDiv.appendChild(span);
        text.appendChild(lineDiv);
      });

      // Animate lines on scroll
      const lineSpans = text.querySelectorAll("div > span");
      
      gsap.set(lineSpans, {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
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

      lineSpans.forEach((span, index) => {
        tl.to(
          span,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
          },
          index * 0.15
        );
      });
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
      if (containerRef.current) {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          if (trigger.vars?.trigger === containerRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [delay, children]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={textRef}>{children}</div>
    </div>
  );
}
