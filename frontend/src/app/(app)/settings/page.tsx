"use client";
import React from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Bell, Zap, Palette, Power } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          SETTINGS
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          System Configuration & Protocol Overrides
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Settings */}
        <div className="space-y-6">
           {[
             { label: "Design System", sub: "Nordic Cyan (Static) / Obsidian v2", icon: Palette },
             { label: "Notification Nodes", sub: "Real-time Broadcasts Enabled", icon: Bell },
             { label: "Security Clearance", sub: "Biometric Auth Required for Gradex", icon: Shield },
           ].map((item, idx) => (
             <div key={item.label} className="tectonic-plate p-6 bg-white/5 border border-white/5 flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                   <div className="p-4 rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-all">
                      <item.icon size={24} />
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-white italic">{item.label}</h3>
                      <p className="text-white/20 text-xs font-bold uppercase tracking-widest">{item.sub}</p>
                   </div>
                </div>
                <div className="w-12 h-6 bg-primary/20 rounded-full relative p-1">
                   <div className="absolute right-1 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/40" />
                </div>
             </div>
           ))}
        </div>

        {/* System Status */}
        <div className="tectonic-plate p-10 flex flex-col justify-between border-b-8 border-indigo-500 bg-indigo-500/5 relative overflow-hidden">
           <div className="absolute bottom-0 right-0 p-12 opacity-5 scale-[2]">
              <Zap size={120} className="text-indigo-400" />
           </div>
           
           <div className="relative z-10">
              <h3 className="text-3xl font-black text-white uppercase italic mb-6 underline decoration-indigo-500/20 underline-offset-8">HARDWARE SYNC</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <span className="text-white/40 font-black text-xs uppercase tracking-widest">Interface Latency</span>
                    <span className="text-primary font-black italic">14ms</span>
                 </div>
                 <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <span className="text-white/40 font-black text-xs uppercase tracking-widest">Token Integrity</span>
                    <span className="text-primary font-black italic">99.99%</span>
                 </div>
              </div>
           </div>

           <button className="relative z-10 mt-12 w-full py-5 bg-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:scale-[0.98] transition-all shadow-xl shadow-indigo-500/20">
              <Power size={20} />
              Terminate Session
           </button>
        </div>
      </div>
    </div>
  );
}

