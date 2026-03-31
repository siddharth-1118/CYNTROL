"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, WifiOff } from "lucide-react";

interface LandingSectionProps {
  onEnter: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onEnter }) => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Private & Secure",
      desc: "Local encryption keeps your credentials safe."
    },
    {
      icon: Zap,
      title: "Sub-second Sync",
      desc: "Instant data fetching with zero-lag interface."
    },
    {
      icon: WifiOff,
      title: "Offline First",
      desc: "Access your schedule and marks without WiFi."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 bg-[#0A0A0A] text-white"
    >
      <div className="max-w-4xl w-full space-y-12 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            CYNTROL
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Your ultimate student dashboard. Built by students, for students. 
            Replace the stress of traditional portals with speed and design.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <f.icon size={24} className="text-primary" />
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={onEnter}
            className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Enter CYNTROL
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-white/20 font-mono text-[10px] uppercase tracking-[0.4em]"
      >
        Verified Node 2.0.0 // Kinetic Thermography
      </motion.footer>
    </motion.div>
  );
};

export default LandingSection;
