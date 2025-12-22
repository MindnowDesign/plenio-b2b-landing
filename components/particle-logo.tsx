"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  g: number;
  b: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
}

interface ParticleLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  particleSize?: number;
  particleSpacing?: number;
  mouseRadius?: number;
  mouseStrength?: number;
  damping?: number;
}

export function ParticleLogo({
  src,
  alt,
  width = 1200,
  height = 300,
  className = "",
  particleSize = 1,
  particleSpacing = 6,
  mouseRadius = 100,
  mouseStrength = 0.3,
  damping = 0.85,
}: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef(0);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Store props in refs for animation access
  const propsRef = useRef({ mouseRadius, mouseStrength, damping });
  useEffect(() => {
    propsRef.current = { mouseRadius, mouseStrength, damping };
  }, [mouseRadius, mouseStrength, damping]);

  // Simple noise function for smooth random movement
  const noise = (x: number, y: number, t: number): number => {
    return Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.7) * 0.5 + 0.5;
  };

  // Animation loop - heavily optimized
  const animate = useRef(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const { mouseRadius: mr, mouseStrength: ms, damping: d } = propsRef.current;
    
    timeRef.current += 0.008; // Slightly slower for performance

    // Use distance squared to avoid sqrt when possible
    const mouseRadiusSquared = mr * mr;
    const isMouseActive = mouse.x > -500 && mouse.y > -500;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      
      // Gentle random movement using noise - always active for relaxed state
      const noiseX = (noise(particle.noiseOffsetX, particle.noiseOffsetY, timeRef.current) - 0.5) * 0.3;
      const noiseY = (noise(particle.noiseOffsetY, particle.noiseOffsetX, timeRef.current) - 0.5) * 0.3;
      
      // Apply gentle noise force (increased for more visible movement)
      particle.vx += noiseX * 0.02;
      particle.vy += noiseY * 0.02;

      // Only check mouse if it's active - REPULSION (push away)
      if (isMouseActive) {
        // Calculate distance from mouse (using squared distance for performance)
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;

        // Apply mouse repulsion force only if close enough
        if (distanceSquared < mouseRadiusSquared && distanceSquared > 0) {
          const distance = Math.sqrt(distanceSquared);
          const force = (mr - distance) / mr;
          // Invert angle to push away (opposite direction)
          const angle = Math.atan2(dy, dx);
          // Negative force to push away from mouse
          const forceX = -Math.cos(angle) * force * ms * 7;
          const forceY = -Math.sin(angle) * force * ms * 7;

          particle.vx += forceX;
          particle.vy += forceY;
        }
      }

      // Apply spring force back to original position (with noise offset for relaxed movement)
      const targetX = particle.originalX + noiseX * 2;
      const targetY = particle.originalY + noiseY * 2;
      const springX = (targetX - particle.x) * 0.06;
      const springY = (targetY - particle.y) * 0.06;

      particle.vx += springX;
      particle.vy += springY;

      // Apply damping
      particle.vx *= d;
      particle.vy *= d;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Draw particle using fillRect (faster than imageData for small particles)
      const px = Math.round(particle.x);
      const py = Math.round(particle.y);
      const size = Math.max(1, Math.round(particle.size));
      
      if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
        ctx.fillStyle = `rgb(${particle.r}, ${particle.g}, ${particle.b})`;
        ctx.fillRect(px - size, py - size, size * 2, size * 2);
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate.current);
  });

  // Load image and extract particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    
    const updateCanvasSize = () => {
      if (!container || !canvas || particlesRef.current.length === 0) return;
      const rect = container.getBoundingClientRect();
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      const scale = Math.min(rect.width / width, rect.height / height, 1);
      const canvasWidth = width * scale;
      const canvasHeight = height * scale;
      
      // Update particle positions before resizing
      const scaleX = canvasWidth / oldWidth;
      const scaleY = canvasHeight / oldHeight;
      
      particlesRef.current.forEach((particle) => {
        particle.originalX *= scaleX;
        particle.originalY *= scaleY;
        particle.x = particle.originalX;
        particle.y = particle.originalY;
        particle.vx = 0;
        particle.vy = 0;
      });
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    
    img.onload = () => {
      imageRef.current = img;
      
      // Set canvas size to match container
      updateCanvasSize();
      
      // Draw image to temporary canvas to extract pixel data
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      
      tempCtx.drawImage(img, 0, 0, width, height);
      
      // Extract particles from image
      const imageData = tempCtx.getImageData(0, 0, width, height);
      const particles: Particle[] = [];
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Sample pixels to create particles - optimized sampling
      for (let y = 0; y < height; y += particleSpacing) {
        for (let x = 0; x < width; x += particleSpacing) {
          const index = (y * width + x) * 4;
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];
          const a = imageData.data[index + 3];
          
          // Only create particle if pixel is visible (alpha > threshold)
          if (a > 50) {
            const normalizedX = (x / width) * canvasWidth;
            const normalizedY = (y / height) * canvasHeight;
            
            // In dark mode, use black particles; in light mode, use original colors
            const finalR = isDark ? 0 : r;
            const finalG = isDark ? 0 : g;
            const finalB = isDark ? 0 : b;
            
            particles.push({
              x: normalizedX,
              y: normalizedY,
              originalX: normalizedX,
              originalY: normalizedY,
              vx: 0,
              vy: 0,
              size: particleSize,
              r: finalR,
              g: finalG,
              b: finalB,
              noiseOffsetX: x * 0.1 + y * 0.05,
              noiseOffsetY: y * 0.1 + x * 0.05,
            });
          }
        }
      }
      
      particlesRef.current = particles;
      setIsLoaded(true);
    };
    
    img.src = src;

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [src, width, height, particleSize, particleSpacing, isDark]);

  // Mouse interaction
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Start animation when loaded
  useEffect(() => {
    if (!isLoaded) return;

    const startAnimation = () => {
      animate.current();
    };

    startAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoaded]);

  // On mobile, show SVG logo directly
  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full dark:invert"
          priority
        />
      </div>
    );
  }

  // On desktop, show particle canvas
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="h-auto w-full"
        style={{ 
          display: isLoaded ? "block" : "none",
          willChange: "contents",
          imageRendering: "pixelated"
        }}
      />
      {!isLoaded && (
        <div className="flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full dark:invert opacity-50"
            priority
          />
        </div>
      )}
    </div>
  );
}

