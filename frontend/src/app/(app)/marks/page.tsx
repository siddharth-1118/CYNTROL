"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpenText, FileText, CheckCircle2, AlertCircle } from "lucide-react";

import { useAppLayout } from "@/context/AppLayoutContext";

export default function MarksPage() {
  const { academia } = useAppLayout();
  const sortedMarks = (academia?.recentMarks || []).concat(academia?.sortedMarks || []).filter((v:any, i:number, a:any[]) => a.findIndex((t:any) => t.code === v.code) === i);
  // Actually academia already has sortedMarks. Let's just use it.
  const marks = academia?.sortedMarks || [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          MARKS
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Internal Score Ledger
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {marks.map((mark: any, idx: number) => {
          const status = mark.percentage >= 80 ? "Secure" : mark.percentage >= 60 ? "Warning" : "Critical";
          const course = mark.course || "Subject";
          const code = mark.code || "";
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`tectonic-plate p-10 bg-white/5 border-r-8 flex flex-col md:flex-row justify-between items-center group ${status === 'Secure' ? 'border-primary' : status === 'Warning' ? 'border-amber-400' : 'border-indigo-500'}`}
            >
               <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                     {code && <span className="text-primary font-black text-xs tracking-widest uppercase">{code}</span>}
                     <span className="w-1 h-3 bg-white/10" />
                     <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Secure' ? 'text-primary' : status === 'Warning' ? 'text-amber-400' : 'text-indigo-400'}`}>
                        {status}
                     </span>
                  </div>
                  <h3 className="text-4xl font-black text-white italic leading-tight">{course}</h3>
               </div>

               <div className="flex items-center gap-12 mt-8 md:mt-0">
                  <div className="text-center space-y-1">
                     <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Internal Yield</p>
                     <p className="text-5xl font-black text-white tabular-nums">
                        {mark.score}<span className="text-white/20 text-2xl">/{mark.max || 40}</span>
                     </p>
                  </div>
                  
                  <div className={`p-4 rounded-full bg-white/5 ${status === 'Secure' ? 'text-primary' : status === 'Warning' ? 'text-amber-400' : 'text-indigo-400'}`}>
                     {status === 'Secure' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                  </div>
               </div>
            </motion.div>
          );
        })}

        {marks.length === 0 && (
          <div className="tectonic-plate p-12 text-center bg-white/5">
            <p className="text-white/40 font-bold italic tracking-widest">NO SCORE ENTRIES DETECTED</p>
          </div>
        )}
      </div>
    </div>
  );
}

