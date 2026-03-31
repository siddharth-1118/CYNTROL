"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  ChevronRight, 
  Zap,
  RotateCcw
} from "lucide-react";

interface SubjectScore {
  name: string;
  internal: number;
  maxInternal: number;
  isPractical: boolean;
  predictedExternal?: number;
}

import { useAppLayout } from "@/context/AppLayoutContext";

export default function GradeXPage() {
  const { academia } = useAppLayout();
  const marks = academia?.sortedMarks || [];

  const calculateRequired = (internal: number, isPractical: boolean) => {
    const minPass = isPractical ? 50 : 50; 
    const req = minPass - (internal || 0);
    return req > 0 ? req : 0;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
            GRADEX
          </h1>
          <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
            Advanced Mark Analytics & SGPA Prediction
          </p>
        </div>
        <button className="p-4 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all">
          <RotateCcw size={24} />
        </button>
      </motion.div>

      {/* Analytics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="tectonic-plate p-10 md:col-span-1 border-b-4 border-indigo-500 flex flex-col justify-between">
            <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">Target SGPA</p>
            <h2 className="text-8xl font-black text-white tracking-tighter">9.1</h2>
            <p className="text-indigo-400 font-bold italic mt-4 underline decoration-indigo-500/20">Set custom goal</p>
         </div>

         <div className="md:col-span-2 tectonic-plate p-10 bg-white/5 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Zap size={100} className="text-primary" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic mb-4">External Protocol</h3>
            <p className="text-white/40 font-bold text-lg leading-relaxed max-w-lg">
               System detected <span className="text-primary italic">N-Theory</span> subjects and <span className="text-indigo-400 italic">M-Practical</span> modules. <br/>
               Threshold for Distinction: <span className="text-white font-black underline">75% Overall</span>
            </p>
         </div>
      </div>

      {/* Input Table */}
      <div className="space-y-6">
        {marks.map((sub: any, idx: number) => {
          const isPractical = sub.max === 60 || sub.max === 100; // Heuristic for labs
          const required = calculateRequired(sub.internal, isPractical);
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="tectonic-plate p-6 flex flex-col md:flex-row items-center gap-8 group"
            >
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`w-2 h-2 rounded-full ${isPractical ? 'bg-indigo-500 animate-pulse' : 'bg-primary animate-pulse'}`} />
                  <h4 className="text-xl font-black text-white italic">{sub.course || sub.title}</h4>
                </div>
                <p className="text-white/20 text-xs font-bold uppercase tracking-widest">Internal Component: {sub.score}/{sub.max || 40}</p>
              </div>

              <div className="w-full md:w-48 bg-white/5 p-4 rounded-2xl flex flex-col items-center">
                 <span className="text-white/20 text-[10px] font-black uppercase">Marks Required</span>
                 <p className="text-2xl font-black text-white">
                    {isPractical ? `${Math.ceil(required)}/60` : `${Math.ceil(required)}/60`}
                 </p>
              </div>

              <div className="w-full md:w-64 bg-primary/10 p-4 rounded-2xl flex flex-col items-center group-hover:bg-primary/20 transition-all border border-primary/20">
                 <span className="text-primary text-[10px] font-black uppercase">Estimated Grade</span>
                 <p className="text-2xl font-black text-primary italic underline underline-offset-4 decoration-primary/30">
                    {sub.percentage >= 90 ? "O" : sub.percentage >= 80 ? "A+" : "A"}
                 </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

