"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { flavorText } from "@/utils/shared/flavortext";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [flavorIndex, setFlavorIndex] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 10;
      });
    }, 400);

    const flavorInterval = setInterval(() => {
      setFlavorIndex((prev) => (prev + 1) % flavorText.loading.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(flavorInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-center p-8">
      {/* Liquid Glow Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/60 mb-1">System Initializing</span>
              <h1
                className="text-5xl md:text-7xl lowercase tracking-tighter text-white"
                style={{ fontFamily: 'var(--font-epilogue)' }}
              >
                CYNTROL
              </h1>
            </div>
            <span className="font-mono text-xl text-primary font-black mb-1 italic">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="min-h-[1.5em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <AnimatePresence mode="wait">
            <motion.p
              key={flavorIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[11px] uppercase tracking-[0.2em] font-mono text-white/40"
            >
              Link established: {flavorText.loading[flavorIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

