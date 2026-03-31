"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlowEffect({ 
  children, 
  className = "", 
  glowColor = "rgba(34, 211, 238, 0.15)" 
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x,
        y: y,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3 });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
    >
      <div 
        ref={glowRef}
        className="pointer-events-none absolute -left-[100px] -top-[100px] w-[200px] h-[200px] rounded-full blur-[80px] opacity-0 z-0"
        style={{ backgroundColor: glowColor, mixBlendMode: 'screen' }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

