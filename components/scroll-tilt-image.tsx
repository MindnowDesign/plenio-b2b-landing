"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollTiltImageProps {
  /**
   * Initial rotation angle in degrees on X axis (negative = tilted back, positive = tilted forward)
   * @default 10
   */
  initialRotation?: number;
  
  /**
   * Final rotation angle in degrees on X axis (usually 0 for straight)
   * @default 0
   */
  finalRotation?: number;
  
  /**
   * Height of the container/viewport that triggers the animation
   * The animation completes when this amount of pixels has been scrolled
   * @default 400
   */
  scrollDistance?: number;
  
  /**
   * Offset from top of viewport when animation starts (in pixels)
   * @default 0
   */
  startOffset?: number;
  
  /**
   * Custom className for the container
   */
  className?: string;
  
  /**
   * Custom className for the image/box
   */
  imageClassName?: string;
  
  /**
   * Width of the image/box
   * @default "100%"
   */
  width?: string;
  
  /**
   * Height of the image/box
   * @default "900px"
   */
  height?: string;
  
  /**
   * Easing function for the rotation animation
   * @default "cubic-bezier(0.4, 0, 0.2, 1)"
   */
  easing?: string;
  
  /**
   * Video source URL to use as placeholder
   */
  videoSrc?: string;
  
  /**
   * Video poster image URL (shown before video loads)
   */
  videoPoster?: string;
  
  /**
   * Whether the video should autoplay
   * @default true
   */
  videoAutoplay?: boolean;
  
  /**
   * Whether the video should loop
   * @default true
   */
  videoLoop?: boolean;
  
  /**
   * Whether the video should be muted
   * @default true
   */
  videoMuted?: boolean;
  
  /**
   * Whether the video should play inline (important for mobile)
   * @default true
   */
  videoPlaysInline?: boolean;
}

export function ScrollTiltImage({
  initialRotation = 10,
  finalRotation = 0,
  scrollDistance = 400,
  startOffset = 0,
  className = "",
  imageClassName = "",
  width = "100%",
  height = "900px",
  easing = "cubic-bezier(0.4, 0, 0.2, 1)",
  videoSrc,
  videoPoster,
  videoAutoplay = true,
  videoLoop = true,
  videoMuted = true,
  videoPlaysInline = true,
}: ScrollTiltImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rotation, setRotation] = useState(initialRotation);
  const animationStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const elementTop = rect.top;
      
      // Animation starts when element top enters viewport (reaches viewport bottom)
      // If element is already visible, start animation immediately
      const triggerPoint = viewportHeight;
      
      // Initialize animation start point if not set and element is in viewport
      if (animationStartYRef.current === null && elementTop < triggerPoint) {
        animationStartYRef.current = scrollY;
      }
      
      // Reset if element goes back above viewport
      if (elementTop > triggerPoint) {
        animationStartYRef.current = null;
      }
      
      // Calculate progress
      let scrollProgress = 0;
      
      if (animationStartYRef.current !== null) {
        // Animation has started - calculate progress based on scroll distance
        const distanceScrolled = scrollY - animationStartYRef.current;
        scrollProgress = Math.max(0, Math.min(1, distanceScrolled / scrollDistance));
      }

      // Interpolate rotation from initialRotation to finalRotation
      const currentRotation =
        initialRotation + (finalRotation - initialRotation) * scrollProgress;
      
      setRotation(currentRotation);
    };

    // Initial calculation
    handleScroll();

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    window.addEventListener("resize", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      window.removeEventListener("resize", throttledHandleScroll);
    };
  }, [initialRotation, finalRotation, scrollDistance, startOffset]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden bg-background ${className}`}
    >
      <div className="container mx-auto px-4">
        <div 
          className="flex items-center justify-center" 
          style={{ 
            perspective: "2000px",
            perspectiveOrigin: "center center"
          }}
        >
          <div
            className={`bg-foreground/10 dark:bg-muted/60 rounded-2xl overflow-hidden ${imageClassName}`}
            style={{
              width,
              height,
              transform: `perspective(2000px) rotateX(${rotation}deg) translateZ(0)`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform",
              outline: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={videoPoster}
                autoPlay={videoAutoplay}
                loop={videoLoop}
                muted={videoMuted}
                playsInline={videoPlaysInline}
                className="w-full h-full object-cover"
                style={{
                  transform: "translateZ(0)",
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

