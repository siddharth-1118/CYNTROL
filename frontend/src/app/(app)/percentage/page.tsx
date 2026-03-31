"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

const mockStats = [
  { label: "Overall Progress", value: 87.2, icon: TrendingUp, color: "text-primary" },
  { label: "Credit Fulfillment", value: 92.0, icon: BarChart3, color: "text-indigo-400" },
  { label: "Attendance Yield", value: 93.1, icon: Activity, color: "text-primary" },
  { label: "Internal Score Yield", value: 78.5, icon: PieChart, color: "text-indigo-400" },
];

export default function PercentagePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          PERCENTAGE
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Real-time Analytical Yields
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockStats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="tectonic-plate p-10 bg-white/5 border-b-4 border-white/5 group hover:border-primary/30 transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-12">
               <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={32} />
               </div>
               <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Sensor ID: 0{idx + 1}</span>
            </div>

            <div className="space-y-4">
               <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
               <div className="flex items-baseline gap-2">
                  <h2 className="text-7xl font-black text-white" style={{ fontFamily: 'var(--font-epilogue)' }}>
                     {stat.value}
                  </h2>
                  <span className={`text-2xl font-black ${stat.color}`}>%</span>
               </div>
            </div>

            <div className="mt-10 h-3 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${stat.value}%` }}
                 transition={{ duration: 1.5, ease: "circOut" }}
                 className={`h-full ${stat.color.replace('text-', 'bg-')} opacity-80`}
               />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="tectonic-plate p-10 bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center space-y-6"
      >
        <h3 className="text-2xl font-black text-white uppercase italic">System Projection</h3>
        <p className="text-white/40 font-bold text-lg max-w-2xl">
           Based on <span className="text-primary italic">Sector Analysis</span>, your current yield suggests an honors-tier graduation pathway. Protocol remains stable.
        </p>
        <div className="w-full max-w-md h-1 bg-white/5 relative overflow-hidden">
           <motion.div 
             animate={{ x: ["-100%", "100%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 bg-primary/40 w-1/2"
           />
        </div>
      </motion.div>
    </div>
  );
}

