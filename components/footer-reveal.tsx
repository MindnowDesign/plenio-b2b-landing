"use client";

import { useEffect, useRef } from "react";

export function FooterReveal({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !footerRef.current) return;

    const footer = footerRef.current;
    
    const updateTransform = () => {
      // Find the FAQ section (trigger point)
      const triggerElement = document.querySelector('[data-footer-trigger]') as HTMLElement;
      if (!triggerElement) {
        // Fallback: hide footer if no trigger found
        footer.style.transform = `translateY(100%)`;
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const triggerRect = triggerElement.getBoundingClientRect();
      const triggerBottom = triggerRect.bottom + scrollY;
      const footerHeight = footer.offsetHeight;
      
      // Calculate when footer should start revealing
      // Footer should start revealing when we reach the bottom of the FAQ section
      const revealStartPoint = triggerBottom - windowHeight;
      
      if (scrollY < revealStartPoint) {
        // Before FAQ section - footer is completely hidden
        footer.style.transform = `translateY(100%)`;
      } else {
        // After FAQ section - calculate reveal progress
        const scrollPastTrigger = scrollY - revealStartPoint;
        const revealDistance = footerHeight + 100; // Extra distance for smooth reveal
        const revealProgress = Math.min(scrollPastTrigger / revealDistance, 1);
        
        // Footer moves up from 100% (hidden) to 0% (visible)
        const offset = (1 - revealProgress) * footerHeight;
        footer.style.transform = `translateY(${offset}px)`;
      }
    };

    // Initial calculation
    updateTransform();

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTransform);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTransform);
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer-reveal" style={{ willChange: "transform" }}>
      {children}
    </footer>
  );
}

