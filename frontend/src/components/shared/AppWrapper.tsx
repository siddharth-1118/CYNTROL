"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { WifiOff, ServerCrash } from "lucide-react";
import MinecraftParticles from "./MinecraftParticles";
import MinecraftAmbience from "./MinecraftAmbience";
import SyncStatusNotification from "./SyncStatusNotification";
import AIChat from "./AIChat";



export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { isOffline, isBackendError, setIsBackendError, showWelcome, setShowWelcome, userData } = useApp();



useEffect(() => {
  if (isBackendError) {
    const timer = setTimeout(() => {
      setIsBackendError(false);
    }, 10000);
    return () => clearTimeout(timer);
  }
}, [isBackendError, setIsBackendError]);



  return (
    <main className="bg-theme-bg fixed inset-0 w-full overflow-hidden flex flex-col">
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-4 left-0 right-0 z-[10001] flex justify-center pointer-events-none"
          >
            <div className="bg-[#FF4D4D] px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20 pointer-events-auto">
              <WifiOff size={12} className="text-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Offline Mode
              </span>
            </div>
          </motion.div>
        )}
        {isBackendError && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-4 left-0 right-0 z-[10001] flex justify-center pointer-events-none"
          >
            <div 
              className="px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20 pointer-events-auto"
              style={{ backgroundColor: 'var(--theme-secondary)' }}
            >
              <ServerCrash size={12} className="text-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Backend Servers Down
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="flex-1 relative z-10 w-full"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingLeft: "env(safe-area-inset-left, 0px)",
          paddingRight: "env(safe-area-inset-right, 0px)",
        }}
      >
        {children}
      </div>

      <MinecraftParticles />
      <MinecraftAmbience />
      <SyncStatusNotification />
      <AIChat />


    </main>
  );
}

