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
  
  /**
   * Image source URL to use instead of video
   */
  imageSrc?: string;
  
  /**
   * Alt text for the image
   */
  imageAlt?: string;
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
  imageSrc,
  imageAlt = "",
}: ScrollTiltImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(initialRotation);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const animationStartYRef = useRef<number | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate video aspect ratio when video loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const handleLoadedMetadata = () => {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      if (videoWidth > 0 && videoHeight > 0) {
        setAspectRatio(videoWidth / videoHeight);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    
    // If metadata is already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoSrc]);

  // Calculate image aspect ratio when image loads
  useEffect(() => {
    const image = imageRef.current;
    if (!image || !imageSrc) return;

    const handleLoad = () => {
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      if (imageWidth > 0 && imageHeight > 0) {
        setAspectRatio(imageWidth / imageHeight);
      }
    };

    image.addEventListener("load", handleLoad);
    
    // If image is already loaded
    if (image.complete && image.naturalWidth > 0) {
      handleLoad();
    }

    return () => {
      image.removeEventListener("load", handleLoad);
    };
  }, [imageSrc]);

  // Update container width on resize (for aspect ratio calculation)
  useEffect(() => {
    if (!boxRef.current) return;

    const updateWidth = () => {
      if (boxRef.current) {
        setContainerWidth(boxRef.current.offsetWidth);
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(boxRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [aspectRatio]);

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
            ref={boxRef}
            className={`bg-foreground/10 dark:bg-muted/60 rounded-2xl overflow-hidden ${imageClassName}`}
            style={{
              width,
              height: aspectRatio && containerWidth
                ? `${containerWidth / aspectRatio}px`
                : height,
              transform: `perspective(2000px) rotateX(${rotation}deg) translateZ(0)`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform",
              outline: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            {imageSrc ? (
              <img
                ref={imageRef}
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
                style={{
                  transform: "translateZ(0)",
                }}
              />
            ) : videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={videoPoster}
                autoPlay={videoAutoplay}
                loop={videoLoop}
                muted={videoMuted}
                playsInline={videoPlaysInline}
                className="w-full h-auto md:h-full object-contain md:object-cover"
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

