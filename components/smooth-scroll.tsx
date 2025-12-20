"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Handle anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (anchor && lenisRef.current) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const element = document.querySelector(href) as HTMLElement;
          if (element) {
            lenisRef.current.scrollTo(element, { offset: -80 });
          }
        }
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return <>{children}</>;
}

